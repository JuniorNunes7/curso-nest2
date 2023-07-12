import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDtoMock } from '../testing/create-user-dto.mock';
import { updateUserDtoMock } from '../testing/update-user-dto.mock';
import userEntityList from '../testing/user-entity-list.mock';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('validates definition', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    it('method create', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);

      const result = await userService.create(createUserDtoMock);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    it('method getAll', async () => {
      const result = await userService.getAll();

      expect(result).toEqual(userEntityList);
    });

    it('method getById', async () => {
      const result = await userService.getById(2);

      expect(result).toEqual(userEntityList[1]);
    });
  });

  describe('Update', () => {
    it('method update', async () => {
      const result = await userService.update(1, updateUserDtoMock);

      expect(result).toEqual(userEntityList[1]);
    });
  });

  describe('Delete', () => {
    it('method delete', async () => {
      const result = await userService.delete(1);

      expect(result).toEqual(true);
    });
  });
});
