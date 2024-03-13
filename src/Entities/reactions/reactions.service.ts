import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from './reactions.entity';
import { Repository } from 'typeorm';
import { CreateReaction } from './DTO/reactionsCreate.dto';
import { UpdateReaction } from './DTO/reactionsUpdate.dto';

@Injectable()
export class ReactionsService {




    constructor(@InjectRepository(Reaction) private reactionReaction : Repository<Reaction>){}



    findAll(){
        return this.reactionReaction.find();
    }
    
    findOne(id:string){
        return this.reactionReaction.findOne({where: {id}});
    }
    
    
    createReaction(reaction : CreateReaction){
      
       const  newReaction = this.reactionReaction.create(reaction);
       return this.reactionReaction.save(newReaction);
    }
    
    async updateReaction(id:string ,reaction: UpdateReaction): Promise<Reaction>{
        const update = await this.reactionReaction.findOne({where: {id}});
        this.reactionReaction.merge(update,reaction);
        return await this.reactionReaction.save(update);
        }
        
        
        
        delteReaction(id:string){
            return this.reactionReaction.delete(id);
        }
        





















}
