
import { IsNull, MoreThan, Not } from 'typeorm';
import { AppDataSource } from '../../lib/DataSource';
import { Dummy } from '../models/Dummy';

export const DummyRepository = AppDataSource.getRepository(Dummy).extend({
    findDeleted(){
        return this.find({
            where:[
                {
                    deleteStamp:Not(IsNull() && 0)
                }
            ]
        })
    }
})