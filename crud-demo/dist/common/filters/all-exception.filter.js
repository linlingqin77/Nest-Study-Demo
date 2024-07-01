"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const ajax_result_class_1 = require("../class/ajax_result.class");
const api_exception_1 = require("../exceptions/api.exception");
const winston_module_1 = require("../../modules/winston/winston.module");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const { status, result } = this.errorResult(exception);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.status(status).json(result);
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
        this.logger.error(logFormat);
    }
    errorResult(exception) {
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const code = exception instanceof api_exception_1.ApiException
            ? exception.getErrCode()
            : status;
        let message;
        if (exception instanceof common_1.HttpException) {
            const response = exception.getResponse();
            message = response?.message ?? response;
        }
        else {
            message = `${exception}`;
        }
        return {
            status,
            result: ajax_result_class_1.AjaxResult.error(message, code),
        };
    }
};
__decorate([
    (0, common_1.Inject)(winston_module_1.WINSTON_LOGGER_TOKEN),
    __metadata("design:type", Object)
], AllExceptionsFilter.prototype, "logger", void 0);
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=all-exception.filter.js.map