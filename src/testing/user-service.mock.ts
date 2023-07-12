import { UserService } from '../user/user.service';
import userEntityList from './user-entity-list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    exists: jest.fn(),
    getAll: jest.fn().mockResolvedValue(userEntityList),
    getById: jest.fn().mockResolvedValue(userEntityList[0]),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
