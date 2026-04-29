import { User } from '../model/User';
import { UserRegisterRequest } from '../model/UserRegisterRequest';
import { UserLoginRequest } from '../model/UserLoginRequest';
import { Request } from 'express';

export interface IUserService {
  userRegister(dto: UserRegisterRequest): number;
  userLogin(dto: UserLoginRequest, request: Request): User | null;
  userLogout(request: Request): number;
  getSafetyUser(originUser: User): Partial<User> | null;
}