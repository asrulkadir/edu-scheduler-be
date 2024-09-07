import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
