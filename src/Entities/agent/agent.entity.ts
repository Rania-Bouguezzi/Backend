import { User } from "src/Entities/users/users.entity";
import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Notification } from "../notifications/notifications.entity";
import { SuperAgent } from "../super-agent/superAgent.entity";
import { NeedTransfer } from "../need-transfer/need-transfer.entity";
import { Transfer } from "../transfers/transfers.entity";
import { Mission } from "../missions/missions.entity";
import { Feedback } from "../feedbacks/feedbacks.entity";

@Entity()
export class Agent extends User {




@ManyToOne(() => Agency, agency => agency.agents)
agency: Agency    
@OneToMany(()=>Notification, notification=>notification.agent)
notifications:Notification[]
@ManyToOne(()=> SuperAgent, super_agent=>super_agent.agents)
super_agent:SuperAgent;
@OneToMany(()=> NeedTransfer, needTransfer=> needTransfer.agent)
needTransfers:NeedTransfer[];
@OneToMany(()=> Transfer, transfer=> transfer.agent)
transfers:Transfer[];
@OneToMany(()=> Mission, mission=> mission.agent)
missions:Transfer[];
@OneToMany(()=> Feedback, feedback=> feedback.agent)
feedbacks: Feedback[];
}