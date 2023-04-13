import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Book } from './models/books.model';
import { BooksService } from './books.service';
import { BookVersionsService } from 'src/book-versions/book-versions.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver((of: any) => Book)
export class BooksResolver {
  constructor(
    private booksService: BooksService,
    private bookVersionsService: BookVersionsService,
  ) {}

  @Query((returns) => [Book])
  async books(
    @Args('author', { nullable: true }) author?: string,
    @Args('title', { nullable: true }) title?: string,
    @Args('cursor', { nullable: true, type: () => Int }) cursor?: number,
    @Args('take', { nullable: true, type: () => Int }) take?: number,
  ) {
    return this.booksService.findAll(author, title, cursor, take);
  }

  @ResolveField()
  @UseGuards(AuthGuard)
  async bookVersions(@Parent() book: Book) {
    return this.bookVersionsService.findAll(book.id);
  }

  @Mutation((returns) => Book)
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async deleteBook(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.booksService.delete(id);
  }
}
