import { getConnection, getRepository } from 'typeorm';
import { Response } from 'express';

import ICRUDOptions from '../models/ICRUDOptions';
import ICRUDProvider from '../models/ICRUDProvider';

interface ITypeormModelRegister {
  [x: string]: any;
}

export default class TypeormCRUD implements ICRUDProvider {
  private modelRegister: ITypeormModelRegister;

  constructor() {
    this.modelRegister = {};
  }

  public async index({
    tablename,
    request,
    response,
  }: ICRUDOptions): Promise<Response> {
    const repository = getRepository(this.modelRegister[tablename]);

    const { id } = request.params;

    const entity = await repository.findOne({
      where: {
        id,
      },
    });

    return response.formatedJson(entity);
  }

  public async read({ tablename, response }: ICRUDOptions): Promise<Response> {
    const repository = getRepository(this.modelRegister[tablename]);

    const queryBuilder = repository.createQueryBuilder();

    const entityList = await queryBuilder.getMany();

    return response.formatedJson(entityList);
  }

  public async filter({
    tablename,
    request,
    response,
  }: ICRUDOptions): Promise<Response> {
    const repository = getRepository(this.modelRegister[tablename]);

    const queryBuilder = repository.createQueryBuilder();

    const entityList = await queryBuilder.getMany();

    return response.formatedJson(entityList);
  }

  public async store({
    tablename,
    request,
    response,
  }: ICRUDOptions): Promise<Response> {
    const repository = getRepository(this.modelRegister[tablename]);

    const entity = repository.create(request.body);

    await repository.save(entity);

    return response.formatedJson(entity);
  }

  public async delete({
    tablename,
    request,
    response,
  }: ICRUDOptions): Promise<Response> {
    const repository = getRepository(this.modelRegister[tablename]);

    const { params } = request;

    await repository
      .createQueryBuilder()
      .delete()
      .from(this.modelRegister[tablename])
      .where('id = :id', { id: params.id })
      .execute();

    return response.formatedJson({});
  }
}
