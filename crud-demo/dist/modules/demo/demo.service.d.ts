import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { Demo } from './entities/demo.entity';
import { DataObj } from 'src/common/class/data_obj.class';
export declare class DemoService {
    private readonly demoRepository;
    create(createDemoDto: CreateDemoDto): Promise<DataObj<CreateDemoDto & Demo>>;
    findAll(): Promise<Demo[]>;
    findOne(id: number): DataObj<{
        id: number;
        name: string;
    }[]>;
    update(id: number, updateDemoDto: UpdateDemoDto): string;
    remove(id: number): string;
}
