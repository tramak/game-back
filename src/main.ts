import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API tactise')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('tactise')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      always: false,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = validationErrors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints)[0],
        }));

        return new BadRequestException({
          errors,
          statusCode: 400,
        });
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
}
bootstrap();
