import { User } from "src/Entities/users/users.entity";
import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Notification } from "../notifications/notifications.entity";

@Entity()
export class Agent extends User {




@ManyToOne(() => Agency, agency => agency.agents)
agency: Agency    
@OneToMany(()=>Notification, notification=>notification.agent)
notifications:Notification[]
}