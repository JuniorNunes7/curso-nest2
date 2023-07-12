import { Role } from '../enums/role.enum';
import { UpdateUserDTO } from '../user/dto/update-user.dto';

export const updateUserDtoMock: UpdateUserDTO = {
  birth_at: '1992-01-01',
  name: 'Junior Atualizado',
  email: 'junior-updated@email.com',
  password: '123456789',
  role: Role.Admin,
};
