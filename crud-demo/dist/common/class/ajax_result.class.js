"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjaxResult = void 0;
class AjaxResult {
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        Object.assign(this, data);
    }
    static success(data, msg = '操作成功') {
        return new AjaxResult(200, msg, data);
    }
    static error(msg = '操作失败', code = 500) {
        return new AjaxResult(code, msg, null);
    }
}
exports.AjaxResult = AjaxResult;
//# sourceMappingURL=ajax_result.class.js.map