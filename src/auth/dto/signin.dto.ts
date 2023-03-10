import { signupDto } from './signup.dto';
import { PickType } from '@nestjs/mapped-types';

export class signinDto extends PickType(signupDto, ['email', 'password']) {}
