import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ls: LoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.ls.log('Masoook', { sadis: 'mantap' });
    return this.appService.getHello();
  }
}
