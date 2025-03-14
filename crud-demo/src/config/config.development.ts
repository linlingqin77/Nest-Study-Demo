import { defineConfig } from './defineConfig';

export default defineConfig({
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
  },
  // typeorm 配置
  database: {
    type: process.env.MYSQL_TYPE || 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USERNAME || 'xiaoqi',
    password: process.env.MYSQL_PASSWORD || '123456',
    database: process.env.MYSQL_DATABASE || 'nest-server',
    autoLoadModels: true,
    synchronize: true,
    logging: false,
  },
  // redis 配置
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || '6379',
    password: process.env.REDIS_PASSWORD || '123456',
    db: process.env.REDIS_DB || '0',
  },

  // 队列reids 配置
  bullRedis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || '6379',
    password: process.env.REDIS_PASSWORD || '123456',
  },

  //文件上传地址  例如： E:/upload/test
  uploadPath: '',
  // 静态资源前缀
  staticPrefix: process.env.staticPrefix,
  // 是否演示环境
  isDemoEnvironment: process.env.isDemoEnvironment == 'DemoEnvironment',
});
