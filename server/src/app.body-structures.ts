export class CreatePostBody {
  title: string;
  text_body: string;
}

export class DeletePostBody {
  id: number;
}

export class LoginPostBody {
  username: string;
  password: string;
}

export class VerifySessionPostBody {
  sessionId: string;
}