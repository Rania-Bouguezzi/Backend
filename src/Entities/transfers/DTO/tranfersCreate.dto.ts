import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";
import { EtatTransfer, typeStatus } from "src/Type/Type";
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
//@IsNumber()
nbrePlacesDisponibles:number;
@IsNumber()
nbrePlacesOccupees:number;
@IsNumber()
priceTransferForPerson:number;
//@IsIn(Object.values(EtatTransfer))
etatTransfer:EtatTransfer;
@IsString()
note:string;
@IsNumber()
extra:number;
isShared:boolean=false;
@IsDateString()
dateShare:string= new Date().toISOString();
@IsDateString()
dateCreation:string= new Date().toISOString();
@IsDateString()
dateUpdate:string= new Date().toISOString();
//@IsIn(Object.values(typeStatus))
status:typeStatus;
agentId:string;
agencyId:string;





}