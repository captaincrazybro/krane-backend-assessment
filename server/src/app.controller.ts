import { Controller, Get, Body, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePostBody } from './app.body-structures';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/api/post")
  getPosts(): object {
    return this.appService.getPosts();
  }

  @Post("/api/post")
  createPost(@Body() body: CreatePostBody): object {
    return this.appService.createPost(body.title, body.text_body)
  }
}
