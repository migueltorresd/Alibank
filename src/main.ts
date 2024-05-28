// Libraries
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// Main module
import { AppModule } from './app.module';

/**
 * Función de inicio de la aplicación.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors();

  // Aplicar tubería de validación global
  app.useGlobalPipes(new ValidationPipe());

  // Escuchar en el puerto 3000
  await app.listen(3000);
}

// Iniciar la aplicación
bootstrap();
