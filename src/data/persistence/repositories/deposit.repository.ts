import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { DepositEntity } from '../entities';
import { DepositRepositoryInterface } from './interfaces/';

@Injectable()
export class DepositRepository implements DepositRepositoryInterface {
  constructor(
    @InjectRepository(DepositEntity)
    private readonly depositRepository: Repository<DepositEntity>,
  ) {}
  /**
   * Registra un nuevo depósito en la base de datos.
   * @param entity Los datos del depósito a registrar.
   * @returns Una promesa que resuelve en el depósito registrado.
   */
  register(entity: DepositEntity): Promise<DepositEntity> {
    return this.depositRepository.save(entity);
  }
  /**
   * Actualiza un depósito existente en la base de datos.
   * @param id El ID del depósito a actualizar.
   * @param entity Los nuevos datos del depósito.
   * @returns Una promesa que resuelve en el depósito actualizado.
   * @throws `NotFoundException` si el depósito no existe.
   */
  update(id: string, entity: DepositEntity): Promise<DepositEntity> {
    return this.depositRepository.update(id, entity).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`El Id: ${id} no existe en base de datos`);
      }
      return entity;
    });
  }
  /**
   * Elimina un depósito de la base de datos.
   * @param id El ID del depósito a eliminar.
   * @param soft Indica si se debe realizar un borrado suave (soft delete).
   */
  delete(id: string, soft?: boolean): void {
    this.findOneById(id);
    if (soft || soft === undefined) {
      this.softDelete(id);
    } else {
      this.hardDelete(id);
    }
  }

  private hardDelete(id: string) {
    this.depositRepository.delete({
      id,
    });
  }

  private softDelete(id: string) {
    let newDeposit = new DepositEntity();
    this.depositRepository
      .findOne({
        where: { id },
      })
      .then((result) => {
        if (result) {
          newDeposit = {
            ...newDeposit,
            ...result,
            id: result.id,
          };
          newDeposit.deletedAt = Date.now();
          this.update(result.id, newDeposit);
        } else {
          throw new NotFoundException(
            `El Id: ${id} no existe en base de datos`,
          );
        }
      });
  }
  // Métodos privados para realizar borrado suave (soft delete) o borrado duro (hard delete)...

  /**
   * Encuentra todos los depósitos en la base de datos.
   * @returns Una promesa que resuelve en un arreglo de todos los depósitos.
   */
  findAll(): Promise<DepositEntity[]> {
    return this.depositRepository.find({
      where: { deletedAt: undefined },
      relations: ['account'],
    });
  }

  /**
   * Encuentra un depósito por su ID en la base de datos.
   * @param id El ID del depósito a encontrar.
   * @returns Una promesa que resuelve en el depósito encontrado.
   * @throws `NotFoundException` si el depósito no existe.
   */
  async findOneById(id: string): Promise<DepositEntity> {
    return this.depositRepository
      .findOne({
        where: { id, deletedAt: undefined },
        relations: ['account'],
      })
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new NotFoundException(
            `El ID ${id} no existe en la base de datos`,
          );
        }
      });
  }

  /**
   * Encuentra todos los depósitos asociados a una cuenta en la base de datos.
   * @param accountId El ID de la cuenta asociada a los depósitos.
   * @returns Una promesa que resuelve en un arreglo de todos los depósitos asociados a la cuenta.
   */
  findByAccountId(accountId: string): Promise<DepositEntity[]> {
    return this.depositRepository.find({
      where: { account: { id: accountId }, deletedAt: undefined },
      relations: ['account'],
    });
  }

  /**
   * Encuentra todos los depósitos dentro de un rango de fechas en la base de datos.
   * @param dateInit La fecha de inicio del rango.
   * @param dateEnd La fecha de fin del rango.
   * @returns Una promesa que resuelve en un arreglo de todos los depósitos dentro del rango de fechas.
   */
  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Promise<DepositEntity[]> {
    return this.depositRepository.find({
      where: {
        dateTime: Between(dateInit, dateEnd),
      },
      relations: ['account'],
    });
  }
}
