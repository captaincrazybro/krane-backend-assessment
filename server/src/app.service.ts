import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPosts(): Promise<object> {
    let prismaService = new PrismaService();
    let posts = await prismaService.post.findMany();

    prismaService.$disconnect();
    return posts;
  }

  async createPost(title: string, text_body: string): Promise<object> {
    let prismaService = new PrismaService();
    let post = await prismaService.post.create({
      data: {
        title: title,
        textBody: text_body,
      }
    })

    prismaService.$disconnect();
    return post;
  }
}