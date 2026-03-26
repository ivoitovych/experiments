/**
 * UsersModule
 *
 * Encapsulates user entity, service, and controller.
 * Exports UsersService so AuthModule can look up / create users during magic link flow.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // exported so AuthModule can inject UsersService
})
export class UsersModule {}
