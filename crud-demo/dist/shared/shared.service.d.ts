import { Request } from 'express';
export declare class SharedService {
    handleTree(data: any[], id?: string, parentId?: string, children?: string): any[];
    getReqIP(req: Request): string;
    IsLAN(ip: string): boolean;
    getLocation(ip: string): Promise<string>;
    aesEncrypt(msg: string, secret: string): string;
    aesDecrypt(encrypted: string, secret: string): string;
    md5(msg: string): string;
    generateUUID(): string;
    generateRandomValue(length: number, placeholder?: string): string;
}
