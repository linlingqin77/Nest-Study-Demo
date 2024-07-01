export declare class AjaxResult {
    readonly code: number;
    readonly msg: string;
    [key: string]: any;
    constructor(code: any, msg: any, data: any);
    static success(data?: any, msg?: string): AjaxResult;
    static error(msg?: string, code?: number): AjaxResult;
}
