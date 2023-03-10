import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Rating } from './rating.entity';
@Entity({ name: 'Book' })
export class Book {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
  })
  id: string;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'author',
    type: 'varchar',
  })
  author: string;

  @Column({
    name: 'description',
    type: 'varchar',
  })
  description: string;

  @OneToMany(() => Rating, (rating) => rating.book, {})
  rating: Rating[];
}
