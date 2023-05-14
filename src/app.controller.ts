import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ls: LoggerService,
  ) {}

  @Get()
  getHello(
    @Query('message') message?: string,
    @Query('error') isError?: string,
  ): string {
    if (!isError) {
      this.ls.log('Masoook', { sadis: 'mantap', query: message });
    } else {
      this.ls.error('Error loh', { query: message });
    }
    return this.appService.getHello();
  }
}
