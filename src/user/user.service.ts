import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    try {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

      const user = this.userRepository.create(data);

      return this.userRepository.save(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getAll() {
    return this.userRepository.find();
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({
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

    if (data.password) {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    }
    await this.userRepository.update(id, data);

    return this.getById(id);
  }

  async delete(id: number) {
    await this.getById(id);
    return this.userRepository.delete(id);
  }
}
