import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Observable} from 'rxjs';

/**
 * Проверяет что в headers приходит корректный токен, указанный в process.env.APP_METRICS_TOKEN
 */
@Injectable()
export class AccessGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.get('authorization');

        if (!authorizationHeader) {
            return false;
        }

        const token = process.env.APP_METRICS_TOKEN;
        const headerToken = authorizationHeader.split('Bearer ')[1];

        return headerToken && headerToken === token;
    }
}
