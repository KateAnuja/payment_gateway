import { Repository } from "typeorm";
import { AppDataSource } from "../../lib/DataSource";
import { Dummy } from "../models/Dummy";

export class BaseService<T> implements IBaseServiceInterface<T> {
    private create2: { new (): T; };
    baseRepo;
    constructor(
        protected repo:Repository<T>,
        create2:{ new (): T; }
    ) {
        this.baseRepo=repo;
        this.create2=create2;
    }

    async create(entity: T): Promise<T> {
        let e2:any=entity;
        e2.createStamp=+new Date();
        return await this.baseRepo.save(e2);
    }

    async update(entity: T): Promise<T> {
        let e2:any=entity;
        e2.updateStamp=+new Date();
        return await this.baseRepo.save(e2);
    }


    async delete(entity: T): Promise<T> {
        let e2:any=entity;
        e2.deleteStamp=+new Date();
        return await this.baseRepo.save(e2);
    }


    async getById(id:number): Promise<T> {
        
        let tablename=this.baseRepo.metadata.tableName;
        let rows=await this.baseRepo.manager.query(`SELECT * FROM ${tablename} WHERE id=${id}`);
        if(rows[0]){
          return this.baseRepo.create(rows[0]) as any;
        }
        return null;
    }

}

interface IBaseServiceInterface<T>{
    create(entity:T):Promise<T>;
    update(entity:T):Promise<T>;
    delete(entitt:T):Promise<T>;
    getById(id:number):Promise<T>;
}