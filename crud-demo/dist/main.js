"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const winston_module_1 = require("./modules/winston/winston.module");
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(app.get(winston_module_1.WINSTON_LOGGER_TOKEN));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map