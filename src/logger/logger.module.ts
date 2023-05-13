import { Global, Module } from '@nestjs/common';
import { RequestIdResolver } from './builtin-resolvers/requestid-resolver';
import { TimestampResolver } from './builtin-resolvers/timestamp-resolver';
import { LoggerService } from './logger.service';
import { WinstonProvider } from './winston.provider';

@Global()
@Module({
  providers: [
    WinstonProvider,
    LoggerService,
    TimestampResolver,
    RequestIdResolver,
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
