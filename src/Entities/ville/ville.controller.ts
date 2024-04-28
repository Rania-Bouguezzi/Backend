import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VilleService } from './ville.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateVille } from './DTO/CreateVille.dto';

@Controller('ville')
@ApiTags('Ville')
export class VilleController {

constructor(private readonly villeService : VilleService){}

@Get()
finAll(){
    return this.villeService.findAll();

}

@Get(':id')
findById(@Param('id') id : string){
    return this.villeService.findById(id);
}

@Post('add')
createUser(@Body() ville: CreateVille){
    return this.villeService.createVille(ville);
}






}
