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
import { CustomerUpdateDTO } from 'src/business/dtos/update-customer.dto';
import { GuardsGuard } from 'src/presentation/guards/guards.guard';
import { CustomerDTO } from '../../../business/dtos';
import { CustomerService } from '../../../business/services/customer/customer.service';
import { AccountEntity } from '../../../data/persistence/entities/account.entity';
import { CustomerEntity } from '../../../data/persistence/entities/customer.entity';

/**
 * Controlador para gestionar usuarios.
 */
@Controller('user')
export class UserController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Obtiene todos los usuarios.
   * @returns Una promesa que resuelve con una lista de entidades de clientes.
   */
  @Get()
  async findAllUsers(): Promise<CustomerEntity[]> {
    return this.customerService.findAll();
  }

  /**
   * Obtiene todos los usuarios eliminados.
   * @returns Una promesa que resuelve con una lista de entidades de clientes eliminados.
   */
  @Get('deleted')
  async findAllUsersDeleted(): Promise<CustomerEntity[]> {
    return this.customerService.findAllDeleted();
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id El ID del usuario.
   * @returns Una promesa que resuelve con la entidad del cliente.
   */
  @Get(':id')
  async findUser(@Param('id') id: string): Promise<CustomerEntity> {
    return this.customerService.getCustomerInfo(id);
  }

  /**
   * Obtiene un usuario por su correo electrónico.
   * @param email El correo electrónico del usuario.
   * @returns Una promesa que resuelve con la entidad del cliente.
   */
  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string): Promise<CustomerEntity> {
    return this.customerService.getCustomerInfoByEmail(email);
  }

  /**
   * Registra un nuevo usuario.
   * @param customer Los datos del cliente.
   * @returns Una promesa que resuelve con las entidades del cliente y de la cuenta.
   */
  @Post()
  async registerUser(@Body() customer: CustomerDTO): Promise<{ customer: CustomerEntity; account: AccountEntity }> {
    return this.customerService.newCustomer(customer);
  }

  /**
   * Actualiza un usuario existente.
   * @param id El ID del usuario.
   * @param customer Los datos actualizados del cliente.
   * @returns Una promesa que resuelve con la entidad actualizada del cliente.
   */
  @Put(':id')
  // @UseGuards(GuardsGuard)
  async updateUser(@Param('id') id: string, @Body() customer: CustomerUpdateDTO): Promise<CustomerEntity> {
    return this.customerService.updatedCustomer(id, customer);
  }

  /**
   * Elimina un usuario.
   * @param id El ID del usuario.
   * @returns Una promesa que resuelve con un booleano indicando si la operación fue exitosa.
   */
  @Delete(':id')
  // @UseGuards(GuardsGuard)
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.customerService.deleteCustomer(id);
  }

  /**
   * Desuscribe a un usuario.
   * @param id El ID del usuario.
   * @returns Una promesa que resuelve con un booleano indicando si la operación fue exitosa.
   */
  @Put('unsuscribe/:id')
  async unsuscribeUser(@Param('id') id: string): Promise<boolean> {
    return this.customerService.unsuscribe(id);
  }
}
