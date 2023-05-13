import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { LoggerResolver } from '../logger-resolver.interface';
import { LoggerService } from '../logger.service';

@Injectable()
export class RequestIdResolver
  implements LoggerResolver<{ requestId: string }>
{
  constructor(
    loggerService: LoggerService,
    private readonly als: AsyncLocalStorage<{ requestId: string }>,
  ) {
    loggerService.registerResolver(this);
  }
  resolve(): { requestId: string } {
    const store = this.als.getStore();
    if (!store) return undefined;
    const requestId = store['requestId'];
    return { requestId };
  }
}
