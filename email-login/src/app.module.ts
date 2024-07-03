import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { EmailModule } from './modules/email/email.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [SharedModule, EmailModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
