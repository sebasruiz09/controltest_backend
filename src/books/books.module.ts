import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { CommonModule } from '../common/common.module';
import { HttpModule } from '@nestjs/axios';
import { HttpAdapter } from './adapters/http.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, Rating } from './entities';

@Module({
  imports: [
    CommonModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([Book, Rating]),
  ],
  controllers: [BooksController],
  providers: [BooksService, HttpAdapter],
})
export class BooksModule {}
