import { Router, Request, Response } from 'express';
import { userService } from '../service/UserServiceImpl';
import { userMapper } from '../db/UserMapper';
import { UserRegisterRequest, UserLoginRequest } from '../model';
import { ResultUtils } from '../common/ResultUtils';
import { BusinessException } from '../exception/BusinessException';
import { ErrorCode } from '../common/ErrorCode';
import { USER_LOGIN_STATE, ADMIN_ROLE } from '../constant/UserConstant';

const router = Router();

function isAdmin(request: Request): boolean {
  const user = (request.session as any)[USER_LOGIN_STATE];
  return user && user.userRole === ADMIN_ROLE;
}

// 用户注册
router.post('/register', (req: Request, res: Response) => {
  try {
    const dto: UserRegisterRequest = req.body;
    const id = userService.userRegister(dto);
    res.json(ResultUtils.success(id));
  } catch (e) {
    if (e instanceof BusinessException) {
      res.json(ResultUtils.error(e.code, e.message, e.description));
    } else {
      res.json(ResultUtils.error(ErrorCode.SYSTEM_ERROR));
    }
  }
});

// 用户登录
router.post('/login', (req: Request, res: Response) => {
  const dto: UserLoginRequest = req.body;
  const user = userService.userLogin(dto, req);
  if (!user) {
    res.json(ResultUtils.error(ErrorCode.PARAMS_ERROR));
    return;
  }
  res.json(ResultUtils.success(user));
});

// 用户注销
router.post('/logout', (req: Request, res: Response) => {
  try {
    const result = userService.userLogout(req);
    res.json(ResultUtils.success(result));
  } catch (e) {
    res.json(ResultUtils.error(ErrorCode.SYSTEM_ERROR));
  }
});

// 获取当前用户
router.get('/current', (req: Request, res: Response) => {
  const user = (req.session as any)[USER_LOGIN_STATE];
  if (!user) {
    throw new BusinessException(ErrorCode.NOT_LOGIN);
  }
  // 从数据库获取完整用户信息
  const fullUser = userMapper.findById(user.id);
  if (!fullUser) {
    throw new BusinessException(ErrorCode.NOT_LOGIN);
  }
  const safetyUser = userService.getSafetyUser(fullUser);
  res.json(ResultUtils.success(safetyUser));
});

// 搜索用户 (管理员)
router.get('/search', (req: Request, res: Response) => {
  if (!isAdmin(req)) {
    throw new BusinessException(ErrorCode.NO_AUTH);
  }
  const { username } = req.query as { username?: string };
  // 使用 LIKE 查询
  const userList = userMapper.searchByUsername(username || '');
  const safeUserList = userList.map(user => userService.getSafetyUser(user));
  res.json(ResultUtils.success(safeUserList));
});

// 删除用户 (管理员)
router.post('/delete', (req: Request, res: Response) => {
  if (!isAdmin(req)) {
    throw new BusinessException(ErrorCode.NO_AUTH);
  }
  const { id } = req.body;
  if (!id || id <= 0) {
    throw new BusinessException(ErrorCode.PARAMS_ERROR);
  }
  const result = userMapper.deleteById(id);
  res.json(ResultUtils.success(result));
});

export default router;