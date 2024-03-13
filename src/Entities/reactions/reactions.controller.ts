import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReaction } from './DTO/reactionsCreate.dto';
import { UpdateReaction } from './DTO/reactionsUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('reactions')
@ApiTags('Reaction')
export class ReactionsController {
    constructor(private readonly reactionService : ReactionsService){}
    @Get(':id')
findById(@Param('id') id : string){
    return this.reactionService.findOne(id);
}

@Post('add')
createReaction(@Body() reaction: CreateReaction){
    return this.reactionService.createReaction(reaction);
}

@Patch('id')
updateReaction(@Param('id') id:string, @Body() reaction:UpdateReaction)
{   const newReac = this.reactionService.findOne(id);
    if(!newReac){
        throw new HttpException('Reaction with' +id + 'Not Found !' , 404);
    }
    return this.reactionService.updateReaction(id,reaction);
}

@Delete(':id')
deleteReaction(@Param('id') id : string){
    const react = this.reactionService.findOne(id)
    if (!react) {
        throw new HttpException('Reaction not found ', 404)
    
    }
   return this.reactionService.delteReaction(id)
}



}
