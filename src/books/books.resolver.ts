import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './books.model';
import { BooksService } from './books.service';

@Resolver((of: any) => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}
  @Query((returns) => [Book])
  async books(
    @Args('author', { nullable: true }) author?: string,
    @Args('title', { nullable: true }) title?: string,
  ) {
    return await this.booksService.findAll(author, title);
  }

  @Mutation((returns) => Book)
  async createBook(
    @Args({ name: 'title' }) title: string,
    @Args({ name: 'author' }) author: string,
    @Args({ name: 'publicationYear', type: () => Int }) publicationYear: number,
    @Args({ name: 'genres', type: () => [String] }) genres: string[],
    @Args({ name: 'rating', type: () => Int }) rating: number,
  ) {
    return this.booksService.create(
      title,
      author,
      publicationYear,
      genres,
      rating,
    );
  }

  @Mutation((returns) => Book)
  async updateBook(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'title', nullable: true }) title?: string,
    @Args({ name: 'author', nullable: true }) author?: string,
    @Args({ name: 'publicationYear', type: () => Int, nullable: true })
    publicationYear?: number,
    @Args({ name: 'genres', type: () => [String], nullable: true })
    genres?: string[],
    @Args({ name: 'rating', type: () => Int, nullable: true }) rating?: number,
  ) {
    return this.booksService.update(
      id,
      title,
      author,
      publicationYear,
      genres,
      rating,
    );
  }

  @Mutation((returns) => Book)
  async deleteBook(@Args({ name: 'id' }) id: number) {
    return this.booksService.delete(id);
  }
}
