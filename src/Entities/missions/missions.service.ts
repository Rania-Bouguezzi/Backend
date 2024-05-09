import { Injectable } from '@nestjs/common';
import { Mission } from './missions.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMission } from './DTO/missionsCreate.dto';
import { UpdateMission } from './DTO/missionsUpdate.dto';
import { Transfer } from '../transfers/transfers.entity';
import { Agent } from '../agent/agent.entity';
import { Bus } from '../buses/buses.entity';
import { Driver } from '../drivers/driver.entity';

@Injectable()
export class MissionsService {



    constructor(@InjectRepository(Mission) private missionrepository : Repository<Mission>,
    @InjectRepository(Transfer) private transferrepository : Repository<Transfer>,
    @InjectRepository(Agent) private agentRepository : Repository<Agent>,
    @InjectRepository(Bus) private busRepository : Repository<Bus>,
    @InjectRepository(Driver) private driverRepository : Repository<Driver>,
){}



    findAll(){
        return this.missionrepository.find({relations:['transfers', 'agent', 'agent.agency', 'buses', 'drivers']});
    }
    
    findOne(id:string){
        return this.missionrepository.findOne({where: {id}, relations:['agent','transfers', 'buses', 'drivers']});
    }
    
    
    createMission(mission : CreateMission){
        mission.dateCreation = new Date().toISOString();
        mission.dateUpdate= new Date().toISOString();
     
       const  newMission = this.missionrepository.create(mission);
       return this.missionrepository.save(newMission);
    }
    
    async updateMission(id:string ,mission: UpdateMission): Promise<Mission>{
        const update = await this.missionrepository.findOne({where: {id},relations:['transfers']});
  //      update.transfers = mission.transfers;
        this.missionrepository.merge(update,mission);
        return await this.missionrepository.save(update);
        }
        
        
        
        async  delteMission(id:string){
            const mission = await this.missionrepository.findOneOrFail( {where : {id}, relations: ['transfers', 'buses' , 'drivers'] });
            const transferIds = mission.transfers.map(transfer => transfer.id);
            const busIds = mission.buses.map(bus => bus.id);
            const driverIds = mission.drivers.map(driver => driver.id);

            // Détacher les transferts de la mission en mettant à jour leurs relations
            await this.missionrepository.manager
              .createQueryBuilder()
              .relation(Mission, 'transfers')
              .of(mission)
              .remove(transferIds);
              await this.missionrepository.manager
              .createQueryBuilder()
              .relation(Mission, 'buses')
              .of(mission)
              .remove(busIds);
              await this.missionrepository.manager
              .createQueryBuilder()
              .relation(Mission, 'drivers')
              .of(mission)
              .remove(driverIds);
        
            // Enfin, supprimer la mission elle-même
            await this.missionrepository.remove(mission);
        
            return { success: true, message: 'Mission deleted successfully.' };
          }
        
        


        async createMissionWithTransfers(missionData: CreateMission) {
          
            const {name,from,to,date_time_start,date_time_end,nbrPassengers,totalPrice,status, dateMission,dateCreation,dateUpdate, transfers,agentId, buses, drivers } = missionData;
            const agent = await this.agentRepository.findOne({ where: { id: agentId } });
            const mission = await this.missionrepository.create( {name,from,to,date_time_start,date_time_end,nbrPassengers,totalPrice,status, dateMission,dateCreation,dateUpdate, transfers,agent, buses});
            mission.dateCreation = new Date().toISOString();
            mission.dateUpdate= new Date().toISOString();
            if (transfers && transfers.length > 0) {
              const transfersEntities = await this.transferrepository.findByIds(transfers);
              mission.transfers = transfersEntities;
              await this.missionrepository.save(mission);
            }
            if (buses && buses.length > 0) {
              const busessEntities = await this.busRepository.findByIds(buses);
              mission.buses = busessEntities;
              await this.missionrepository.save(mission);
            }
            if (drivers && drivers.length > 0) {
              const driverssEntities = await this.driverRepository.findByIds(drivers);
              mission.drivers = driverssEntities;
              await this.missionrepository.save(mission);
            }
        
            return mission;
          }


          async getMissionByAgency(idAgency: string): Promise<Mission[]> {
            return this.missionrepository.find({
                where: {
                    agent: {
                      agency: { id: idAgency }
                    }
                  },relations:['agent', 'agent.agency', 'transfers', 'buses' , 'drivers']
              });}

}
