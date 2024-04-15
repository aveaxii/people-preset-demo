import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PromptingService } from './prompting.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Utility } from './util/util';
import { UserRequestPresetIdDto } from './dto/userRequestPresetIdDto';

@Controller('prompting')
export class PromptingController {
  constructor(
    private readonly promptingService: PromptingService,
    private readonly utility: Utility,
  ) {}

  @Post('preset-16')
  @UseInterceptors(FileInterceptor('image'))
  async getPrompting16(
    @Body() userRequestPresetIdDto: UserRequestPresetIdDto,
    @UploadedFile() image: Express.Multer.File,
    @Res() res: Response,
  ) {
    const imageBuffer = await this.promptingService.imageToImageV16(
      userRequestPresetIdDto,
      image,
    );

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', imageBuffer.length.toString());

    res.end(imageBuffer);
  }

  // @Post('preset-XL')
  // @UseInterceptors(FileInterceptor('image'))
  // async getPromptingXL(
  //   @Body('userPrompt') userPrompt: string,
  //   @Body('preset') preset: string,
  //   @Body('weight') weight: number,
  //   @UploadedFile() image: Express.Multer.File,
  //   @Res() res: Response,
  // ) {
  //   const imageBuffer = await this.promptingService.imageToImageXL(
  //     userPrompt,
  //     preset,
  //     weight,
  //     image,
  //   );
  //
  //   res.setHeader('Content-Type', 'image/jpeg');
  //   res.setHeader('Content-Length', imageBuffer.length.toString());
  //
  //   res.end(imageBuffer);
  // }

  @Get('engines')
  async getEngines() {
    return await this.utility.getListOfEngines();
  }
}
