import { Field, Int, ObjectType } from '@nestjs/graphql';

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
}
