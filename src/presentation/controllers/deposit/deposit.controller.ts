import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { DataRangeDTO, DepositDTO, PaginationDTO } from 'src/business/dtos';
import { DepositService } from '../../../business/services';
import { DepositEntity } from '../../../data/persistence/entities';

/**
 * Controlador para gestionar las operaciones relacionadas con los depósitos.
 */
@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  /**
   * Crea un nuevo depósito.
   * @param account Los datos del depósito a crear.
   * @returns Una promesa que resuelve con la entidad del depósito creado.
   */
  @Post()
  async createDeposit(@Body() account: DepositDTO): Promise<DepositEntity> {
    return await this.depositService.createDeposit(account);
  }

  /**
   * Obtiene el historial de depósitos.
   * @param body El cuerpo de la solicitud que contiene el ID de la cuenta, la paginación y opcionalmente el rango de fechas.
   * @returns Una promesa que resuelve con un array de entidades de depósito.
   */
  @Post('all')
  async GetAll(
    @Body()
    body: {
      accountId: string;
      pagination: PaginationDTO;
      dataRange?: DataRangeDTO;
    },
  ): Promise<DepositEntity[]> {
    return await this.depositService.getHistory(
      body.accountId,
      body.pagination,
      body.dataRange,
    );
  }

  /**
   * Elimina un depósito por su ID.
   * @param id El ID del depósito.
   */
  @Delete(':id')
  deleteDeposit(@Param('id') id: string): void {
    this.depositService.deleteDeposit(id);
  }
}
