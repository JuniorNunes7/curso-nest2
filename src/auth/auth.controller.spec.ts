import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
import { accessToken } from '../testing/access-token.mock';
import { authForgetDTO } from '../testing/auth-forget-dto.mock';
import { authLoginDTO } from '../testing/auth-login-dto.mock';
import { authRegisterDTO } from '../testing/auth-register-dto.mock';
import { authResetDTO } from '../testing/auth-reset-dto.mock';
import { authServiceMock } from '../testing/auth-service.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { getPhoto } from '../testing/get-photo.mock';
import { guardMock } from '../testing/guard.mock';
import userEntityList from '../testing/user-entity-list.mock';
import { AuthController } from './auth.contoller';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('validates definitions', () => {
    expect(authController).toBeDefined();
  });

  describe('Authentication flow', () => {
    it('login method', async () => {
      const result = await authController.login(authLoginDTO);

      expect(result).toEqual({ accessToken });
    });

    it('register method', async () => {
      const result = await authController.register(authRegisterDTO);

      expect(result).toEqual({ accessToken });
    });

    it('forget method', async () => {
      const result = await authController.forget(authForgetDTO);

      expect(result).toEqual({ success: true });
    });

    it('reset method', async () => {
      const result = await authController.reset(authResetDTO);

      expect(result).toEqual({ accessToken });
    });
  });

  describe('Authenticated routes', () => {
    it('me method', async () => {
      const result = await authController.me(userEntityList[0]);

      expect(result).toEqual(userEntityList[0]);
    });

    it('uploadPhoto method', async () => {
      const photo = await getPhoto();
      const result = await authController.uploadPhoto(userEntityList[0], photo);

      expect(result).toEqual({ success: true });
    });
  });
});
