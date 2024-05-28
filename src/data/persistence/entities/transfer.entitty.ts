import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TransferModel } from '../../models';
import { AccountEntity } from './';

/**
 * Entidad para la transferencia de fondos entre cuentas
 *
 * @export
 * @class TransferEntity
 * @implements {TransferModel}
 */
@Entity({
  name: 'transfer',
  schema: 'public',
})
export class TransferEntity implements TransferModel {
  /**
   * Identificador único de la transferencia
   *
   * @type {string}
   * @memberof TransferEntity
   */
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id = uuid();

  /**
   * Cuenta de donde sale el dinero
   *
   * @type {AccountEntity}
   * @memberof TransferEntity
   */
  @ManyToOne(() => AccountEntity)
  @JoinColumn()
  outCome: AccountEntity;

  /**
   * Cuenta a donde llega el dinero
   *
   * @type {AccountEntity}
   * @memberof TransferEntity
   */
  @ManyToOne(() => AccountEntity)
  @JoinColumn()
  inCome: AccountEntity;

  /**
   * Monto de la transferencia
   *
   * @type {number}
   * @memberof TransferEntity
   */
  @Column({
    name: 'amount',
    type: 'numeric',
  })
  amount = 0;

  /**
   * Motivo de la transferencia
   *
   * @type {string}
   * @memberof TransferEntity
   */
  @Column({
    name: 'reason',
    type: 'varchar',
    length: 100,
  })
  reason: string;

  /**
   * Fecha y hora de la transferencia
   *
   * @type {(number | Date)}
   * @memberof TransferEntity
   */
  @Column({
    name: 'date_time',
    type: 'numeric',
  })
  dateTime: number | Date;

  /**
   * Fecha de eliminación de la transferencia (si se elimina)
   *
   * @type {(number | Date)}
   * @memberof TransferEntity
   */
  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    select: false,
  })
  deletedAt?: number | Date;
}
