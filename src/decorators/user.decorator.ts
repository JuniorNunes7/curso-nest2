import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      if (filter) {
        return request.user[filter];
      }

      return request.user;
    }

    throw new NotFoundException(
      'Usuário não encontrado no request, use o AuthGuard para obter o usuário',
    );
  },
);
