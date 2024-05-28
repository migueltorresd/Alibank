import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountDTO } from 'src/business/dtos';
import { GuardsGuard } from 'src/presentation/guards/guards.guard';
import { AccountService } from '../../../business/services';
import { CustomerService } from '../../../business/services/customer/customer.service';
import { AccountEntity } from '../../../data/persistence/entities';

/**
 * Controlador para gestionar las operaciones relacionadas con las cuentas.
 */
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  /**
   * Obtiene el saldo de una cuenta por su ID.
   * @param id El ID de la cuenta.
   * @returns Una promesa que resuelve con el saldo de la cuenta.
   */
  @Get('balance/:id')
  async getBalance(@Param('id') id: string): Promise<number> {
    return await this.accountService.getBalance(id);
  }

  /**
   * Verifica el saldo total de un cliente.
   * @param id El ID del cliente.
   * @returns Una promesa que resuelve con un booleano indicando si el cliente tiene saldo.
   */
  @Get('amount/:id')
  @UseGuards(GuardsGuard)
  async getBalanceAll(@Param('id') id: string): Promise<boolean> {
    return await this.accountService.CustomerBalance(id);
  }

  /**
   * Obtiene todas las cuentas.
   * @returns Una promesa que resuelve con un array de entidades de cuenta.
   */
  @Get()
  @UseGuards(GuardsGuard)
  async getAll(): Promise<AccountEntity[]> {
    return await this.accountService.findAll();
  }

  /**
   * Crea una nueva cuenta.
   * @param account Los datos de la cuenta a crear.
   * @returns Una promesa que resuelve con la entidad de cuenta creada.
   */
  @Post()
  @UseGuards(GuardsGuard)
  async createAccount(@Body() account: AccountDTO): Promise<AccountEntity> {
    return await this.accountService.createAccount(account);
  }

  /**
   * Añade saldo a una cuenta.
   * @param id El ID de la cuenta.
   * @param body El cuerpo de la solicitud que contiene el monto a añadir.
   * @returns Una promesa que resuelve con el nuevo saldo de la cuenta.
   */
  @Post(':id')
  @UseGuards(GuardsGuard)
  async addBalance(
    @Param('id') id: string,
    @Body() body: { amount: number },
  ): Promise<string> {
    if (body.amount < 0) return 'debe ser un numero positivo';
    this.accountService.addBalance(id, body.amount);
    return '' + this.accountService.getBalance(id);
  }

  /**
   * Elimina saldo de una cuenta.
   * @param id El ID de la cuenta.
   * @param body El cuerpo de la solicitud que contiene el monto a eliminar.
   * @returns Un booleano indicando si la operación fue exitosa.
   */
  @Put('removebalance/:id')
  @UseGuards(GuardsGuard)
  removeBalance(
    @Param('id') id: string,
    @Body() body: { amount: number },
  ): boolean {
    if (
      body.amount < 0 ||
      !this.accountService.verifyAmountIntoBalance(id, body.amount)
    )
      return false;
    this.accountService.removeBalance(id, body.amount);
    this.accountService.getBalance(id);
    return true;
  }

  /**
   * Obtiene las cuentas de un cliente por su ID.
   * @param id El ID del cliente.
   * @returns Una promesa que resuelve con un array de entidades de cuenta.
   */
  @Get('/customer/:id')
  async getAccountByCustomerId(
    @Param('id') id: string,
  ): Promise<AccountEntity[]> {
    return await this.accountService.getAccountByCustomerId(id);
  }

  /**
   * Verifica si una cuenta tiene suficiente saldo.
   * @param id El ID de la cuenta.
   * @param body El cuerpo de la solicitud que contiene el monto a verificar.
   * @returns Una promesa que resuelve con un booleano indicando si la cuenta tiene suficiente saldo.
   */
  @Get('/account/:id')
  async amountBalance(
    @Param('id') id: string,
    @Body() body: { amount: number },
  ): Promise<boolean> {
    return await this.accountService.verifyAmountIntoBalance(id, body.amount);
  }

  /**
   * Cambia el estado de una cuenta.
   * @param id El ID de la cuenta.
   * @param body El cuerpo de la solicitud que contiene el nuevo estado.
   * @returns Un string indicando que el estado ha sido cambiado.
   */
  @Put(':id')
  changeState(
    @Param('id') id: string,
    @Body() body: { state: boolean },
  ): string {
    this.accountService.changeState(id, body.state);
    return 'estado cambiado';
  }

  /**
   * Obtiene el estado de una cuenta por su ID.
   * @param id El ID de la cuenta.
   * @returns Una promesa que resuelve con el estado de la cuenta.
   */
  @Get('state/:id')
  async getState(@Param('id') id: string): Promise<boolean> {
    return await this.accountService.getState(id);
  }

  /**
   * Cambia el tipo de cuenta.
   * @param id El ID de la cuenta.
   * @param body El cuerpo de la solicitud que contiene el ID del nuevo tipo de cuenta.
   * @returns Un string indicando que el tipo de cuenta ha sido cambiado.
   */
  @Put('accountype/:id')
  changeAccountType(
    @Param('id') id: string,
    @Body() body: { accountTypeId: string },
  ): string {
    this.accountService.changeAccountType(id, body.accountTypeId);
    return 'cuenta cambiada';
  }

  /**
   * Elimina una cuenta por su ID.
   * @param id El ID de la cuenta.
   * @returns Un string indicando que la cuenta ha sido eliminada.
   */
  @Delete(':id')
  deleteAccount(@Param('id') id: string): string {
    this.accountService.deleteAccount(id);
    return 'cuenta eliminada';
  }
}
