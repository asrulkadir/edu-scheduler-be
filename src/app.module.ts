import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import { UserController } from './modules/user/user.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/module/common.module';

@Module({
  imports: [UserModule, CommonModule],
  controllers: [UserController, AppController],
  providers: [UserService, AppService],
})
export class AppModule {}
