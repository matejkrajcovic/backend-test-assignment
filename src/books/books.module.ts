import { Module } from '@nestjs/common';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookVersionsModule } from 'src/book-versions/book-versions.module';

@Module({
  imports: [BookVersionsModule, PrismaModule],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
