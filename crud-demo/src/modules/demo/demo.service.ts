import { Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { Demo } from './entities/demo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataObj } from 'src/common/class/data_obj.class';
@Injectable()
export class DemoService {
  @InjectRepository(Demo)
  private readonly demoRepository: Repository<Demo>;
  async create(createDemoDto: CreateDemoDto) {
    const data = await this.demoRepository.save(createDemoDto);
    return DataObj.create(data);
  }

  async findAll() {
    return await this.demoRepository.find();
  }

  findOne(id: number) {
    const data = [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
    ];
    return DataObj.create(data);
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
