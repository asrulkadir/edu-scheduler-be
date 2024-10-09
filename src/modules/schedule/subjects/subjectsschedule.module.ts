/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SubjectsScheduleController } from './subjectsschedule.controller';
import { SubjectsScheduleService } from './subjectsschedule.service';

@Module({
  imports: [],
  controllers: [SubjectsScheduleController],
  providers: [SubjectsScheduleService],
})
export class SubjectsScheduleModule {}
