import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BookVersionsModule } from './book-versions/book-versions.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BooksModule,
    BookVersionsModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      fieldResolverEnhancers: ['guards'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
