import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class TransformInterceptor implements NestInterceptor {
    private logger;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
