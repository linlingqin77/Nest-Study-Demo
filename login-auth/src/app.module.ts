import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/system/user/user.module';
import { AuthModule } from './modules/system/auth/auth.module';
import { LoginModule } from './modules/login/login.module';
@Module({
  imports: [SharedModule, UserModule, AuthModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
