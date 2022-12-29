import { KioskRoles } from '../types/kiosk.types';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { UserDocument } from '../users/users.model';
import { JwtAuthGuard } from '../strategies/jwt.strategy';

export const RoleBasedAuthGuard = (role?: KioskRoles): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      const user = request.user as UserDocument;
      //TODO uncomment to enable admin superiority
      // if (user.isAdmin) return true;
      if (typeof role === 'undefined') return true;
      for (const roleObj of user.roles) {
        if (roleObj.kioskId._id.toString() === request.params.id) {
          if (roleObj.role >= role) return true;
        }
      }
      return false;
    }
  }

  return mixin(RoleGuardMixin);
};
