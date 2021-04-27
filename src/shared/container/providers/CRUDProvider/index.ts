import { container } from 'tsyringe';
import TypeormCRUD from './implementations/TypeormCRUD';
import ICRUDProvider from './models/ICRUDProvider';

container.registerSingleton<ICRUDProvider>('CRUDProvider', TypeormCRUD);
