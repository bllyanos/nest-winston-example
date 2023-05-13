import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';
import { LoggerResolver } from './logger-resolver.interface';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(@Inject('WINSTON_PROVIDER') private readonly w: WinstonLogger) {}

  private readonly resolvers: LoggerResolver<any>[] = [];

  public registerResolver<T = any>(resolver: LoggerResolver<T>) {
    this.resolvers.push(resolver);
  }

  private resolveValues(...optionalParams: any[]): any {
    const result: any = {};
    for (const resolver of this.resolvers) {
      const value = resolver.resolve();
      if (value !== undefined && value !== null && typeof value === 'object') {
        Object.assign(result, value);
      }
    }

    for (const optionalParam of optionalParams) {
      if (typeof optionalParam === 'object') {
        Object.assign(result, optionalParam);
      }
    }

    return result;
  }

  log(message: string, ...optionalParams: any[]) {
    const metas = this.resolveValues(...optionalParams);
    this.w.info(message, metas);
  }
  error(message: string, ...optionalParams: any[]) {
    const metas = this.resolveValues(...optionalParams);
    this.w.error(message, metas);
  }
  warn(message: string, ...optionalParams: any[]) {
    const metas = this.resolveValues(...optionalParams);
    this.w.warn(message, metas);
  }
  debug?(message: string, ...optionalParams: any[]) {
    const metas = this.resolveValues(...optionalParams);
    this.w.debug(message, metas);
  }
}
