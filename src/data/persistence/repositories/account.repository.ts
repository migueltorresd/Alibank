import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../entities';
import { AccountRepositoryInterface } from './interfaces/';

/**
 * Repositorio para la entidad de cuenta.
 *
 * @export
 * @class AccountRepository
 * @implements {AccountRepositoryInterface} Interfaz del repositorio de cuentas
 */
@Injectable()
export class AccountRepository implements AccountRepositoryInterface {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly userRepository: Repository<AccountEntity>,
  ) {}

  /**
   * Registra una nueva cuenta.
   *
   * @param {AccountEntity} entity Entidad de la cuenta a registrar
   * @returns {Promise<AccountEntity>} Promesa que resuelve con la cuenta registrada
   * @memberof AccountRepository
   */
  register(entity: AccountEntity): Promise<AccountEntity> {
    return this.userRepository.save(entity);
  }

  /**
   * Actualiza una cuenta existente.
   *
   * @param {string} id ID de la cuenta a actualizar
   * @param {AccountEntity} entity Nuevos datos de la cuenta
   * @returns {Promise<AccountEntity>} Promesa que resuelve con la cuenta actualizada
   * @memberof AccountRepository
   */
  async update(id: string, entity: AccountEntity): Promise<AccountEntity> {
    return this.userRepository.update(id, entity).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`El Id: ${id} no existe en la base de datos`);
      }
      return entity;
    });
  }

  /**
   * Encuentra una cuenta por su ID.
   *
   * @param {string} id ID de la cuenta a buscar
   * @returns {Promise<AccountEntity>} Promesa que resuelve con la cuenta encontrada
   * @memberof AccountRepository
   */
  findOneById(id: string): Promise<AccountEntity> {
    const deletedAt = undefined;
    return this.userRepository
      .findOne({
        where: { id, deletedAt },
      })
      .then((result) => {
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
   * Elimina una cuenta.
   *
   * @param {string} id ID de la cuenta a eliminar
   * @param {boolean} [soft] Indica si la eliminación debe ser suave (borrado lógico) o no
   * @memberof AccountRepository
   */
  delete(id: string, soft?: boolean): void {
    this.findOneById(id);
    if (soft || soft === undefined) {
      this.softDelete(id);
    } else {
      this.hardDelete(id);
    }
  }

  private hardDelete(id: string): void {
    this.userRepository.delete(id);
  }

  private async softDelete(id: string) {
    let newAccount = new AccountEntity();
    const account = await this.findOneById(id);
    newAccount = {
      ...newAccount,
      ...account,
      id: account.id,
    };
    newAccount.deletedAt = Date.now();
    this.update(account.id, newAccount);
  }

  /**
   * Encuentra todas las cuentas.
   *
   * @returns {Promise<AccountEntity[]>} Promesa que resuelve con un arreglo de todas las cuentas
   * @memberof AccountRepository
   */
  findAll(): Promise<AccountEntity[]> {
    const deletedAt = undefined;
    return this.userRepository.find({
      where: { deletedAt },
    });
  }

  /**
   * Encuentra cuentas por su estado.
   *
   * @param {boolean} state Estado de las cuentas a buscar
   * @returns {Promise<AccountEntity[]>} Promesa que resuelve con un arreglo de cuentas encontradas
   * @memberof AccountRepository
   */
  findByState(state: boolean): Promise<AccountEntity[]> {
    const deletedAt = undefined;
    return this.userRepository.find({ where: { state, deletedAt } });
  }

  /**
   * Encuentra cuentas por el ID de su cliente.
   *
   * @param {string} customerId ID del cliente asociado a las cuentas
   * @returns {Promise<AccountEntity[]>} Promesa que resuelve con un arreglo de cuentas encontradas
   * @memberof AccountRepository
   */
  findByCustomer(customerId: string): Promise<AccountEntity[]> {
    const deletedAt = undefined;
    return this.userRepository.find({
      where: { customer: { id: customerId }, deletedAt },
      relations: ['accountType'],
    });
  }

  /**
   * Encuentra cuentas por el ID de su tipo de cuenta.
   *
   * @param {string} accountTypeId ID del tipo de cuenta asociado a las cuentas
   * @returns {Promise<AccountEntity[]>} Promesa que resuelve con un arreglo de cuentas encontradas
   * @memberof AccountRepository
   */
  findByAccountType(accountTypeId: string): Promise<AccountEntity[]> {
    const deletedAt = undefined;
    return this.userRepository.find({
      where: { accountType: { id: accountTypeId }, deletedAt },
    });
  }
}
