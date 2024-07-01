"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDemoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_demo_dto_1 = require("./create-demo.dto");
class UpdateDemoDto extends (0, mapped_types_1.PartialType)(create_demo_dto_1.CreateDemoDto) {
}
exports.UpdateDemoDto = UpdateDemoDto;
//# sourceMappingURL=update-demo.dto.js.map