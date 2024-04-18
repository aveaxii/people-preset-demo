import { Module } from '@nestjs/common';
import { PromptingController } from './prompting.controller';
import { PromptingService } from './prompting.service';
import { Utility } from './util/util';
import { PosesHandler } from './poses/posesHandler';

@Module({
  controllers: [PromptingController],
  providers: [PromptingService, Utility, PosesHandler],
})
export class PromptingModule {}
