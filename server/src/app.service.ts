import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import crypto from 'crypto';

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

  async deletePost(id: number): Promise<object> {
    let prismaService = new PrismaService();
    let deletedPost = await prismaService.post.delete({
      where: {
        id: id
      }
    })

    prismaService.$disconnect();
    return deletedPost;
  }

  async login(password: string, username: string): Promise<object> {
    let prismaService = new PrismaService();
    let user = await prismaService.user.findFirst({
      where: {
        username: username,
        password: password,
      }
    })

    if (!user) {
      prismaService.$disconnect();
      return INVALID_USERNAME_OR_PASSWORD;
    } 

    let sessionId = crypto.randomUUID();
    await prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        sessionId: sessionId,
      }
    })
    prismaService.$disconnect();

    return LOGIN_SUCCESSFUL(sessionId);
  }

  async verifySession(sessionId: string) {
    let prismaService = new PrismaService();
    let user = await prismaService.user.findFirst({
      where: {
        sessionId: sessionId
      }
    })

    prismaService.$disconnect();
    return VERIFY_SESSION_RESPONSE(user);
  }
}

const INVALID_USERNAME_OR_PASSWORD: object = {
  message: "Invalid username or password!",
}
const LOGIN_SUCCESSFUL = (sessionId): object => {
  return {
    message: "You have successfully logged in!",
    sessionId: sessionId,
  }
}
const VERIFY_SESSION_RESPONSE = (sessionIsValid): object => {
  return {
    sessionIsValid: sessionIsValid,
  }
}