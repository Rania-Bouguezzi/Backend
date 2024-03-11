import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReaction } from './DTO/reactionsCreate.dto';
import { UpdateReaction } from './DTO/reactionsUpdate.dto';

@Controller('reactions')
export class ReactionsController {
    constructor(private readonly reactionService : ReactionsService){}
    @Get(':id')
findById(@Param('id') id : number){
    return this.reactionService.findOne(id);
}

@Post('add')
createReaction(@Body() reaction: CreateReaction){
    return this.reactionService.createReaction(reaction);
}

@Patch('id')
updateReaction(@Param('id') id:number, @Body() reaction:UpdateReaction)
{   const newReac = this.reactionService.findOne(id);
    if(!newReac){
        throw new HttpException('Reaction with' +id + 'Not Found !' , 404);
    }
    return this.reactionService.updateReaction(id,reaction);
}

@Delete(':id')
deleteReaction(@Param('id') id : number){
    const react = this.reactionService.findOne(id)
    if (!react) {
        throw new HttpException('Reaction not found ', 404)
    
    }
   return this.reactionService.delteReaction(id)
}



}
