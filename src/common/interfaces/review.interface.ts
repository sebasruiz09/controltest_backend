import { User } from 'src/auth/entities/users.entity';
import { Book } from '../../books/entities/book.entity';
export interface Review {
  user: string | User;
  book: string | Book;
  review: string;
}
