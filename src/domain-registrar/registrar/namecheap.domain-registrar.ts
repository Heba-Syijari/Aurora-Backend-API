import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Namecheap, { DomainPriceActions, INamecheapConfig } from 'namecheap-ts';
import {
  AddFundsRequestDto,
  AddFundsRequestOutput,
  GetDomainPricingOutput,
  IDomainRegistrar,
  RegisterDomainDto,
  RegisterDomainOutput,
  UpdateDomainDNSRecordsDto,
} from './idomain-registrar.interface';

@Injectable()
export class NamecheapDomainRegistrar implements IDomainRegistrar {
  private readonly api: Namecheap;

  constructor(configService: ConfigService) {
    const config: INamecheapConfig = {
      apiKey: configService.get('NAMECHEAP_API_KEY'),
      apiUser: configService.get('NAMECHEAP_API_USER'),
      username: configService.get('NAMECHEAP_USERNAME'),
      clientIp: configService.get('NAMECHEAP_CLIENT_IP'),
    };

    this.api = new Namecheap(config, !!configService.get('NAMECHEAP_SANDBOX'));
  }

  public async checkDomainIsPremium(domainName: string): Promise<boolean> {
    const { data } = await this.api.checkDomain(domainName);
    return data.premium;
  }

  public async checkDomainAvailability(domainName: string): Promise<boolean> {
    const { data } = await this.api.checkDomain(domainName);
    return data.availabe;
  }

  public async registerDomain(
    dto: RegisterDomainDto,
  ): Promise<RegisterDomainOutput> {
    const payload = {
      DomainName: dto.domainName,
      Years: String(dto.years || 1),

      AuxBillingFirstName: dto.firstName,
      AuxBillingLastName: dto.lastName,
      AuxBillingAddress1: dto.address,
      AuxBillingStateProvince: dto.city,
      AuxBillingPostalCode: dto.postalCode,
      AuxBillingCountry: dto.country,
      AuxBillingPhone: dto.phone,
      AuxBillingEmailAddress: dto.email,
      AuxBillingCity: dto.city,

      TechFirstName: dto.firstName,
      TechLastName: dto.lastName,
      TechAddress1: dto.address,
      TechStateProvince: dto.city,
      TechPostalCode: dto.postalCode,
      TechCountry: dto.country,
      TechPhone: dto.phone,
      TechEmailAddress: dto.email,
      TechCity: dto.city,

      AdminFirstName: dto.firstName,
      AdminLastName: dto.lastName,
      AdminAddress1: dto.address,
      AdminStateProvince: dto.city,
      AdminPostalCode: dto.postalCode,
      AdminCountry: dto.country,
      AdminPhone: dto.phone,
      AdminEmailAddress: dto.email,
      AdminCity: dto.city,

      RegistrantFirstName: dto.firstName,
      RegistrantLastName: dto.lastName,
      RegistrantAddress1: dto.address,
      RegistrantStateProvince: dto.city,
      RegistrantPostalCode: dto.postalCode,
      RegistrantCountry: dto.country,
      RegistrantPhone: dto.phone,
      RegistrantEmailAddress: dto.email,
      RegistrantCity: dto.city,

      GenerateAdminOrderRefId: 'False',
    };

    const { data } = await this.api.registerDomain(payload);

    return data;
  }

  public async getDomainPricing(
    domainName: string,
  ): Promise<GetDomainPricingOutput> {
    try {
      const { data } = await this.api.getDomainPrice(
        domainName,
        DomainPriceActions.REGISTER,
      );

      if (!data.length) {
        throw new BadRequestException('domain unknown price');
      }

      const pricing = data.map((item: any) => {
        const duration = Number(item.Duration);
        const price = Number(item.Price) + Number(item.AdditionalCost || 0);
        return {
          duration,
          durationType: item.DurationType,
          price: +(price * duration).toFixed(2),
        };
      });

      return pricing;
    } catch (err) {
      throw err;
    }
  }

  public async addFundsRequest(
    dto: AddFundsRequestDto,
  ): Promise<AddFundsRequestOutput> {
    const { data } = await this.api.addFundsRequest({
      amount: dto.amount,
      paymentType: dto.paymentType,
      returnURL: dto.returnURL,
    });

    console.log({ data });

    return data;
  }

  public async getFundsRequestStatus(tokenId: string): Promise<string> {
    const { data } = await this.api.getFundsStatus(tokenId);

    return data.status;
  }

  public async updateDomainDNSRecords(
    dto: UpdateDomainDNSRecordsDto,
  ): Promise<boolean> {
    const [sld, tld] = dto.domainName.split('.');

    const records: Record<string, string | number> = {};

    dto.records.forEach((record, i) => {
      records[`RecordType${i + 1}`] = record.type;
      records[`HostName${i + 1}`] = record.host;
      records[`Address${i + 1}`] = record.value;

      if (record.ttl) {
        records[`TTL${i + 1}`] = record.ttl;
      }
    });

    const payload = {
      SLD: sld,
      TLD: tld,
      ...records,
    };

    const { data } = await this.api.call(
      'namecheap.domains.dns.setHosts',
      payload,
    );

    const success = !!data.DomainDNSSetHostsResult?.$?.IsSuccess;

    return success;
  }
}
