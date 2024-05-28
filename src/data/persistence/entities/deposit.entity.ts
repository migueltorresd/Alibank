import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { DepositModel } from '../../models';
import { AccountEntity } from './';

/**
 * Entidad para el depósito
 *
 * @export
 * @class DepositEntity
 * @implements {DepositModel}
 */
@Entity({
  name: 'deposit',
  schema: 'public',
})
export class DepositEntity implements DepositModel {
  /**
   * Identificador único del depósito
   *
   * @type {string}
   * @memberof DepositEntity
   */
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id = uuid();

  /**
   * Monto del depósito
   *
   * @type {number}
   * @memberof DepositEntity
   */
  @Column({
    name: 'amount',
    type: 'numeric',
  })
  amount = 0;

  /**
   * Cuenta asociada al depósito
   *
   * @type {AccountEntity}
   * @memberof DepositEntity
   */
  @ManyToOne(() => AccountEntity)
  @JoinColumn()
  account: AccountEntity;

  /**
   * Fecha y hora del depósito
   *
   * @type {(number | Date)}
   * @memberof DepositEntity
   */
  @Column({
    name: 'date_time',
    type: 'numeric',
  })
  dateTime: number | Date;

  /**
   * Fecha y hora en la que se eliminó el depósito (opcional)
   *
   * @type {(number | Date)}
   * @memberof DepositEntity
   */
  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    select: false,
  })
  deletedAt?: number | Date;
}
