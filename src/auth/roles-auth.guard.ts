import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requriedRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      console.log('qweqweqe', requriedRoles);

      if (!requriedRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeaders = req.headers.auth;

      const [bearer, token] = authHeaders.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User not authorized' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      return user.roles.some((role: { value: string }) =>
        requriedRoles.includes(role.value),
      );
    } catch (error) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}

