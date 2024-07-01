import { HttpException } from '@nestjs/common';
export declare class ApiException extends HttpException {
    private errCode;
    constructor(msg: string, errCode?: number);
    getErrCode(): number;
}
