import { IUserService } from './UserService';
import { User } from '../model/User';
import { UserRegisterRequest } from '../model/UserRegisterRequest';
import { UserLoginRequest } from '../model/UserLoginRequest';
import { Request } from 'express';
import { userMapper } from '../db/UserMapper';
import { createMD5 } from '../utils/crypto';
import { BusinessException } from '../exception/BusinessException';
import { ErrorCode } from '../common/ErrorCode';
import { USER_LOGIN_STATE } from '../constant/UserConstant';
import { isStringBlank } from '../utils/string';

const SALT = 'yupi';

export class UserServiceImpl implements IUserService {
  userRegister(dto: UserRegisterRequest): number {
    const { userAccount, userPassword, checkPassword, planetCode } = dto;

    // 校验
    if (isStringBlank(userAccount, userPassword, checkPassword, planetCode)) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, '参数为空');
    }
    if (userAccount.length < 4) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, '用户账号过短');
    }
    if (userPassword.length < 8 || checkPassword.length < 8) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, '用户密码过短');
    }
    if (planetCode.length > 5) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, '星球编号过长');
    }

    // 账户不能包含特殊字符
    const validPattern = /[`~!@#$%^&*()+=|{}':;',\[\].<>\/?~！@#￥%……&*（）——+|{}【】'；：""'。，、？]/;
    if (validPattern.test(userAccount)) {
      return -1;
    }

    // 密码和校验密码相同
    if (userPassword !== checkPassword) {
      return -1;
    }

    // 账户不能重复
    const existUser = userMapper.findByAccount(userAccount);
    if (existUser) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, '账号重复');
    }

    // 星球编号不能重复
    const existPlanet = userMapper.findByPlanetCode(planetCode);
    if (existPlanet) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, '编号重复');
    }

    // 加密
    const encryptPassword = createMD5(SALT + userPassword);

    // 插入
    const id = userMapper.insert({
      userAccount,
      userPassword: encryptPassword,
      planetCode,
      userStatus: 0,
      isDelete: 0,
      userRole: 0,
    });

    return id;
  }

  userLogin(dto: UserLoginRequest, request: Request): User | null {
    const { userAccount, userPassword } = dto;

    // 校验
    if (isStringBlank(userAccount, userPassword)) {
      return null;
    }
    if (userAccount.length < 4) {
      return null;
    }
    if (userPassword.length < 8) {
      return null;
    }

    // 账户不能包含特殊字符
    const validPattern = /[`~!@#$%^&*()+=|{}':;',\[\].<>\/?~！@#￥%……&*（）——+|{}【】'；：""'。，、？]/;
    if (validPattern.test(userAccount)) {
      return null;
    }

    // 加密
    const encryptPassword = createMD5(SALT + userPassword);

    // 查询
    const user = userMapper.findByAccountAndPassword(userAccount, encryptPassword);
    if (!user) {
      console.info('user login failed, userAccount cannot match userPassword');
      return null;
    }

    // 脱敏
    const safetyUser = this.getSafetyUser(user);

    // 记录登录态
    (request.session as any)[USER_LOGIN_STATE] = safetyUser;

    return safetyUser as User;
  }

  userLogout(request: Request): number {
    // 移除登录态，与 Java 的 removeAttribute 行为一致
    delete (request.session as any)[USER_LOGIN_STATE];
    return 1;
  }

  getSafetyUser(originUser: User): Partial<User> | null {
    if (!originUser) return null;
    return {
      id: originUser.id,
      username: originUser.username,
      userAccount: originUser.userAccount,
      avatarUrl: originUser.avatarUrl,
      gender: originUser.gender,
      phone: originUser.phone,
      email: originUser.email,
      planetCode: originUser.planetCode,
      userRole: originUser.userRole,
      userStatus: originUser.userStatus,
      createTime: originUser.createTime,
      updateTime: originUser.updateTime,
    };
  }
}

export const userService = new UserServiceImpl();