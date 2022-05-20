import {Request,Response} from 'express';
import { Config, Env } from '../Config';


function setPage(req:Request,res:Response,pageOptions:{
    title:string,
    description:string,
    view:string,
    data?:any
}){
    res.render(pageOptions.view,{
        isDev:Config.env==Env.dev,
        title:pageOptions.title,
        description:pageOptions.description,
        HOST:Config.domain,
        data:pageOptions.data,
    })
}

const StatusFailed={
    status:"failed"
}

const StatusSuccess={
    status:"success"
}



export {setPage,StatusFailed,StatusSuccess};