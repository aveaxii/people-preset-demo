import { Module } from '@nestjs/common';
import { PromptingController } from './prompting.controller';
import { PromptingService } from './prompting.service';
import { Utility } from './util';

@Module({
  controllers: [PromptingController],
  providers: [PromptingService, Utility],
})
export class PromptingModule {}
