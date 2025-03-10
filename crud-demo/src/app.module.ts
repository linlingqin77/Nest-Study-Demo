import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './modules/demo/demo.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, DemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
