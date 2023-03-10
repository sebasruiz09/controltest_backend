import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Rating } from 'src/books/entities';
import { Book } from '../books/entities/book.entity';
import { User } from 'src/auth/entities/users.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.configService.get<string>('DBHOST'),
      port: this.configService.get<number>('DBPORT'),
      username: this.configService.get<string>('DBUSER'),
      password: this.configService.get<string>('DBPASSWORD'),
      database: this.configService.get<string>('DBNAME'),
      entities: [User, Rating, Book],
      synchronize: true,
      autoLoadEntities: true,
    };
    return config;
  }
}
