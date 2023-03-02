import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return { body };
  }

  @Get()
  async getAll() {
    return { users: [] };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO,
  ) {
    return { id, body };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
