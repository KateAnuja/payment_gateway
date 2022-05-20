import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseModel{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type:'bigint',
        default:0,
    })
    createStamp:number;  

    @Column({
        type:'bigint',
        default:0,
    })
    updateStamp:number;
    
    @Column({
        type:'bigint',
        default:0,
    })
    deleteStamp:number;
} 