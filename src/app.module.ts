import { AcademicModule } from './modules/schedule/academic/academic.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CommonModule } from './common/module/common.module';

@Module({
  imports: [AcademicModule, AuthModule, UserModule, CommonModule],
})
export class AppModule {}
