export interface UserLogin {
  _id?: string;        //It's string because it's mongoDB
  name: string;
  password: string;
  avatar?: string;
}

export interface User {
  _id?: string;
  name: string;
  password: string;
  avatar: string;
  key?: string;
}
