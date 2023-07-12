import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDtoMock: CreateUserDTO = {
  birth_at: '2000-01-01',
  name: 'Junior',
  email: 'junior@email.com',
  password: '123456',
  role: Role.Admin,
};
