"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defineConfig_1 = require("./defineConfig");
exports.default = (0, defineConfig_1.defineConfig)({
    jwt: {
        secret: process.env.JWT_SECRET || '123456',
    },
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
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || '6379',
        password: process.env.REDIS_PASSWORD || '123456',
        db: process.env.REDIS_DB || '0',
    },
    bullRedis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || '6379',
        password: process.env.REDIS_PASSWORD || '123456',
    },
    uploadPath: '',
    staticPrefix: process.env.staticPrefix,
    isDemoEnvironment: process.env.isDemoEnvironment == 'DemoEnvironment',
});
//# sourceMappingURL=config.production.js.map