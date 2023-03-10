import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { signupDto } from './dto/signup.dto';
import { cryptPassword, compareCrypt } from './helpers/bcrypt.helper';
import { signinDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, HttpError } from '../common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  singUp = async ({ password, ...props }: signupDto): Promise<Response> => {
    const info = this.userRepository.create({
      password: cryptPassword(password),
      ...props,
    });
    try {
      const user = await this.userRepository.save(info);
      delete user['password'];
      return {
        status: 200,
        message: 'user successfully registered',
      };
    } catch (err) {
      throw new BadRequestException(err.driverError.detail as HttpError);
    }
  };

  signIn = async (credentials: signinDto): Promise<any> => {
    const user = await this.userRepository.findOne({
      where: { email: credentials['email'] },
      select: { id: true, password: true },
    });

    if (!user)
      throw new UnauthorizedException(`credentials are not valid Email`);

    if (!compareCrypt(credentials['password'], user['password']))
      throw new UnauthorizedException(`crendentials are not valid pasword`);

    delete user['password'];
    return {
      id: user['id'],
      token: this.generateJwt({ id: user['id'] }),
    };
  };

  private generateJwt = (payload: { id: string }): string =>
    this.jwtService.sign(payload);
}
