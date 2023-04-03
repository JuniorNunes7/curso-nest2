import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ParamId } from 'src/decorators/param-id.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@ParamId() id: number) {
    return this.userService.getById(id);
  }

  @Patch(':id')
  async update(@ParamId() id: number, @Body() data: UpdateUserDTO) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
