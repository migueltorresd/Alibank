/**
 * Interfaz para el modelo de rango de datos
 *
 * @export
 * @interface DataRangeModel
 */
export interface DataRangeModel {
  startDate?: number | Date;
  endDate?: number | Date;
  startAmount?: number;
  endAmount?: number;
}
