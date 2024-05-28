/**
 * Interfaz que define la estructura de datos para el modelo de rango de datos.
 * 
 * @remarks
 * Esta interfaz define un rango de datos que puede ser utilizado para filtrar consultas por fechas y/o cantidades.
 * 
 * @export
 * @interface DataRangeModel
 */
export interface DataRangeModel {
  /** Fecha de inicio del rango */
  startDate?: number | Date;

  /** Fecha de fin del rango */
  endDate?: number | Date;

  /** Cantidad mínima en el rango */
  startAmount?: number;

  /** Cantidad máxima en el rango */
  endAmount?: number;
}
