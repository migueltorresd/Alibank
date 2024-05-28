import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentTypeEntity } from '../entities';
import { DocumentTypeRepositoryInterface } from './interfaces';

@Injectable()
export class DocumentTypeRepository implements DocumentTypeRepositoryInterface {
  constructor(
    @InjectRepository(DocumentTypeEntity)
    private readonly documentTypeRepository: Repository<DocumentTypeEntity>,
  ) {
    // Se guardan tipos de documento por defecto al inicializar el repositorio
    this.documentTypeRepository.save({
      id: 'c822487e-5e89-4a49-98d5-50ce60b300b1',
      name: 'Cédula de ciudadanía',
      state: true,
    });
    this.documentTypeRepository.save({
      id: '64911806-283f-4e71-ab94-f9098e18cf9a',
      name: 'Cédula de extranjería',
      state: true,
    });
  }

  /**
   * Registra un nuevo tipo de documento en la base de datos.
   * @param entity Los datos del tipo de documento a registrar.
   * @returns Una promesa que resuelve en el tipo de documento registrado.
   */
  register(entity: DocumentTypeEntity): Promise<DocumentTypeEntity> {
    return this.documentTypeRepository.save(entity);
  }

  /**
   * Actualiza un tipo de documento existente en la base de datos.
   * @param id El ID del tipo de documento a actualizar.
   * @param entity Los nuevos datos del tipo de documento.
   * @returns Una promesa que resuelve en el tipo de documento actualizado.
   * @throws `NotFoundException` si el tipo de documento no existe.
   */
  update(id: string, entity: DocumentTypeEntity): Promise<DocumentTypeEntity> {
    return this.documentTypeRepository.update(id, entity).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`El ID ${id} no existe en la base de datos`);
      }
      return entity;
    });
  }

  /**
   * Elimina un tipo de documento de la base de datos.
   * @param id El ID del tipo de documento a eliminar.
   */
  delete(id: string): void {
    this.findOneById(id);
    this.documentTypeRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`El ID ${id} no existe en la base de datos`);
      }
    });
  }

  /**
   * Encuentra todos los tipos de documento en la base de datos.
   * @returns Una promesa que resuelve en un arreglo de todos los tipos de documento.
   */
  findAll(): Promise<DocumentTypeEntity[]> {
    return this.documentTypeRepository.find();
  }

  /**
   * Encuentra un tipo de documento por su ID en la base de datos.
   * @param id El ID del tipo de documento a encontrar.
   * @returns Una promesa que resuelve en el tipo de documento encontrado.
   * @throws `NotFoundException` si el tipo de documento no existe.
   */
  findOneById(id: string): Promise<DocumentTypeEntity> {
    return this.documentTypeRepository
      .findOne({ where: { id } })
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new NotFoundException(`El ID ${id} no existe en la base de datos`);
        }
      });
  }

  /**
   * Encuentra todos los tipos de documento por su estado en la base de datos.
   * @param state El estado de los tipos de documento a encontrar.
   * @returns Una promesa que resuelve en un arreglo de todos los tipos de documento encontrados.
   */
  findByState(state: boolean): Promise<DocumentTypeEntity[]> {
    return this.documentTypeRepository.find({ where: { state } });
  }

  /**
   * Encuentra todos los tipos de documento por su nombre en la base de datos.
   * @param name El nombre de los tipos de documento a encontrar.
   * @returns Una promesa que resuelve en un arreglo de todos los tipos de documento encontrados.
   */
  findByName(name: string): Promise<DocumentTypeEntity[]> {
    return this.documentTypeRepository.find({ where: { name } });
  }
}
