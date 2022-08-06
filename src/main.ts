import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { config } from 'dotenv';

config()

async function bootstrap() {
    const logger = new Logger()
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.listen(process.env.APP_PORT);
    logger.log(`App listening on ${process.env.APP_PORT}`)
}

bootstrap();
