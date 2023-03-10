import { IsEmail, IsString, Matches } from 'class-validator';
export class signupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Matches(
    /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/,
  )
  @IsString()
  password: string;
}
