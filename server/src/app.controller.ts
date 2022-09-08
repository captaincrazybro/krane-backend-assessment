import { Controller, Get, Body, Post, Req, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { DeletePostBody, CreatePostBody, LoginPostBody, VerifySessionPostBody } from './app.body-structures';

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

  @Post("/api/post/delete")
  deletePost(@Body() body: DeletePostBody): object {
    return this.appService.deletePost(body.id);
  }

  @Post("/api/login")
  login(@Body() body: LoginPostBody): object {
    return this.appService.login(body.username, body.password);
  }

  @Post("/api/verify-session")
  verifySession(@Body() body: VerifySessionPostBody): object {
    return this.appService.verifySession(body.sessionId);
  }
}
