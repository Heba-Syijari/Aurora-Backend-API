import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { endpoints } from './endpoints';
import {
  IAddCustomHostnameInput,
  IAddPullZoneInput,
  IAddPullZoneResponse,
} from './types';

@Injectable()
export class BunnyCDNService {
  private readonly apiClient: AxiosInstance;

  constructor(configService: ConfigService) {
    this.apiClient = axios.create({
      baseURL: configService.get('BUNNY_API_URL'),
    });
    this.apiClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers['accessKey'] = configService.get(
          'BUNNY_ZONES_ACCESS_KEY',
        );
        config.headers['Content-Type'] = 'application/json';
        config.headers.Accept = 'application/json';

        return config;
      },
    );
  }

  public async addPullZone(
    input: IAddPullZoneInput,
  ): Promise<IAddPullZoneResponse> {
    const { data } = await this.apiClient.post(endpoints.addPullzone, {
      Name: input.name,
      OriginUrl: input.originUrl,
      EnableGeoZoneUS: true,
      EnableGeoZoneEU: true,
      EnableGeoZoneASIA: true,
      EnableGeoZoneSA: true,
      EnableGeoZoneAF: true,
    });

    const response: IAddPullZoneResponse = {
      id: data.Id,
      hostnameOriginURL: data?.Hostnames?.[0]?.Value,
    };

    return response;
  }

  public async deletePullZone(pullZoneId: number): Promise<boolean> {
    const response = await this.apiClient.delete(
      endpoints.deletePullzone.replace(':id', String(pullZoneId)),
    );

    return response.status >= 200 && response.status <= 204;
  }

  public async getPullZone(pullZoneId: number) {
    const { data } = await this.apiClient.get(
      endpoints.getPullzone.replace(':id', String(pullZoneId)),
    );

    return data;
  }

  public async purgeCache(pullZoneId: number) {
    await this.apiClient.post(
      endpoints.purgeCache.replace(':id', String(pullZoneId)),
    );
  }

  public async addCustomHostname(input: IAddCustomHostnameInput) {
    await this.apiClient.post(endpoints.addHostname(input.pullZoneId), {
      Hostname: input.hostname,
    });

    this.handleLoadFreeCertificateLoop(input.hostname);
  }

  private handleLoadFreeCertificateLoop(hostname: string, triesCount = 0) {
    if (triesCount >= 3) {
      console.error(
        `Failed to load free certificate for [${hostname}] after 3 tries`,
      );
      return;
    }

    // Load free certificate after 3 minutes
    setTimeout(async () => {
      try {
        await this.loadFreeCertificate(hostname);
        console.log('Free certificate loaded successfully for', hostname);
      } catch (error) {
        console.error(
          `Failed to load free certificate for [${hostname}]. Retrying...`,
        );
        this.handleLoadFreeCertificateLoop(hostname, triesCount + 1);
      }
    }, 3 * 60 * 1000);
  }

  public async loadFreeCertificate(hostname: string) {
    await this.apiClient.get(endpoints.loadFreeCertificate(hostname));
  }

  public async removeCustomHostname(pullZoneId: number, hostname: string) {
    await this.apiClient.delete(endpoints.removeHostname(pullZoneId), {
      data: { Hostname: hostname },
    });
  }
}
