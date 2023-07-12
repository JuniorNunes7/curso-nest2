import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

const userEntityList: UserEntity[] = [
  {
    name: 'Junior',
    email: 'junior@email.com',
    birth_at: new Date('2000-01-01'),
    id: 1,
    password: '$2b$10$f44barwjMSuGB3qqtQEtHOWLcuuG3Yi1RZ1by/D5fZQHXoXW3WgqS',
    role: Role.Admin,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Nagyla',
    email: 'nagyla@email.com',
    birth_at: new Date('2000-01-01'),
    id: 2,
    password: '$2b$10$f44barwjMSuGB3qqtQEtHOWLcuuG3Yi1RZ1by/D5fZQHXoXW3WgqS',
    role: Role.User,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Sophia',
    email: 'sophia@email.com',
    birth_at: new Date('2023-01-01'),
    id: 3,
    password: '$2b$10$f44barwjMSuGB3qqtQEtHOWLcuuG3Yi1RZ1by/D5fZQHXoXW3WgqS',
    role: Role.Admin,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default userEntityList;
