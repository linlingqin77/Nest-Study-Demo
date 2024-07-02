"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const shared_service_1 = require("./shared.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const ioredis_1 = require("@nestjs-modules/ioredis");
const configuration_1 = require("../config/configuration");
const config_2 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const all_exception_filter_1 = require("../common/filters/all-exception.filter");
const throttler_1 = require("@nestjs/throttler");
const res_transform_interceptor_1 = require("../common/interceptors/res_transform.interceptor");
const winston_module_1 = require("../modules/winston/winston.module");
const winston_1 = require("winston");
const chalk = require("chalk");
const print_log_interceptor_1 = require("../common/interceptors/print_log.interceptor");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_2.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    autoLoadEntities: true,
                    type: configService.get('database.type'),
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.database'),
                    autoLoadModels: configService.get('database.autoLoadModels'),
                    synchronize: configService.get('database.synchronize'),
                    logging: configService.get('database.logging'),
                }),
                inject: [config_1.ConfigService],
            }),
            ioredis_1.RedisModule.forRootAsync({
                useFactory: (configService) => {
                    return {
                        config: {
                            host: configService.get('redis.host'),
                            port: configService.get('redis.port'),
                            password: configService.get('redis.password'),
                            db: configService.get('redis.db'),
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 60,
            }),
            winston_module_1.WinstonModule.forRoot({
                level: 'debug',
                transports: [
                    new winston_1.transports.Console({
                        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf(({ context, level, message, time }) => {
                            const appStr = chalk.green(`[NEST]`);
                            const contextStr = chalk.yellow(`[${context}]`);
                            return `${appStr} ${time} ${level} ${contextStr} ${message} `;
                        })),
                    }),
                    new winston_1.transports.File({
                        format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
                        filename: '111.log',
                        dirname: 'log',
                    }),
                ],
            }),
        ],
        controllers: [],
        providers: [
            shared_service_1.SharedService,
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                    transform: true,
                    transformOptions: {
                        enableImplicitConversion: true,
                    },
                }),
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: res_transform_interceptor_1.ReponseTransformInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: print_log_interceptor_1.PrintLogInterceptor,
            },
        ],
        exports: [shared_service_1.SharedService],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map