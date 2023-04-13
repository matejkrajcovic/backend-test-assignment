import { Module } from '@nestjs/common';
import { BookVersionsService } from './book-versions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BookVersionsService],
  exports: [BookVersionsService],
})
export class BookVersionsModule {}
