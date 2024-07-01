"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
const common_1 = require("@nestjs/common");
class ApiException extends common_1.HttpException {
    constructor(msg, errCode) {
        if (errCode && errCode == 401) {
            super(msg, 200);
            this.errCode = 401;
        }
        else {
            super(msg, errCode ?? 200);
            this.errCode = errCode ?? 500;
        }
    }
    getErrCode() {
        return this.errCode;
    }
}
exports.ApiException = ApiException;
//# sourceMappingURL=api.exception.js.map