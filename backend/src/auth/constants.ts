import { ConfigService } from '@nestjs/config';

export const jwtConstants = async (configService: ConfigService) => ({
    secret: await configService.get<string>('JWT_SECRET')
});