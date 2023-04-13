import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BookVersionsService } from 'src/book-versions/book-versions.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(
    private prisma: PrismaService,
    private bookVersionsService: BookVersionsService,
  ) {}

  async findAll(
    author?: string,
    title?: string,
    cursor?: number,
    take?: number,
  ): Promise<Book[] | null> {
    return this.prisma.book.findMany({
      where: {
        ...(author ? { author: { contains: author } } : {}),
        ...(title ? { title: { contains: title } } : {}),
      },
      take,
      ...(cursor
        ? {
            cursor: {
              id: cursor,
            },
            skip: 1, // skip cursor
          }
        : {}),
    });
  }

  async create(
    title: string,
    author: string,
    publicationYear: number,
    genres: string[],
    rating: number,
  ): Promise<Book> {
    return this.prisma.book.create({
      data: { title, author, publicationYear, genres, rating },
    });
  }

  async update(
    bookId: number,
    title?: string,
    author?: string,
    publicationYear?: number,
    genres?: string[],
    rating?: number,
  ): Promise<Book> {
    const book = await this.prisma.book.findFirst({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException();
    }

    await this.bookVersionsService.create(book);

    return this.prisma.book.update({
      where: { id: bookId },
      data: { title, author, publicationYear, genres, rating },
    });
  }

  async delete(bookId: number) {
    await this.throwIfNotFound(bookId);

    return this.prisma.book.delete({ where: { id: bookId } });
  }

  // this can be replaced with a exception filter for exceptions thrown from Prisma
  async throwIfNotFound(bookId: number) {
    const book = await this.prisma.book.findFirst({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException();
    }
  }
}
