import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { AjaxResult } from '../class/ajax_result.class';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private logger;
    catch(exception: unknown, host: ArgumentsHost): void;
    errorResult(exception: unknown): {
        status: number;
        result: AjaxResult;
    };
}
