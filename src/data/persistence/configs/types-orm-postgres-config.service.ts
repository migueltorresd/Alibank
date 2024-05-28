import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  AccountEntity,
  AccountTypeEntity,
  CustomerEntity,
  DepositEntity,
  DocumentTypeEntity,
  TransferEntity,
} from '../entities';

/**
 * Servicio para la configuración de opciones de TypeORM para PostgreSQL
 *
 * @export
 * @class TypesOrmPostgresConfigService
 * @implements {TypeOrmOptionsFactory}
 */
@Injectable()
export class TypesOrmPostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Método para crear las opciones de configuración de TypeORM para PostgreSQL
   *
   * @returns {TypeOrmModuleOptions} Opciones de configuración de TypeORM
   * @memberof TypesOrmPostgresConfigService
   */
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [
        AccountTypeEntity,
        AccountEntity,
        CustomerEntity,
        DepositEntity,
        DocumentTypeEntity,
        TransferEntity,
      ],
      synchronize: true,
      // logging: true,
    };
  }
}
