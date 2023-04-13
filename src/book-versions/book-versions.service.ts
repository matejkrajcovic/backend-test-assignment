import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookVersionsService {
  constructor(private prisma: PrismaService) {}

  async create(parentBook: Book) {
    return this.prisma.bookVersion.create({
      data: {
        ...parentBook,
        id: undefined, // id is set upon creation and should not be used from ...parentBook
        book: { connect: { id: parentBook.id } },
      },
    });
  }

  async findAll(bookId: number) {
    return this.prisma.bookVersion.findMany({ where: { bookId } });
  }
}
