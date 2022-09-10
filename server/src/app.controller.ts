import { Controller, Get, Body, Post} from '@nestjs/common';
import { AppService } from './app.service';
import { DeletePostBody, CreatePostBody, LoginPostBody, GetUserPostBody } from './app.body-structures';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Post("/api/user") 
  getUser(@Body() body: GetUserPostBody): object {
    return this.appService.getUser(body.sessionId);
  }
}
