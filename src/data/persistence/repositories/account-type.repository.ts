import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountTypeEntity } from '../entities/account-type.entity';
import { AccountTypeRepositoryInterface } from './interfaces/';

/**
 * Repositorio para la entidad de tipos de cuenta.
 *
 * @export
 * @class AccountTypeRepository
 * @implements {AccountTypeRepositoryInterface} Interfaz del repositorio de tipos de cuenta
 */
@Injectable()
export class AccountTypeRepository implements AccountTypeRepositoryInterface {
  constructor(
    @InjectRepository(AccountTypeEntity)
    private readonly userRepository: Repository<AccountTypeEntity>,
  ) {
    // Se registran algunos tipos de cuenta por defecto al inicializar el repositorio
    this.register({
      id: 'ab27c9ac-a01c-4c22-a6d6-ce5ab3b79185',
      name: 'Cuenta de ahorros',
      state: true,
    });

    this.register({
      id: '10b6c590-85fa-4621-b85a-4021e882c080',
      name: 'Cuenta corriente',
      state: true,
    });
  }

  /**
   * Encuentra todos los tipos de cuenta.
   *
   * @returns {Promise<AccountTypeEntity[]>} Promesa que resuelve con un arreglo de todos los tipos de cuenta
   * @memberof AccountTypeRepository
   */
  findAll(): Promise<AccountTypeEntity[]> {
    return this.userRepository.find();
  }

  /**
   * Registra un nuevo tipo de cuenta.
   *
   * @param {AccountTypeEntity} entity Entidad del tipo de cuenta a registrar
   * @returns {Promise<AccountTypeEntity>} Promesa que resuelve con el tipo de cuenta registrado
   * @memberof AccountTypeRepository
   */
  register(entity: AccountTypeEntity): Promise<AccountTypeEntity> {
    return this.userRepository.save(entity);
  }

  /**
   * Actualiza un tipo de cuenta existente.
   *
   * @param {string} id ID del tipo de cuenta a actualizar
   * @param {AccountTypeEntity} entity Nuevos datos del tipo de cuenta
   * @returns {Promise<AccountTypeEntity>} Promesa que resuelve con el tipo de cuenta actualizado
   * @memberof AccountTypeRepository
   */
  async update(
    id: string,
    entity: AccountTypeEntity,
  ): Promise<AccountTypeEntity> {
    return this.userRepository.update(id, entity).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`El Id: ${id} no existe en la base de datos`);
      }
      return entity;
    });
  }

  /**
   * Elimina un tipo de cuenta.
   *
   * @param {string} id ID del tipo de cuenta a eliminar
   * @memberof AccountTypeRepository
   */
  delete(id: string): void {
    this.userRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`El Id: ${id} no existe en la base de datos`);
      }
    });
  }

  /**
   * Encuentra un tipo de cuenta por su ID.
   *
   * @param {string} id ID del tipo de cuenta a buscar
   * @returns {Promise<AccountTypeEntity>} Promesa que resuelve con el tipo de cuenta encontrado
   * @memberof AccountTypeRepository
   */
  async findOneById(id: string): Promise<AccountTypeEntity> {
    return this.userRepository
      .findOne({
        where: { id },
      })
      ?.then((result) => {
        if (result) {
          return result;
        } else {
          throw new NotFoundException(
            `El Id: ${id} no existe en la base de datos`,
          );
        }
      });
  }

  /**
   * Encuentra tipos de cuenta por su estado.
   *
   * @param {boolean} state Estado de los tipos de cuenta a buscar
   * @returns {Promise<AccountTypeEntity[]>} Promesa que resuelve con un arreglo de tipos de cuenta encontrados
   * @memberof AccountTypeRepository
   */
  findByState(state: boolean): Promise<AccountTypeEntity[]> {
    return this.userRepository.find({ where: { state } });
  }

  /**
   * Encuentra tipos de cuenta por su nombre.
   *
   * @param {string} name Nombre de los tipos de cuenta a buscar
   * @returns {Promise<AccountTypeEntity[]>} Promesa que resuelve con un arreglo de tipos de cuenta encontrados
   * @memberof AccountTypeRepository
   */
  findByName(name: string): Promise<AccountTypeEntity[]> {
    return this.userRepository.find({ where: { name } });
  }
}
