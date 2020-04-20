export interface UserType {
  username: string;
  password: string;
  repeat_password?: string;
}

export interface MessageType {
  author: string;
  content: string;
  time: string;
}
