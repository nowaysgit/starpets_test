import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { IApp } from './common/configuration';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const app = await NestFactory.create(AppModule, { cors: true, bufferLogs: true });
  const configApp = app.get(ConfigService).get<IApp>('app');

  const documentationConfig = new DocumentBuilder().setTitle('TEST API').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, documentationConfig);
  SwaggerModule.setup('docs', app, document);

  app.use(helmet());
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      forbidUnknownValues: true,
    }),
  );
  await app.listen(configApp.port, '0.0.0.0', () =>
    console.info(`Server started on port: ${configApp.port} by ${process.env.NODE_ENV} mode`),
  );
}
// eslint-disable-next-line unicorn/prefer-top-level-await
start();
