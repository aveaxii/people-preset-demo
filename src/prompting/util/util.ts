import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

export class Utility {
  private readonly axiosInstance = axios.create();
  constructor() {
    this.axiosInstance = axios.create();
  }
  async getListOfEngines() {
    try {
      const response = await this.axiosInstance.get(
        'https://api.stability.ai/v1/engines/list',
        {
          headers: {
            Authorization: 'Bearer ' + process.env.API_KEY, // CREATE YOUR .ENV FILE AND PUT THERE API_KEY (STABILITY API KEY)
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to get list of engines: ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
