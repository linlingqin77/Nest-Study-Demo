import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { Demo } from './entities/demo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AjaxResult } from 'src/common/class/ajax_result.class';
import { DataObj } from 'src/common/class/data_obj.class';
import { WINSTON_LOGGER_TOKEN } from '../winston/winston.module';
@Injectable()
export class DemoService {
  @InjectRepository(Demo)
  private readonly demoRepository: Repository<Demo>;

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;
  async create(createDemoDto: CreateDemoDto) {
    const data = await this.demoRepository.save(createDemoDto);

    return AjaxResult.success(data, '新增成功');
  }

  async findAll() {
    return await this.demoRepository.find();
  }

  findOne(id: number) {
    const data = [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
    ];
    console.log(DataObj.create(data));
    this.logger.log('成功');
    return DataObj.create(data);
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
