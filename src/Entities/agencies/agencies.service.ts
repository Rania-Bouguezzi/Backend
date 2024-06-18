import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from './agencies.entity';
import { Repository } from 'typeorm';
import { CreateAgency } from './DTO/agenciesCreate.dto';
import { UpdateAgency } from './DTO/agenciesUpdate.dto';
import { SuperAgent } from '../super-agent/superAgent.entity';
import { UserType, typeStatus } from 'src/Type/Type';
import { SuperAgentCreate } from '../super-agent/DTO/superAgentCreate.dto';

@Injectable()
export class AgenciesService {


constructor(@InjectRepository(Agency) private agencyRepository: Repository<Agency>,
@InjectRepository(SuperAgent) private readonly superagentRepository: Repository<SuperAgent>
){}

findAll(){
    return this.agencyRepository.find({where : {status : typeStatus.ACTIVE}, relations: ["agents"] })
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



delete(id:string){
     this.agencyRepository.delete(id);
     return 'Agency Deleted!'
}



async createAgencyWithSuperAgent(
    createAgencyDto: CreateAgency,
    superAgentCreateDto: SuperAgentCreate
  ) {
    // Créer l'agence
    createAgencyDto.dateCreation = new Date().toISOString();
    createAgencyDto.dateUpdate = new Date().toISOString();
    createAgencyDto.type= 'Agence de Voyage';
    createAgencyDto.status= typeStatus.ACTIVE;
    const newAgency = this.agencyRepository.create(createAgencyDto);
    const savedAgency = await this.agencyRepository.save(newAgency);

    // Créer le super agent
    const {  password, firstname, lastname, email, phone, birthDate, picture, address, genre } = superAgentCreateDto;
    const newAgent = this.superagentRepository.create({
    
      password,
      firstname,
      lastname,
      email,
      phone,
      birthDate,
      picture,
      address,
      genre,
      agency: savedAgency
    });
    newAgent.dateCreation = new Date().toISOString();
    newAgent.dateUpdate = new Date().toISOString();
    newAgent.role = UserType.SUPERAGENT;
    newAgent.status = typeStatus.ACTIVE;
   

    const savedAgent = await this.superagentRepository.save(newAgent);

    return {
      agency: savedAgency,
      superAgent: savedAgent
    };
  }

async removeAgency(id:string): Promise<Agency>{
  const updateAgency = await this.agencyRepository.findOne({where:{id}});
  this.agencyRepository.merge(updateAgency);
  return await this.agencyRepository.save(updateAgency);
}



async update(id:string, agency: UpdateAgency): Promise<Agency>{
  const updateAgency = await this.agencyRepository.findOne({where:{id}});
  this.agencyRepository.merge(updateAgency, agency);
  return await this.agencyRepository.save(updateAgency);
}






}
