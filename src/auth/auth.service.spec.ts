import { Test, TestingModule } from '@nestjs/testing';
import { accessToken } from '../testing/access-token.mock';
import { authRegisterDTO } from '../testing/auth-register-dto.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { resetToken } from '../testing/reset-token.mock';
import userEntityList from '../testing/user-entity-list.mock';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('validates definition', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    it('createToken method', () => {
      const result = authService.createToken(userEntityList[0]);

      expect(result).toEqual({ accessToken });
    });

    it('checkToken method', () => {
      const result = authService.checkToken(accessToken);

      expect(result).toEqual(jwtPayload);
    });

    it('isValidToken method', () => {
      const result = authService.isValidToken(accessToken);

      expect(result).toEqual(true);
    });
  });

  describe('Authentication', () => {
    it('login method', async () => {
      const result = await authService.login('junior@email.com', '123456');

      expect(result).toEqual({ accessToken });
    });

    it('forget method', async () => {
      const result = await authService.forget('junior@email.com');

      expect(result).toEqual(true);
    });

    it('reset method', async () => {
      const result = await authService.reset('654321', resetToken);

      expect(result).toEqual({ accessToken });
    });

    it('register method', async () => {
      const result = await authService.register(authRegisterDTO);

      expect(result).toEqual({ accessToken });
    });
  });
});
