import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

/*
Este es el módulo principal de la aplicación. 
Importa otros módulos y configura el guardia de limitación de tasa 
(ThrottlerGuard) para proteger la API contra el abuso de solicitudes.
*/
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 segundos
        limit: 100,
      },
    ]),
    DatabaseModule,
    ApiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
