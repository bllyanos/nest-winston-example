import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { AlsModule } from './als/als.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule, AlsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly als: AsyncLocalStorage<{ requestId: string }>) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((_req: Request, _res: Response, next: NextFunction) => {
        const store = {
          requestId: randomUUID(),
        };

        this.als.run(store, () => next());
      })
      .forRoutes('*');
  }
}
