"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoService = void 0;
const common_1 = require("@nestjs/common");
const demo_entity_1 = require("./entities/demo.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ajax_result_class_1 = require("../../common/class/ajax_result.class");
const data_obj_class_1 = require("../../common/class/data_obj.class");
const winston_module_1 = require("../winston/winston.module");
let DemoService = class DemoService {
    async create(createDemoDto) {
        const data = await this.demoRepository.save(createDemoDto);
        return ajax_result_class_1.AjaxResult.success(data, '新增成功');
    }
    async findAll() {
        return await this.demoRepository.find();
    }
    findOne(id) {
        const data = [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' },
        ];
        console.log(data_obj_class_1.DataObj.create(data));
        this.logger.log('成功');
        return data_obj_class_1.DataObj.create(data);
    }
    update(id, updateDemoDto) {
        return `This action updates a #${id} demo`;
    }
    remove(id) {
        return `This action removes a #${id} demo`;
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(demo_entity_1.Demo),
    __metadata("design:type", typeorm_2.Repository)
], DemoService.prototype, "demoRepository", void 0);
__decorate([
    (0, common_1.Inject)(winston_module_1.WINSTON_LOGGER_TOKEN),
    __metadata("design:type", Object)
], DemoService.prototype, "logger", void 0);
DemoService = __decorate([
    (0, common_1.Injectable)()
], DemoService);
exports.DemoService = DemoService;
//# sourceMappingURL=demo.service.js.map