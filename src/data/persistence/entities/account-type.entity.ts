import { Column, Entity } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AccountTypeModel } from '../../models';

/**
 * Entidad para el tipo de cuenta
 *
 * @export
 * @class AccountTypeEntity
 * @implements {AccountTypeModel}
 */
@Entity({
  name: 'account_type',
  schema: 'public',
})
export class AccountTypeEntity implements AccountTypeModel {
  /**
   * Identificador único del tipo de cuenta
   *
   * @type {string}
   * @memberof AccountTypeEntity
   */
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id = uuid();

  /**
   * Nombre del tipo de cuenta
   *
   * @type {string}
   * @memberof AccountTypeEntity
   */
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

  /**
   * Estado del tipo de cuenta (activo/inactivo)
   *
   * @type {boolean}
   * @memberof AccountTypeEntity
   */
  @Column({
    name: 'state',
    type: 'boolean',
  })
  state = true;
}
