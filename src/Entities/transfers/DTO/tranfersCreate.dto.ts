import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";
import { etatTransfer, typeStatus } from "src/Type/Type";
import { IntegerType } from "typeorm";




export class CreateTranfer{


id:string;
@IsString()
from:string;
@IsString()
to:string;
@IsDateString()
date_time_Depart:string;
@IsDateString()
date_time_Arrive:string;
@IsNumber()
nbrePlacesDisponibles:number;
@IsNumber()
priceTransferForPerson:number;
@IsIn(Object.values(etatTransfer))
etatTransfer:string;
@IsString()
note:string;
@IsNumber()
extra:number;
@IsDateString()
dateCreation:string= new Date().toISOString();
@IsDateString()
dateUpdate:string= new Date().toISOString();
@IsIn(Object.values(typeStatus))
status:typeStatus;
agentId:string;
agencyId:string;





}