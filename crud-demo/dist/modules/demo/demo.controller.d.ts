import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
export declare class DemoController {
    private readonly demoService;
    constructor(demoService: DemoService);
    create(createDemoDto: CreateDemoDto): Promise<import("../../common/class/ajax_result.class").AjaxResult>;
    findAll(): Promise<import("./entities/demo.entity").Demo[]>;
    findOne(id: string): import("../../common/class/data_obj.class").DataObj<{
        id: number;
        name: string;
    }[]>;
    update(id: string, updateDemoDto: UpdateDemoDto): string;
    remove(id: string): string;
}
