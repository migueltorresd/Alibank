import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities';
import { CustomerRepositoryInterface } from './interfaces/';

@Injectable()
export class CustomerRepository implements CustomerRepositoryInterface {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}
  /**
   * Registra un nuevo cliente en la base de datos.
   * @param entity Los datos del cliente a registrar.
   * @returns Una promesa que resuelve en el cliente registrado.
   */
  register(entity: CustomerEntity): Promise<CustomerEntity> {
    console.log(entity);
    return this.customerRepository.save(entity);
  }
  /**
   * Actualiza un cliente existente en la base de datos.
   * @param id El ID del cliente a actualizar.
   * @param entity Los nuevos datos del cliente.
   * @returns Una promesa que resuelve en el cliente actualizado.
   * @throws `NotFoundException` si el cliente no existe.
   */
  async update(id: string, entity: CustomerEntity): Promise<CustomerEntity> {
    return this.customerRepository.update(id, entity).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`El Id: ${id} no existe en base de datos`);
      }
      return entity;
    });
  }

  /**
   * Elimina un cliente de la base de datos.
   * @param id El ID del cliente a eliminar.
   * @param soft Indica si se debe realizar un borrado suave (soft delete).
   */
  delete(id: string, soft?: boolean) {
    this.findOneById(id);
    if (soft || soft === undefined) {
      this.softDelete(id);
    } else {
      this.hardDelete(id);
    }
  }

  /**
   * Realiza un borrado duro (hard delete) de un cliente de la base de datos.
   *
   * @param id El ID del cliente a eliminar.
   */
  private hardDelete(id: string): void {
    this.customerRepository.delete(id);
  }
  /**
   * Realiza un borrado suave (soft delete) de un cliente de la base de datos.
   *
   * @param id El ID del cliente a eliminar.
   */
  private async softDelete(id: string) {
    let newCustomer = new CustomerEntity();
    const customer = await this.customerRepository
      .findOne({
        where: { id },
      })
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new NotFoundException(
            `El Id: ${id} no existe en base de datos`,
          );
        }
      });
    newCustomer = {
      ...newCustomer,
      ...customer,
      id: customer.id,
    };
    newCustomer.deletedAt = Date.now();
    this.update(customer.id, newCustomer);
  }
  /**
   * Obtiene todos los clientes de la base de datos que no han sido eliminados.
   *
   * @returns Una promesa que resuelve en una lista de clientes.
   */
  findAll(): Promise<CustomerEntity[]> {
    const deletedAt = undefined;
    return this.customerRepository.find({ where: { deletedAt } });
  }
  /**
   * Obtiene todos los clientes eliminados de la base de datos.
   *
   * @returns Una promesa que resuelve en una lista de clientes eliminados.
   */
  findAllDeleted(): Promise<CustomerEntity[]> {
    return this.customerRepository.find({
      where: { deletedAt: undefined },
    });
  }
  /**
   * Busca un cliente por su ID en la base de datos.
   *
   * @param id El ID del cliente a buscar.
   * @returns Una promesa que resuelve en un cliente si se encuentra, de lo contrario lanza una NotFoundException.
   */
  async findOneById(id: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: { id, deletedAt: undefined },
    });
    if (customer) return customer;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }
  /**
   * Busca un cliente por su email y contraseña en la base de datos.
   *
   * @param email El email del cliente.
   * @param password La contraseña del cliente.
   * @returns Una promesa que resuelve en un booleano indicando si se encontró un cliente con las credenciales proporcionadas.
   */
  async findOneByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    return this.customerRepository
      .find({
        where: { email, password, deletedAt: undefined },
      })
      .then((result) => {
        if (result.length > 0) {
          return true;
        } else {
          return false;
        }
      });
  }

  /**
   * Busca un cliente por tipo de documento y número de documento en la base de datos.
   *
   * @param documentTypeId El ID del tipo de documento del cliente.
   * @param document El número de documento del cliente.
   * @returns Una promesa que resuelve en un cliente si se encuentra, de lo contrario lanza una NotFoundException.
   */
  async findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): Promise<CustomerEntity> {
    const result = await this.customerRepository.findOne({
      where: {
        documentType: { id: documentTypeId },
        document,
        deletedAt: undefined,
      },
    });
    if (result) {
      return result;
    } else {
      throw new NotFoundException(`no existe en base de datos`);
    }
  }

  /**
   * Busca un cliente por su dirección de correo electrónico en la base de datos.
   *
   * @param email La dirección de correo electrónico del cliente.
   * @returns Una promesa que resuelve en un cliente si se encuentra, de lo contrario lanza una NotFoundException.
   */
  async findOneByEmail(email: string): Promise<CustomerEntity> {
    return this.customerRepository
      .findOne({
        where: { email, deletedAt: undefined },
      })
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new NotFoundException(`no existe en base de datos`);
        }
      });
  }

  /**
   * Verifica si existe un cliente con la dirección de correo electrónico especificada en la base de datos.
   *
   * @param email La dirección de correo electrónico del cliente.
   * @returns Una promesa que resuelve en un booleano indicando si existe un cliente con la dirección de correo electrónico especificada.
   */
  async existEmail(email: string): Promise<boolean> {
    return this.customerRepository
      .find({
        where: { email, deletedAt: undefined },
      })
      .then((result) => {
        if (result.length > 0) {
          return true;
        } else {
          return false;
        }
      });
  }

  /**
   * Busca un cliente por su número de teléfono en la base de datos.
   *
   * @param phone El número de teléfono del cliente.
   * @returns Una promesa que resuelve en un cliente si se encuentra, de lo contrario lanza una NotFoundException.
   */
  async findOneByPhone(phone: string): Promise<CustomerEntity> {
    return this.customerRepository
      .findOne({
        where: { phone, deletedAt: undefined },
      })
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new NotFoundException(`no existe en base de datos`);
        }
      });
  }

  /**
   * Busca clientes por estado en la base de datos.
   *
   * @param state El estado de los clientes a buscar.
   * @returns Una promesa que resuelve en una lista de clientes con el estado especificado.
   */
  findByState(state: boolean): Promise<CustomerEntity[]> {
    return this.customerRepository.find({
      where: { state, deletedAt: undefined },
    });
  }

  /**
   * Busca clientes por nombre completo en la base de datos.
   *
   * @param fullName El nombre completo de los clientes a buscar.
   * @returns Una promesa que resuelve en una lista de clientes con el nombre completo especificado.
   */
  findByFullName(fullName: string): Promise<CustomerEntity[]> {
    return this.customerRepository.find({
      where: { fullName, deletedAt: undefined },
    });
  }
}
