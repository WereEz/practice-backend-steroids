import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthModuleConfig } from '@steroidsjs/nest-auth/infrastructure/config';
import { AuthModule } from '@steroidsjs/nest-modules/auth/AuthModule';
import { AppModule } from '@steroidsjs/nest/infrastructure/applications/AppModule';
import { IAppModuleConfig } from '@steroidsjs/nest/infrastructure/applications/IAppModuleConfig';
import { AuthTokenPayloadDto } from '../dtos/AuthTokenPayloadDto';
import { IConfigService } from '../interfaces/IConfigService';
import { ISessionService } from '../interfaces/ISessionService';
import { ConfigService } from '@nestjs/config';

export class AuthLoginService {
    constructor(
        private readonly sessionService: ISessionService,
        private readonly configService: IConfigService,
    ) {
    }
    private generateAccessToken(
        userId: number,
        tokenPayload: AuthTokenPayloadDto,
    ): string {
        const expiresIn = this.configService.get('auth.accessTokenExpiresSec') || '5m';
        const secret = this.configService.get('auth.jwtAccessSecretKey');

        return this.sessionService.signToken(tokenPayload, {
            subject: String(userId),
            secret,
            expiresIn,
        });
    }

    private generateRefreshToken(
        userId: number,
        tokenPayload: AuthTokenPayloadDto,
    ): string {
        const expiresIn = this.configService.get('auth.refreshTokenExpiresSec') || '30d';
        const secret = this.configService.get('auth.jwtRefreshSecretKey');

        return this.sessionService.signToken(tokenPayload, {
            subject: String(userId),
            secret,
            expiresIn,
        });
    }

    async generateTokens(
        userId: number,
        tokenPayload: AuthTokenPayloadDto,
    ): Promise<{ accessToken: string; refreshToken: string }> {

        const accessToken = this.generateAccessToken(userId, tokenPayload);
        const refreshToken = this.generateRefreshToken(userId, tokenPayload);

        return { accessToken, refreshToken };
    }
}
