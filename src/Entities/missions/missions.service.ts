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
import { EtatMission, typeStatus } from 'src/Type/Type';


@Injectable()
export class MissionsService {



    constructor(@InjectRepository(Mission) private missionrepository : Repository<Mission>,
    @InjectRepository(Transfer) private transferrepository : Repository<Transfer>,
    @InjectRepository(Agent) private agentRepository : Repository<Agent>,
    @InjectRepository(Bus) private busRepository : Repository<Bus>,
    @InjectRepository(Driver) private driverRepository : Repository<Driver>,
){}



    findAll(){
        return this.missionrepository.find({relations:['transfers', 'agent', 'agent.agency', 'bus', 'driver']});
    }
    
    findOne(id:string){
        return this.missionrepository.findOne({where: {id}, relations:['agent','transfers', 'agent.agency']});
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
            const mission = await this.missionrepository.findOneOrFail( {where : {id}, relations: ['transfers', 'bus' , 'driver'] });
            const
             transferIds = mission.transfers.map(transfer => transfer.id);
          

            // Détacher les transferts de la mission en mettant à jour leurs relations
            await this.missionrepository.manager
              .createQueryBuilder()
              .relation(Mission, 'transfers')
              .of(mission)
              .remove(transferIds);
             
        
           
            await this.missionrepository.remove(mission);
        
            return { success: true, message: 'Mission deleted successfully.' };
          }
        
        


        async createMissionWithTransfers(missionData: CreateMission) {
          
            const {name,from,to,date_time_start,date_time_end,nbrPassengers,totalPrice, dateMission,dateCreation,dateUpdate, transfers,agentId,busId, driverId } = missionData;
            const agent = await this.agentRepository.findOne({ where: { id: agentId } });
            const bus = await this.busRepository.findOne({ where: { id: busId } });
            const driver = await this.driverRepository.findOne({ where: { id: driverId } });
            const mission = await this.missionrepository.create( {name,from,to,date_time_start,date_time_end,nbrPassengers,totalPrice, dateMission,dateCreation,dateUpdate, transfers,agent, bus,driver ,});
            mission.dateCreation = new Date().toISOString();
            mission.dateUpdate= new Date().toISOString();
            mission.etatMission= EtatMission.DISPO;
            mission.status= typeStatus.ACTIVE;
           
            if (transfers && transfers.length > 0) {
              const transfersEntities = await this.transferrepository.findByIds(transfers);
              mission.transfers = transfersEntities;
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
                  },relations:['agent', 'agent.agency', 'transfers', ]
              });}


               async getSharedMission():Promise <Mission[]>{
                return  this.missionrepository.find(
                      {
                          where : {isShared:true},
                          relations:['agent', 'agent.agency', 'transfers', ]
                      }
                  )
              }


              getMissionByAgencyByDriver(idAgency: string, idDriver: string): Promise<Mission[]> {
                return this.missionrepository.find({
                    where: {
                        isShared: true,
                        agent : {agency : {id: idAgency}},
                        driver : {id: idDriver}
                    },
                    relations: ['agent', 'agent.agency', 'transfers', 'bus']
                });
            }
            

}
