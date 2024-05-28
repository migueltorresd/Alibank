import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AccountTypeEntity, CustomerEntity } from '.';
import { AccountModel } from '../../models';

/**
 * Entidad para la cuenta del cliente
 *
 * @export
 * @class AccountEntity
 * @implements {AccountModel}
 */
@Entity({
  name: 'account',
  schema: 'public',
})
export class AccountEntity implements AccountModel {
  /**
   * Identificador único de la cuenta
   *
   * @type {string}
   * @memberof AccountEntity
   */
  @Column({
    name: 'id',
    type: 'varchar',
    primary: true,
  })
  id = generateID();

  /**
   * Cliente asociado a la cuenta
   *
   * @type {CustomerEntity}
   * @memberof AccountEntity
   */
  @ManyToOne(() => CustomerEntity)
  @JoinColumn()
  customer: CustomerEntity;

  /**
   * Tipo de cuenta
   *
   * @type {AccountTypeEntity}
   * @memberof AccountEntity
   */
  @ManyToOne(() => AccountTypeEntity)
  @JoinColumn()
  accountType: AccountTypeEntity;

  /**
   * Saldo de la cuenta
   *
   * @type {number}
   * @memberof AccountEntity
   */
  @Column({
    name: 'balance',
    type: 'numeric',
  })
  balance = 0;

  /**
   * Estado de la cuenta (activo/inactivo)
   *
   * @type {boolean}
   * @memberof AccountEntity
   */
  @Column({
    name: 'state',
    type: 'boolean',
  })
  state = true;

  /**
   * Fecha y hora en la que se eliminó la cuenta (opcional)
   *
   * @type {(Date | number)}
   * @memberof AccountEntity
   */
  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    select: false,
  })
  deletedAt?: Date | number;
}

/**
 * Genera un identificador único para la cuenta
 *
 * @returns {string} ID generado
 */
function generateID(): string {
  const bank = process.env.BANK_ID ?? '';
  return '20000' + bank + Math.floor(Math.random() * 10000);
}
