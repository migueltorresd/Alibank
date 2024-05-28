/**
 * Este archivo exporta un objeto jwtConstants que contiene la clave secreta utilizada para firmar y verificar tokens JWT.
 */
export const jwtConstants = {
  // La propiedad secret se asigna al valor de la variable de entorno JWT_SECRET si está definida;
  // de lo contrario, se usa 'secretKey' como valor predeterminado.
  secret: process.env.JWT_SECRET ?? 'secretKey',
};
