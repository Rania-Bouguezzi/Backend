import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from './agencies.entity';
import { Repository } from 'typeorm';
import { CreateAgency } from './DTO/agenciesCreate.dto';
import { UpdateAgency } from './DTO/agenciesUpdate.dto';

@Injectable()
export class AgenciesService {


constructor(@InjectRepository(Agency) private agencyRepository: Repository<Agency>){}

findAll(){
    return this.agencyRepository.find({ relations: ["agents"] })
}
findOne(id : string){
    return this.agencyRepository.findOne({where: {id}, relations:['agents', 'buses', 'transfers' , 'drivers', ]});
}

createAgency(agency: CreateAgency){
    agency.dateCreation =   new Date().toISOString();
    agency.dateUpdate = new Date().toISOString();
    const newAgency = this.agencyRepository.create(agency);
    return this.agencyRepository.save(newAgency);
}

async update(id:string, agency: UpdateAgency): Promise<Agency>{
    const updateAgency = await this.agencyRepository.findOne({where:{id}});
    this.agencyRepository.merge(updateAgency, agency);
    return await this.agencyRepository.save(updateAgency);
}

delete(id:string){
     this.agencyRepository.delete(id);
     return 'Agency Deleted!'
}

}
