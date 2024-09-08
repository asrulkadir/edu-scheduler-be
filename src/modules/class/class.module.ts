import { ClassService } from './class.service';
import { ClassController } from './class.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
