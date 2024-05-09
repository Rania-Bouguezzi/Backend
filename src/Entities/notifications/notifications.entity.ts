
import { typeStatus } from "src/Type/Type";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "../agent/agent.entity";

@Entity()
export class Notification{

    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({nullable : true})
    title:string;
    @Column()
    message:string;
    @Column({nullable : true})
    sound:string;
    @Column({ default: false })
    sending:boolean;
    @Column()
    agentEmetteurId:string;
    @Column()
    agencyEmettriceId:string;
    @Column()
    agencyEmettriceName:string;
    @Column()
    agencyEmettriceLogo:string;
    @Column({nullable: true})
    notifAccept:boolean;
    @Column({nullable: true})
    notifRefus:boolean;
    @Column({nullable: true})
    transferId:string;
    @Column({default:false})
    validate:boolean;
    @Column({nullable: true})
    from:string;
    @Column({nullable: true})
    to:string;
    @Column({nullable: true})
    nbPlaces:string;
    @Column({nullable: true})
    date_time:string;
    @Column()
    sendingTime:string;
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @ManyToOne(()=>Agent, agent=>agent.notifications)
    agent:Agent;


}