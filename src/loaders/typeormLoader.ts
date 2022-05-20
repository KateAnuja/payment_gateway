import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { AppDataSource  } from '../lib/DataSource';
export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    try{
        
        await AppDataSource.initialize(); 
        console.log("Db connected");
    }catch(err){
        console.error("Db not connected",err);
    }
    
}