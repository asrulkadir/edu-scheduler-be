import { AcademicController } from './academic.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AcademicService } from './academic.service';

@Module({
  imports: [],
  controllers: [AcademicController],
  providers: [AcademicService],
})
export class AcademicModule {}
