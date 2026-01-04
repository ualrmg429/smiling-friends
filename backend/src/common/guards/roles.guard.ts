import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si no hay roles definidos, dejamos pasar
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Esto depende de tu AuthGuard (JWT o sesión)
    return requiredRoles.includes(user.role);
  }
}