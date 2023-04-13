import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from './books.model';

@ObjectType()
export class BookVersion {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field((type) => Int)
  publicationYear: number;

  @Field((type) => [String])
  genres: string[];

  @Field((type) => Int)
  rating: number;

  @Field((type) => Book)
  bookVersions: Book;

  @Field((type) => Date)
  createdAt: Date;
}
