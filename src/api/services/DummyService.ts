import { BaseService } from './BaseService';
import { Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Dummy } from '../models/Dummy';
import { DummyRepository } from '../repositories/DummyRepository';

@Service()
export class DummyService extends BaseService<Dummy> {
    constructor(
        @EventDispatcher() protected eventDispatcher: EventDispatcherInterface,
    ){
        super(DummyRepository,Dummy);
    }

    async getDeleted(){
        return await DummyRepository.findDeleted();
    }
    
}