import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { QueryFailedFilter } from './common/filters/query-failed.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new HttpExceptionFilter(), new QueryFailedFilter());

	const configService = app.get(ConfigService);
	const port = parseInt(configService.get<string>('PORT') ?? '8080', 10);

	await app.listen(port);
	console.log(`\nApplication is running on: ${await app.getUrl()}`);
}
  
bootstrap();