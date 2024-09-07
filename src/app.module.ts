import { TeacherModule } from './modules/teacher/teacher.module';
import { AcademicModule } from './modules/academic/academic.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CommonModule } from './common/module/common.module';

@Module({
  imports: [
    TeacherModule,
    AcademicModule,
    AuthModule,
    UserModule,
    CommonModule,
  ],
})
export class AppModule {}
