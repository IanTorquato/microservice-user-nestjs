import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthGuard } from 'src/guards/auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
    // Empty
  }

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<User> {
    return this.userService.findOne({ username: data.username });
  }

  @Post('create')
  async createUser(@Body() body: any): Promise<any> {
    return this.userService.createUser(body);
  }

  @UseGuards(AuthGuard)
  @Get('greet')
  async greet(): Promise<any> {
    return { result: 'Greetings authenticated user' };
  }
}
