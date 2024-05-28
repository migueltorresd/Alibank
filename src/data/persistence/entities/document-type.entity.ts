import { Column, Entity } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { DocumentTypeModel } from '../../models';

/**
 * Entidad para el tipo de documento
 *
 * @export
 * @class DocumentTypeEntity
 * @implements {DocumentTypeModel}
 */
@Entity({
  name: 'document_type',
  schema: 'public',
})
export class DocumentTypeEntity implements DocumentTypeModel {
  /**
   * Identificador único del tipo de documento
   *
   * @type {string}
   * @memberof DocumentTypeEntity
   */
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id = uuid();

  /**
   * Nombre del tipo de documento
   *
   * @type {string}
   * @memberof DocumentTypeEntity
   */
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

  /**
   * Estado del tipo de documento
   *
   * @type {boolean}
   * @memberof DocumentTypeEntity
   */
  @Column({
    name: 'state',
    type: 'boolean',
  })
  state = true;
}
