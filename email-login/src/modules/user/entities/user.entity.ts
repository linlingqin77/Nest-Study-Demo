import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  /* 用户Id */
  @PrimaryGeneratedColumn({
    name: 'user_id',
    comment: '用户ID',
  })
  userId: number;

  /* 用户账号 */
  @Column({
    name: 'user_name',
    comment: '用户账号',
    length: 30,
  })
  userName: string;

  /* 用户昵称 */
  @Column({
    name: 'nick_name',
    comment: '用户昵称',
    length: 30,
  })
  nickName: string;

  /* 用户类型 */
  @Column({
    name: 'user_type',
    comment: '用户类型（00系统用户）',
    length: 2,
    default: '00',
  })
  userType?: string;

  /* 用户邮箱 */
  @Column({
    comment: '用户邮箱',
    length: 50,
    default: null,
  })
  email?: string;

  /* 手机号码 */
  @Column({
    comment: '手机号码',
    length: 11,
    default: null,
  })
  phonenumber?: string;

  @Column({
    comment: '用户性别（0男 1女 2未知）',
    type: 'char',
    length: 1,
    default: '0',
  })
  sex: string;

  /* 头像地址 */
  @Column({
    comment: '头像地址',
    length: 100,
    default: '',
  })
  avatar?: string;

  /* 密码 */
  @Column({
    comment: '密码',
    length: 100,
    default: '',
    select: false,
  })
  password: string;

  @Column({
    comment: '盐加密',
    length: 100,
    default: '',
    select: false,
  })
  salt: string;

  /* 帐号状态 */
  @Column({
    comment: '帐号状态（0正常 1停用）',
    type: 'char',
    length: 1,
    default: '0',
  })
  status: string;

  @Column({
    name: 'del_flag',
    comment: '删除标志（0代表存在 2代表删除）',
    type: 'char',
    length: 1,
    default: '0',
  })
  delFlag: string;

  /* 最后登录IP */
  @Column({
    name: 'login_ip',
    comment: '最后登录IP',
    length: 128,
    default: '',
  })
  loginIp?: string;

  /* 最后登录时间 */
  @Column({
    name: 'login_date',
    comment: '最后登录时间',
    default: null,
  })
  loginDate?: Date;
}
