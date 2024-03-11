import { ReactionType, typeStatus } from "src/Type/Type";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";


@Entity()
export class Reaction{

    @PrimaryGeneratedColumn()
    id:number;
    @Column({ type: 'enum', enum: ReactionType })
    reactionType:ReactionType;
    @Column()
    sendingTime:string;
    @Column()
    dateUpdate:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @OneToOne(() => User, user => user.reaction)
    user: User;



    
}