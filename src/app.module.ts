import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ms-user',
      password: 'ms-user-pass',
      database: 'ms-user',
      synchronize: true,
      entities: [User],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // Empty
}
