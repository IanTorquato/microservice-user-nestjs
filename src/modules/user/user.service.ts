import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, InsertResult, Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    // Empty
  }

  findOne(query: FindConditions<User>): Promise<User> {
    return this.userRepository.findOne(query);
  }

  async createUser(user: any): Promise<InsertResult> {
    try {
      // Perform all needed checks

      const userEntity = this.userRepository.create(user);

      const response = await this.userRepository.insert(userEntity);

      Logger.log('createUser - Created user');

      return response;
    } catch (error) {
      Logger.log(error);
      throw error;
    }
  }
}
