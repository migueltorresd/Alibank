import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDTO } from 'src/business/dtos';
import { CustomerUpdateDTO } from 'src/business/dtos/update-customer.dto';
import {
  AccountEntity,
  CustomerEntity,
  DocumentTypeEntity,
} from '../../../data/persistence/entities';
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
} from '../../../data/persistence/repositories';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
  ) {}

  /**
   * Obtener información de un cliente por su ID
   *
   * @param {string} customerId ID del cliente
   * @return {*} {Promise<CustomerEntity>} Entidad del cliente encontrado
   * @memberof CustomerService
   */
  async getCustomerInfo(customerId: string): Promise<CustomerEntity> {
    const newCustomer = await this.customerRepository.findOneById(customerId);
    return newCustomer;
  }

  /**
   * Obtener información de un cliente por su correo electrónico
   *
   * @param {string} email Correo electrónico del cliente
   * @return {*} {Promise<CustomerEntity>} Entidad del cliente encontrado
   * @memberof CustomerService
   */
  async getCustomerInfoByEmail(email: string): Promise<CustomerEntity> {
    const newCustomer = await this.customerRepository.findOneByEmail(email);
    return newCustomer;
  }

  /**
   * Obtener todos los clientes activos
   *
   * @return {*} {Promise<CustomerEntity[]>} Lista de clientes activos
   * @memberof CustomerService
   */
  async findAll(): Promise<CustomerEntity[]> {
    return (await this.customerRepository.findAll()).filter(
      (item) => (item.deletedAt ?? true) === true,
    );
  }

  /**
   * Obtener todos los clientes eliminados
   *
   * @return {*} {Promise<CustomerEntity[]>} Lista de clientes eliminados
   * @memberof CustomerService
   */
  findAllDeleted(): Promise<CustomerEntity[]> {
    return this.customerRepository.findAllDeleted();
  }

  /**
   * Transformar datos del cliente a entidad del cliente
   *
   * @param {CustomerDTO} customer Datos del cliente
   * @return {*} {CustomerEntity} Entidad del cliente creada
   * @memberof CustomerService
   */
  transform(customer: CustomerDTO): CustomerEntity {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentTypeId;
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;
    return newCustomer;
  }

  /**
   * Registrar un nuevo cliente en el sistema
   *
   * @param {CustomerDTO} customer Datos del nuevo cliente
   * @return {*} {Promise<{ customer: CustomerEntity; account: AccountEntity }>} Cliente y cuenta creados
   * @memberof CustomerService
   */
  async newCustomer(customer: CustomerDTO): Promise<{ customer: CustomerEntity; account: AccountEntity }> {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentTypeId;

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    if (await this.customerRepository.existEmail(customer.email)) {
      throw new NotFoundException(
        `El email ${customer.email} ya existe en la base de datos`,
      );
    }
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;
    const typeId = 'ab27c9ac-a01c-4c22-a6d6-ce5ab3b79185';
    const account = new AccountEntity();
    account.accountType = await this.accountTypeRepository.findOneById(typeId);
    account.customer = newCustomer;
    return {
      customer: await this.customerRepository.register(newCustomer),
      account: await this.accountRepository.register(account),
    };
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id ID del cliente a actualizar
   * @param {CustomerUpdateDTO} customer Nuevos datos del cliente
   * @return {*} {Promise<CustomerEntity>} Entidad del cliente actualizado
   * @memberof CustomerService
   */
  async updatedCustomer(
    id: string,
    customer: CustomerUpdateDTO,
  ): Promise<CustomerEntity> {
    if (await this.customerRepository.findOneById(id)) {
      const newCustomer = new CustomerEntity();
      newCustomer.document = customer.document;
      newCustomer.fullName = customer.fullName;
      newCustomer.phone = customer.phone;
      newCustomer.password = customer.password;
      return this.customerRepository.update(id, newCustomer);
    }
    return new CustomerEntity();
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id ID del cliente a dar de baja
   * @return {*} {Promise<boolean>} true si el cliente se dio de baja con éxito, false de lo contrario
   * @memberof CustomerService
   */
  async unsuscribe(id: string): Promise<boolean> {
    if (
      (await this.customerRepository.findOneById(id)).deletedAt === undefined
    ) {
      const customer = await this.customerRepository.findOneById(id);
      customer.state = false;
      this.customerRepository.update(id, customer);
      return true;
    }
    return false;
  }

  /**
   * Eliminar un cliente del sistema
   *
   * @param {string} id ID del cliente a eliminar
   * @return {*} {Promise<boolean>} true si el cliente se eliminó con éxito, false de lo contrario
   * @memberof CustomerService
   */
  async deleteCustomer(id: string): Promise<boolean> {
    if (
      (await this.customerRepository.findOneById(id)).deletedAt === undefined
    ) {
      (await this.accountRepository.findAll()).map(
        (mapa) => (mapa.deletedAt = Date.now()),
      );
      this.customerRepository.delete(id);
      return true;
    }
    return false;
  }
}
