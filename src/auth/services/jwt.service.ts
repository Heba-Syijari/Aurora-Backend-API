import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  private readonly secret: string;

  constructor(private readonly jwtService: JwtService, config: ConfigService) {
    this.secret = config.get('JWT_SECRET');
  }

  async sign(
    userId: string,
    data?: Record<string, string>,
  ): Promise<string | null> {
    const payload = {
      sub: userId,
      ...(data ?? {}),
    };

    return await this.jwtService.signAsync(payload, {
      secret: this.secret,
      expiresIn: '15m',
    });
  }

  async verify(token: string): Promise<any> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.secret,
    });

    return payload;
  }

  decode(token: string): any | null {
    try {
      const payload = this.jwtService.decode(token, { json: true });

      return payload;
    } catch (err) {
      console.error('Failed to decode token');
      return null;
    }
  }
}
