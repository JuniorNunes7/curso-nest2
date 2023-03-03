import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    data = this.formatData(data);
    return this.prisma.user.create({
      data,
    });
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateUserDTO) {
    data = this.formatData(data);
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  formatData(data: CreateUserDTO | UpdateUserDTO) {
    return (data = {
      name: data.name,
      email: data.email,
      birth_at: data.birth_at ? new Date(data.birth_at) : null,
      password: data.password,
    });
  }
}
