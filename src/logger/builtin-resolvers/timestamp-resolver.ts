import { Injectable } from '@nestjs/common';
import { LoggerResolver } from '../logger-resolver.interface';
import { LoggerService } from '../logger.service';

@Injectable()
export class TimestampResolver
  implements LoggerResolver<{ timestamp: string }>
{
  constructor(loggerService: LoggerService) {
    loggerService.registerResolver(this);
  }

  resolve(): { timestamp: string } {
    return { timestamp: new Date().toISOString() };
  }
}
