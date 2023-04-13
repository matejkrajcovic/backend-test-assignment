import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BookVersion } from './book-versions.model';

@ObjectType()
export class Book {
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

  @Field((type) => [BookVersion], {
    description: 'Available only to logged in users.',
  })
  bookVersions: BookVersion[];
}
