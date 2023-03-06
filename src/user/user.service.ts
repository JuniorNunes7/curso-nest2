import { Injectable, NotFoundException } from '@nestjs/common';
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
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('O usuário não foi encontrado.');
    }

    return user;
  }

  async update(id: number, data: UpdateUserDTO) {
    await this.getById(id);

    data = this.formatData(data);
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.getById(id);
    return this.prisma.user.delete({
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
