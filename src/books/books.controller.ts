import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('review')
  getBooks(@Body() review: BookDto) {
    return this.booksService.createBook(review);
  }

  @Get('all/:id')
  getReviews(@Param('id') id: string) {
    return this.booksService.allReviews(id);
  }
}
