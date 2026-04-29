export interface User {
  id?: number;
  username?: string;
  userAccount?: string;
  avatarUrl?: string;
  gender?: number;
  userPassword?: string;
  phone?: string;
  email?: string;
  userStatus: number;
  createTime?: string;
  updateTime?: string;
  isDelete: number;
  userRole: number;
  planetCode?: string;
}