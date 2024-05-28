import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TransferEntity } from '../entities';
import { TransferRepositoryInterface } from './interfaces';

@Injectable()
export class TransferRepository implements TransferRepositoryInterface {
  constructor(
    @InjectRepository(TransferEntity)
    private readonly transferRepository: Repository<TransferEntity>,
  ) {}

  /**
   * Registra una nueva transferencia en la base de datos.
   * @param entity Los datos de la transferencia a registrar.
   * @returns Una promesa que resuelve en la transferencia registrada.
   */
  register(entity: TransferEntity): Promise<TransferEntity> {
    return this.transferRepository.save(entity);
  }

  /**
   * Actualiza una transferencia existente en la base de datos.
   * @param id El ID de la transferencia a actualizar.
   * @param entity Los nuevos datos de la transferencia.
   * @returns Una promesa que resuelve en la transferencia actualizada.
   * @throws `NotFoundException` si la transferencia no existe.
   */
  update(id: string, entity: TransferEntity): Promise<TransferEntity> {
    return this.transferRepository.update(id, entity).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(
          `El ID ${id} no existe en la base de datos`,
        );
      }
      return entity;
    });
  }

  /**
   * Elimina una transferencia de la base de datos.
   * @param id El ID de la transferencia a eliminar.
   * @param soft Opcional. Indica si se debe realizar un borrado suave o no. Por defecto es `true`.
   */
  delete(id: string, soft?: boolean) {
    this.findOneById(id);
    if (soft || soft === undefined) {
      this.softDelete(id);
    } else {
      this.hardDelete(id);
    }
  }

  private hardDelete(id: string) {
    this.transferRepository.delete({
      id,
    });
  }

  private async softDelete(id: string) {
    let newTransfer = new TransferEntity();
    const transfer = await this.transferRepository
      .findOne({
        where: { id },
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
    newTransfer = {
      ...newTransfer,
      ...transfer,
      id: transfer.id,
    };
    newTransfer.deletedAt = Date.now();
    this.update(transfer.id, newTransfer);
  }

  /**
   * Encuentra todas las transferencias en la base de datos.
   * @returns Una promesa que resuelve en un arreglo de todas las transferencias.
   */
  findAll(): Promise<TransferEntity[]> {
    return this.transferRepository.find({
      where: { deletedAt: undefined },
      relations: ['inCome', 'outCome'],
    });
  }

  /**
   * Encuentra una transferencia por su ID en la base de datos.
   * @param id El ID de la transferencia a encontrar.
   * @returns Una promesa que resuelve en la transferencia encontrada.
   * @throws `NotFoundException` si la transferencia no existe.
   */
  async findOneById(id: string): Promise<TransferEntity> {
    return this.transferRepository
      .findOne({
        where: { id, deletedAt: undefined },
        relations: ['inCome', 'outCome'],
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
   * Encuentra las transferencias de salida por rango de fechas y cuenta en la base de datos.
   * @param accountId El ID de la cuenta de salida.
   * @param dateInit La fecha de inicio del rango.
   * @param dateEnd La fecha de fin del rango.
   * @returns Una promesa que resuelve en un arreglo de transferencias de salida.
   */
  findOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Promise<TransferEntity[]> {
    return this.transferRepository.find({
      where: {
        dateTime: Between(dateInit, dateEnd),
        outCome: { id: accountId },
      },
      relations: ['inCome', 'outCome'],
    });
  }

  /**
   * Encuentra las transferencias de entrada por rango de fechas y cuenta en la base de datos.
   * @param accountId El ID de la cuenta de entrada.
   * @param dateInit La fecha de inicio del rango.
   * @param dateEnd La fecha de fin del rango.
   * @returns Una promesa que resuelve en un arreglo de transferencias de entrada.
   */
  findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Promise<TransferEntity[]> {
    return this.transferRepository.find({
      where: {
        dateTime: Between(dateInit, dateEnd),
        inCome: { id: accountId },
      },
      relations: ['inCome', 'outCome'],
    });
  }

  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Promise<TransferEntity[]> {
    return this.transferRepository.find({
      where: {
        dateTime: Between(dateInit, dateEnd),
      },
      relations: ['inCome', 'outCome'],
    });
  }
}
