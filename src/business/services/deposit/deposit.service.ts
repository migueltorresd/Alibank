import { Injectable } from '@nestjs/common';
import { DataRangeDTO, DepositDTO, PaginationDTO } from 'src/business/dtos';
import {
  AccountEntity,
  DepositEntity
} from '../../../data/persistence/entities';
import {
  AccountRepository,
  DepositRepository
} from '../../../data/persistence/repositories';

@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  /**
   * Crear un depósito
   *
   * @param {DepositDTO} deposit Datos del depósito
   * @return {*} {Promise<DepositEntity>} Entidad del depósito creado
   * @memberof DepositService
   */
  async createDeposit(deposit: DepositDTO): Promise<DepositEntity> {
    const depositEntity = new DepositEntity();
    depositEntity.account = await this.accountRepository.findOneById(
      deposit.accountId,
    );
    depositEntity.amount = Number(deposit.amount);
    depositEntity.dateTime = Date.now();
    let newAccount = new AccountEntity();
    newAccount = await this.accountRepository.findOneById(deposit.accountId);
    newAccount.balance = Number(newAccount.balance) + Number(deposit.amount);
    this.accountRepository.update(deposit.accountId, newAccount);
    return this.depositRepository.register(depositEntity);
  }

  /**
   * Borrar un depósito
   *
   * @param {string} depositId ID del depósito a borrar
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId);
  }

  /**
   * Obtener el historial de depósitos en una cuenta
   *
   * @param {string} accountId ID de la cuenta
   * @param {PaginationDTO} pagination Configuración de paginación
   * @param {DataRangeDTO} [dataRange] Rango de fechas y montos para filtrar
   * @return {*} {Promise<DepositEntity[]>} Lista de depósitos
   * @memberof DepositService
   */
  async getHistory(
    accountId: string,
    pagination: PaginationDTO,
    dataRange?: DataRangeDTO,
  ): Promise<DepositEntity[]> {
    if (dataRange) {
      const newArray = this.depositRepository.findByDataRange(
        dataRange.startDate ?? 0,
        dataRange.endDate ?? Date.now(),
      );
      const array = (await newArray).filter(
        (item) =>
          item.account.id === accountId &&
          (item.amount >= Number(dataRange.startAmount) ?? 0) &&
          (item.amount <= Number(dataRange.endAmount) ?? Number.MAX_VALUE),
      );
      return array.slice(
        pagination.length * pagination.page,
        pagination.length * pagination.page + pagination.length,
      );
    }
    const start = pagination.length * pagination.page;
    const end = start + Number(pagination.length);
    const array = (await this.depositRepository.findAll())
      .filter((item) => item.account.id === accountId)
      .slice(start, end);
    return array;
  }
}
