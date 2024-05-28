import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DataRangeDTO, PaginationDTO, TransferDTO } from 'src/business/dtos';
import { GuardsGuard } from 'src/presentation/guards/guards.guard';
import { TransferService } from '../../../business/services';
import { TransferEntity } from '../../../data/persistence/entities';

/**
 * Controlador para gestionar las transferencias.
 */
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  /**
   * Crea una nueva transferencia.
   * @param transfer Los datos de la transferencia.
   * @returns Una promesa que resuelve con la entidad de la transferencia creada.
   */
  @Post()
  @UseGuards(GuardsGuard)
  async createTransfer(@Body() transfer: TransferDTO): Promise<TransferEntity> {
    return this.transferService.createTransfer(transfer);
  }

  /**
   * Selecciona una transferencia por su ID.
   * @param id El ID de la transferencia.
   * @returns Una promesa que resuelve con la entidad de la transferencia seleccionada.
   */
  @Get('/select/:id')
  @UseGuards(GuardsGuard)
  async selectTransfer(@Param('id') id: string): Promise<TransferEntity> {
    return this.transferService.selectTransfer(id);
  }

  /**
   * Elimina una transferencia por su ID.
   * @param id El ID de la transferencia.
   * @returns Una promesa que resuelve con la entidad de la transferencia eliminada.
   */
  @Delete(':id')
  async deleteTransfer(@Param('id') id: string): Promise<TransferEntity> {
    const transfer = await this.transferService.selectTransfer(id);
    this.transferService.deleteTransfer(id);
    return transfer;
  }

  /**
   * Obtiene el historial de ingresos de una cuenta.
   * @param body El cuerpo de la solicitud que contiene el ID de la cuenta, la paginación y el rango de datos.
   * @returns Una promesa que resuelve con una lista de entidades de transferencias de ingreso.
   */
  @Post('income')
  @UseGuards(GuardsGuard)
  async getHistoryIn(
    @Body()
    body: {
      accountId: string;
      pagination: PaginationDTO;
      dataRange?: DataRangeDTO;
    },
  ): Promise<TransferEntity[]> {
    return this.transferService.getHistoryIn(
      body.accountId,
      body.pagination,
      body.dataRange,
    );
  }

  /**
   * Obtiene el historial de egresos de una cuenta.
   * @param body El cuerpo de la solicitud que contiene el ID de la cuenta, la paginación y el rango de datos.
   * @returns Una promesa que resuelve con una lista de entidades de transferencias de egreso.
   */
  @Post('outcome')
  @UseGuards(GuardsGuard)
  async getHistoryOut(
    @Body()
    body: {
      accountId: string;
      pagination: PaginationDTO;
      dataRange?: DataRangeDTO;
    },
  ): Promise<TransferEntity[]> {
    return this.transferService.getHistoryOut(
      body.accountId,
      body.pagination,
      body.dataRange,
    );
  }

  /**
   * Obtiene el historial completo de una cuenta.
   * @param body El cuerpo de la solicitud que contiene el ID de la cuenta, la paginación y el rango de datos.
   * @returns Una promesa que resuelve con una lista de entidades de transferencias.
   */
  @Post('history')
  @UseGuards(GuardsGuard)
  getHistory(
    @Body()
    body: {
      accountId: string;
      pagination: PaginationDTO;
      dataRange?: DataRangeDTO;
    },
  ): Promise<TransferEntity[]> {
    return this.transferService.getHistory(
      body.accountId,
      body.pagination,
      body.dataRange,
    );
  }
}
