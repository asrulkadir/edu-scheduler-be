import { ClassModule } from './modules/class/class.module';
import { StudentModule } from './modules/student/student.module';
import { SubjectsModule } from './modules/subject/subjects.module';
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
    ClassModule,
    StudentModule,
    SubjectsModule,
    TeacherModule,
    AcademicModule,
    AuthModule,
    UserModule,
    CommonModule,
  ],
})
export class AppModule {}
