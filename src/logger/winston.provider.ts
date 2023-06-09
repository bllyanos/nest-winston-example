import { Provider } from '@nestjs/common';
import * as winston from 'winston';
import LokiTransport = require('winston-loki');

export const WinstonProvider: Provider = {
  provide: 'WINSTON_PROVIDER',
  useValue: winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.printf(
          ({ level, message, timestamp, ...rest }) => {
            const restProps = () => {
              const keys = Object.keys(rest);
              if (keys.length > 0) {
                return '\n' + JSON.stringify(rest);
              }
              return '';
            };
            return `${(timestamp as string).substring(
              0,
              19,
            )} | ${level.toUpperCase()} ${message}${restProps()}`;
          },
        ),
      }),

      new LokiTransport({
        host: 'http://localhost:3100',
        json: true,
        format: winston.format.json(),
        labels: { job: 'nest-logging-winston' },
      }),
    ],
  }),
};
