import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CustomerModel } from '../../models';
import { DocumentTypeEntity } from './';

/**
 * Entidad para el cliente
 *
 * @export
 * @class CustomerEntity
 * @implements {CustomerModel}
 */
@Entity({
  name: 'customer',
  schema: 'public',
})
export class CustomerEntity implements CustomerModel {
  /**
   * Identificador único del cliente
   *
   * @type {string}
   * @memberof CustomerEntity
   */
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id = uuid();

  /**
   * Tipo de documento del cliente
   *
   * @type {DocumentTypeEntity}
   * @memberof CustomerEntity
   */
  @ManyToOne(() => DocumentTypeEntity, {
    cascade: false,
  })
  @JoinColumn()
  documentType: DocumentTypeEntity;

  /**
   * Número de documento del cliente
   *
   * @type {string}
   * @memberof CustomerEntity
   */
  @Column({
    name: 'document',
    type: 'varchar',
    length: 20,
  })
  document: string;

  /**
   * Nombre completo del cliente
   *
   * @type {string}
   * @memberof CustomerEntity
   */
  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 100,
  })
  fullName: string;

  /**
   * Correo electrónico del cliente
   *
   * @type {string}
   * @memberof CustomerEntity
   */
  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
  })
  email: string;

  /**
   * Número de teléfono del cliente
   *
   * @type {string}
   * @memberof CustomerEntity
   */
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 20,
  })
  phone: string;

  /**
   * Contraseña del cliente
   *
   * @type {string}
   * @memberof CustomerEntity
   */
  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
  })
  password: string;

  /**
   * URL del avatar del cliente (opcional)
   *
   * @type {string}
   * @memberof CustomerEntity
   */
  @Column({
    name: 'avatar_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  avatarUrl?: string;

  /**
   * Estado del cliente (activo/inactivo)
   *
   * @type {boolean}
   * @memberof CustomerEntity
   */
  @Column({
    name: 'state',
    type: 'boolean',
  })
  state = true;

  /**
   * Fecha y hora en la que se eliminó el cliente (opcional)
   *
   * @type {(Date | number)}
   * @memberof CustomerEntity
   */
  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    select: false,
  })
  deletedAt?: Date | number;
}
