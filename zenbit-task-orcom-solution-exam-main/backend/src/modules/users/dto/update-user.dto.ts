import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// PartialType makes all CreateUserDto fields optional.
// This is a NestJS/Swagger utility — avoids manually redeclaring every field.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
