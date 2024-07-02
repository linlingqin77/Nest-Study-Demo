"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintLogInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const log4js_1 = require("../../shared/log4js");
let PrintLogInterceptor = class PrintLogInterceptor {
    intercept(context, next) {
        const req = context.getArgByIndex(1).req;
        return next.handle().pipe((0, operators_1.map)((data) => {
            const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    User: ${JSON.stringify(req.user)}
    Response data:\n ${JSON.stringify(data)}
    body: ${JSON.stringify(req.body)}
    query: ${JSON.stringify(req.query)}
    params: ${JSON.stringify(req.params)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
            log4js_1.Logger.info(logFormat);
            log4js_1.Logger.access(logFormat);
            return data;
        }));
    }
};
PrintLogInterceptor = __decorate([
    (0, common_1.Injectable)()
], PrintLogInterceptor);
exports.PrintLogInterceptor = PrintLogInterceptor;
//# sourceMappingURL=print_log.interceptor.js.map