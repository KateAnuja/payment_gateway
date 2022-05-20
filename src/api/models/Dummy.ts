import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseModel } from "./BaseModel";




@Entity({
    name:'dummy'
})
export class Dummy extends BaseModel{
   
    @Column({
        name:'invoice_local_id',
        length:30,
        default:null,
    })
    invoiceLocalId: string;

    @Column({
        nullable:false,
        name:'amount',
        type:'double',
        precision:10,
        scale:2,
        default:0.00
    })
    amount: number;


    @Column({
        nullable:true,
        name:'age',
        default:null
    })
    age: number;

}