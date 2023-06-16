import { User} from "./login";


export interface TokenResponse {
  token: string;
  user: User
}

export interface UserResponse {
    user: User;
}

export interface UsersResponse {
    users: User[];
}
