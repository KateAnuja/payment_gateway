import { Controller, Get, Post, BodyParam, Body, QueryParam, Res, Req } from "routing-controllers";
import { DummyService } from "../services/DummyService";
import { Dummy } from "../models/Dummy";

@Controller('/dummy')
export class DummyController {

    constructor(
        private dummyService: DummyService
    ){}


    @Get('/add')
    public async add(
        
    ){
        let dummy=new Dummy();
        dummy.amount=20;
        dummy.invoiceLocalId=((+new Date())+'');
        return await this.dummyService.create(dummy); 
    }

    @Get('/update')
    public async update(){
        let dummy:Dummy=await this.dummyService.getById(2);
        
        dummy.amount=40;
        dummy.invoiceLocalId="Updated";
        return await this.dummyService.update(dummy);
    }

    @Get('/delete')
    public async delete(){
        let dummy:Dummy=await this.dummyService.getById(3);
        return await this.dummyService.delete(dummy);
    }

    @Get('/alldelete')
    public async alldelete(){
        return await this.dummyService.getDeleted();
    }
}
