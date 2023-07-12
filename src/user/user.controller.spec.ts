import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { createUserDtoMock } from '../testing/create-user-dto.mock';
import { guardMock } from '../testing/guard.mock';
import { updateUserDtoMock } from '../testing/update-user-dto.mock';
import userEntityList from '../testing/user-entity-list.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('validates definitions', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Guards', () => {
    it('applied on the controller', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    it('create method', async () => {
      const result = await userController.create(createUserDtoMock);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    it('getAll method', async () => {
      const result = await userController.getAll();

      expect(result).toEqual(userEntityList);
    });

    it('getById method', async () => {
      const result = await userController.getById(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    it('update method', async () => {
      const result = await userController.update(1, updateUserDtoMock);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    it('delete method', async () => {
      const result = await userController.delete(1);

      expect(result).toEqual({ success: true });
    });
  });
});
