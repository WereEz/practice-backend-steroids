import { AuthTokenPayloadDto } from '../dtos/AuthTokenPayloadDto';
import { IConfigService } from '../interfaces/IConfigService';
import { ISessionService } from '../interfaces/ISessionService';
import { DataMapper } from '@steroidsjs/nest/usecases/helpers/DataMapper';
import { TokensSchema } from '../dtos/TokensSchema';

//Куча лишних импортов, просмотри все файлы и убери их

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
        return DataMapper.create<TokensSchema>(TokensSchema, {
            accessToken,
            refreshToken
        });
    }
}
