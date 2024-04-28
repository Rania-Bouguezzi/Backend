import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ville } from './ville.entity';
import { Repository } from 'typeorm';
import { CreateVille } from './DTO/CreateVille.dto';

@Injectable()
export class VilleService {


constructor(@InjectRepository(Ville) private villeRepository : Repository<Ville>){}

    findAll()
    {
        return this.villeRepository.find();
    }
    
    
    findById(id: string){
        const ville = this.villeRepository.findOne({where: {id}});
        if(!ville){
            throw new HttpException('Ville with' + id+ 'Not Found ', 404);
    
        }
        return this.villeRepository.findOne({where: {id}});
    }
    
    createVille (ville: CreateVille){
      
        const newVille = this.villeRepository.create(ville);
        return this.villeRepository.save(newVille);
    }






}
