"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.default = () => {
    let envConfig = {};
    try {
        envConfig = require(`./config.${process.env.NODE_ENV}`).default;
        process.env.uploadPath = envConfig.uploadPath ?? '/upload';
    }
    catch (e) {
        const logger = new common_1.Logger('ConfigModule');
        logger.error(e);
    }
    return envConfig;
};
//# sourceMappingURL=configuration.js.map