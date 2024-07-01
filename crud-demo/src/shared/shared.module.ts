import { SharedService } from './shared.service';
import { Global, Module, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import configuration from '../config/configuration';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';
import { ThrottlerModule } from '@nestjs/throttler';
// 统一返回体
import { ReponseTransformInterceptor } from 'src/common/interceptors/res_transform.interceptor';
import { WinstonModule } from 'src/modules/winston/winston.module';
import { transports, format } from 'winston';
import * as chalk from 'chalk';
// 日志收集
import { TransformInterceptor } from 'src/common/interceptors/print_log.interceptor';
@Global()
@Module({
  imports: [
    /* 配置文件模块 */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    /* 连接mysql数据库 */
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: configService.get<any>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        autoLoadModels: configService.get<boolean>('database.autoLoadModels'),
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: configService.get('database.logging'),
      }),
      inject: [ConfigService],
    }),

    /* 连接redis */
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          config: {
            host: configService.get<string>('redis.host'),
            port: configService.get<number>('redis.port'),
            password: configService.get<string>('redis.password'),
            db: configService.get<number>('redis.db'),
          },
        };
      },
      inject: [ConfigService],
    }),
    /* 导入速率限制模块   ttl:单位秒钟， 表示ttl秒内最多只能请求 limit 次， 避免暴力攻击。*/
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);

              return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            }),
          ),
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: '111.log',
          dirname: 'log',
        }),
      ],
    }),
  ],
  controllers: [],
  providers: [
    SharedService,

    //全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    //全局参数校验管道
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, //去除多余属性
        // forbidNonWhitelisted: true, //禁止非白名单属性
        transform: true, //是否将字符串转换为类型
        transformOptions: {
          // 这个配置项是针对 transform 功能的进一步细化。当设置为 true，它允许 class-transformer 在转换过程中进行隐式类型转换。这意味着，例如，如果一个字符串可以被安全地解释为数字（如 "123"），它就会被转换成数字类型，而不引发错误。这对于确保数据能自动适应其预期类型非常有用，但也需要谨慎使用，以避免意外的类型转换行为。
          enableImplicitConversion: true, //是否隐式转换
        },
      }),
    },
    // 统一返回体
    {
      provide: APP_INTERCEPTOR,
      useClass: ReponseTransformInterceptor,
    },
    // 日志收集
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [SharedService],
})
export class SharedModule {}
