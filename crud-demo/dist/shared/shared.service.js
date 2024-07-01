"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedService = void 0;
const common_1 = require("@nestjs/common");
const CryptoJS = require("crypto-js");
const nanoid_1 = require("nanoid");
const axios_1 = require("axios");
const iconv = require("iconv-lite");
let SharedService = class SharedService {
    handleTree(data, id, parentId, children) {
        const config = {
            id: id || 'id',
            parentId: parentId || 'parentId',
            childrenList: children || 'children',
        };
        const childrenListMap = {};
        const nodeIds = {};
        const tree = [];
        for (const d of data) {
            const parentId = d[config.parentId];
            if (childrenListMap[parentId] == null) {
                childrenListMap[parentId] = [];
            }
            nodeIds[d[config.id]] = d;
            childrenListMap[parentId].push(d);
        }
        for (const d of data) {
            const parentId = d[config.parentId];
            if (nodeIds[parentId] == null) {
                tree.push(d);
            }
        }
        for (const t of tree) {
            adaptToChildrenList(t);
        }
        function adaptToChildrenList(o) {
            if (childrenListMap[o[config.id]] !== null) {
                o[config.childrenList] = childrenListMap[o[config.id]];
            }
            if (o[config.childrenList]) {
                for (const c of o[config.childrenList]) {
                    adaptToChildrenList(c);
                }
            }
        }
        return tree;
    }
    getReqIP(req) {
        return ((req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress ||
            '').replace('::ffff:', ''));
    }
    IsLAN(ip) {
        ip.toLowerCase();
        if (ip == 'localhost')
            return true;
        let a_ip = 0;
        if (ip == '')
            return false;
        const aNum = ip.split('.');
        if (aNum.length != 4)
            return false;
        a_ip += parseInt(aNum[0]) << 24;
        a_ip += parseInt(aNum[1]) << 16;
        a_ip += parseInt(aNum[2]) << 8;
        a_ip += parseInt(aNum[3]) << 0;
        a_ip = (a_ip >> 16) & 0xffff;
        return (a_ip >> 8 == 0x7f ||
            a_ip >> 8 == 0xa ||
            a_ip == 0xc0a8 ||
            (a_ip >= 0xac10 && a_ip <= 0xac1f));
    }
    async getLocation(ip) {
        if (this.IsLAN(ip))
            return '内网IP';
        try {
            let { data } = await axios_1.default.get(`http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`, { responseType: 'arraybuffer' });
            data = JSON.parse(iconv.decode(data, 'gbk'));
            return data.pro + ' ' + data.city;
        }
        catch (error) {
            return '未知';
        }
    }
    aesEncrypt(msg, secret) {
        return CryptoJS.AES.encrypt(msg, secret).toString();
    }
    aesDecrypt(encrypted, secret) {
        return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    }
    md5(msg) {
        return CryptoJS.MD5(msg).toString();
    }
    generateUUID() {
        return (0, nanoid_1.nanoid)();
    }
    generateRandomValue(length, placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM') {
        const customNanoid = (0, nanoid_1.customAlphabet)(placeholder, length);
        return customNanoid();
    }
};
SharedService = __decorate([
    (0, common_1.Injectable)()
], SharedService);
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map