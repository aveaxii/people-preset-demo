import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Preset } from './presets';
import axios, { AxiosInstance } from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
@Injectable()
export class PromptingService {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create();
  }

  async imageToImageV16(
    userPrompt: string,
    preset: string,
    weight: number,
    image: Express.Multer.File,
  ) {
    const chosenPreset = this.handlePreset(preset);

    const promptToSend = `${userPrompt} ${chosenPreset}`;
    console.log(promptToSend);
    if (!image) {
      throw new HttpException('Image is not embedded', HttpStatus.BAD_REQUEST);
    }

    const formData = new FormData();
    formData.append('text_prompts[0][text]', promptToSend);
    formData.append('text_prompts[0][weight]', weight);
    formData.append('init_image', image.buffer, {
      filename: image.originalname,
    });
    formData.append('init_image_mode', 'IMAGE_STRENGTH');
    formData.append('image_strength', 0.12); // 0.1, 0.07, 0.05 is good
    formData.append('cfg_scale', 18); // 14, 22 is good
    formData.append('clip_guidance_preset', 'SLOW'); // SIMPLE is good
    formData.append('samples', 1);
    formData.append('seed', 0);
    formData.append('steps', 50); // 33 is good
    // formData.append('style_preset', 'digital-art');
    // formData.append('sampler', 'K_DPM_2');
    console.log('Sending request...');

    try {
      const response = await this.axiosInstance.postForm(
        'https://api.stability.ai/v1/generation/stable-diffusion-v1-6/image-to-image',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + process.env.API_KEY, // CREATE YOUR .ENV FILE AND PUT THERE API_KEY (STABILITY API KEY)
            Accept: 'image/png',
            ...formData.getHeaders(),
          },
          responseType: 'arraybuffer',
        },
      );

      console.log('Response received');

      const filename = '16response' + '-' + uuid() + '.png';
      await this.saveImage(response.data, filename);

      // transform arraybuffer to image

      return Buffer.from(response.data, 'binary');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data.toString());
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request error:', error.message);
      }

      throw new HttpException(
        'Failed to generate image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async imageToImageXL(
    userPrompt: string,
    preset: string,
    weight: number,
    image: Express.Multer.File,
  ) {
    const chosenPreset = this.handlePreset(preset);

    const promptToSend = `${userPrompt} ${chosenPreset}`;
    console.log(promptToSend);
    if (!image) {
      throw new HttpException('Image is not embedded', HttpStatus.BAD_REQUEST);
    }

    const formData = new FormData();
    formData.append('text_prompts[0][text]', promptToSend);
    formData.append('text_prompts[0][weight]', weight);
    formData.append('init_image', image.buffer, {
      filename: image.originalname,
    });
    formData.append('init_image_mode', 'IMAGE_STRENGTH');
    formData.append('image_strength', 0.09);
    formData.append('cfg_scale', 19);
    formData.append('clip_guidance_preset', 'SLOW');
    formData.append('samples', 1);
    formData.append('seed', 0);
    formData.append('steps', 50);
    formData.append('sampler', 'K_HEUN');
    console.log('Sending request...');

    try {
      const response = await this.axiosInstance.postForm(
        'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + process.env.API_KEY, // CREATE YOUR .ENV FILE AND PUT THERE API_KEY (STABILITY API KEY)
            Accept: 'image/png',
            ...formData.getHeaders(),
          },
          responseType: 'arraybuffer',
        },
      );

      console.log('Response received');

      const filename = 'XLresponse' + '-' + uuid() + '.png';
      await this.saveImage(response.data, filename);

      // transform arraybuffer to image

      return Buffer.from(response.data, 'binary');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data.toString());
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request error:', error.message);
      }

      throw new HttpException(
        'Failed to generate image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  handlePreset(preset: string): string {
    // TODO: rethink how to make this preset handler effective
    switch (preset) {
      case 'cartoon':
        return (preset = '');
      case '':
      default: {
        throw new HttpException('Preset not found', HttpStatus.NOT_FOUND);
      }
    }
  }

  private async saveImage(imageData: ArrayBuffer, filename: string) {
    try {
      const filePath = `./generated/${filename}`;
      const imageBuffer = Buffer.from(imageData);
      await fs.promises.writeFile(filePath, imageBuffer);
    } catch (error) {
      throw new Error('Failed to save image: ' + error);
    }
  }
}
