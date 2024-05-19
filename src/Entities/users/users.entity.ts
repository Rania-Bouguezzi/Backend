import { GenreType, UserType, typeStatus } from "src/Type/Type";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Feedback } from "../feedbacks/feedbacks.entity";
import { Reaction } from "../reactions/reactions.entity";



@Entity()
export class User {

@PrimaryGeneratedColumn('uuid')
id:string;
@Column()
username : string;
@Column()
password : string
@Column()
firstname : string;
@Column()
lastname : string;
@Column({unique: true})
email : string;
@Column()
phone : string;
@Column()
birthDate : string;
@Column({ nullable: true })
picture : string;
@Column()
address : string;
@Column({ type: 'enum', enum: UserType })   //à tester
role:UserType;
@Column({ type: 'enum', enum: GenreType }) 
genre:string;
@Column({ nullable: true })
facebookKey:string;
@Column({nullable : true})
profile:string;
@Column({ default: true })
enableOauth:boolean;
@Column({ default: 0 })
sessionTimeout:number;;
@Column({ default: true })
multipleSession:boolean;
@Column({ default: true })
phoneValidated:boolean;;
@Column({ nullable: true })
phoneValidationCode:string;
@Column({ default: true })
emailValidated:boolean;
@Column({ nullable: true })
emailValidationCode:string;
@Column({ nullable: true })
authenticationMode:string;
@Column({ default: true })
enabled:boolean;
@Column({ nullable: true })
confirmationToken:string;
@Column({ nullable: true })
passwordRequestedAt:string;
@Column({ default: true })
locked:boolean;
@Column({ default: true })
expired:boolean;
@Column({ nullable: true })
expiresAt:string;
@Column({ default: true })
credentialsExpired:boolean;
@Column({ nullable: true })
credentialsExpireAt:string;
@Column({ nullable: true })
lastLogin:string;
@Column({ nullable: true })
lastFailedLogin:string;
@Column({ default: 0 })
loginCount:number;
@Column({ default: 0 })
failedLoginCount:number;
@Column({ default: 0 })
lastFailedLoginCount:number;
@Column()
dateCreation:string;
@Column()
dateUpdate:string;
@Column({ type: 'enum', enum: typeStatus }) 
status:typeStatus;
@OneToOne(() => Reaction)
@JoinColumn()
reaction: Reaction;

    
}