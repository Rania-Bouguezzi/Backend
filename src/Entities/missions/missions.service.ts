import { Injectable } from '@nestjs/common';
import { Mission } from './missions.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMission } from './DTO/missionsCreate.dto';
import { UpdateMission } from './DTO/missionsUpdate.dto';

@Injectable()
export class MissionsService {



    constructor(@InjectRepository(Mission) private missionrepository : Repository<Mission>){}



    findAll(){
        return this.missionrepository.find();
    }
    
    findOne(id:string){
        return this.missionrepository.findOne({where: {id}});
    }
    
    
    createMission(mission : CreateMission){
        mission.dateCreation = new Date().toISOString();
        mission.dateUpdate= new Date().toISOString();
       const  newMission = this.missionrepository.create(mission);
       return this.missionrepository.save(newMission);
    }
    
    async updateMission(id:string ,mission: UpdateMission): Promise<Mission>{
        const update = await this.missionrepository.findOne({where: {id}});
        this.missionrepository.merge(update,mission);
        return await this.missionrepository.save(update);
        }
        
        
        
        delteMission(id:string){
            return this.missionrepository.delete(id);
        }
        

















}
