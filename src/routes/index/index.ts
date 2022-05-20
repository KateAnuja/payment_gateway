import { Request,Response } from 'express';
import { Service } from 'typedi';
import { setPage } from '../../lib/Page';


@Service()
export class IndexRouter{

    constructor(
        
    ){

    }

    indexRouter=async (req:Request,res:Response)=>{
        setPage(req,res,{
            title:"",
            description: '',
            view:"index",
            data:{
                pageName:""
            }
        })
    }


    manifestRouter=async (req:Request,res:Response)=>{
        res.send(`
       {
          "name": "",
          "short_name": "",
          "scope":"/",
          "icons": [{
              "src": "/img/logo/128x128-min.png",
              "sizes": "128x128",
              "type": "image/png"
            }, {
              "src": "/img/logo/256x256-min.png",
              "sizes": "256x256",
              "type": "image/png"
            }, {
              "src": "/img/logo/512x512-min.png",
              "sizes": "512x512",
              "type": "image/png"
            }],
          "start_url": "/",
          "display": "standalone",
          "background_color": "#e67e22" ,
          "theme_color": "#2980b9"
        }
      `);
    }



}
