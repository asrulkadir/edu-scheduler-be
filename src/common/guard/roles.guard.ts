import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EUserRole } from 'src/utils/enum';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserAuth } from 'src/models/auth.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<EUserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    this.logger.debug(`Required roles: ${requiredRoles}`);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: UserAuth = request.user;
    this.logger.debug(`User roles: ${user.role}`);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
