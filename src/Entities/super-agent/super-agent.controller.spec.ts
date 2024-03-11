import { Test, TestingModule } from '@nestjs/testing';
import { SuperAgentController } from './super-agent.controller';

describe('SuperAgentController', () => {
  let controller: SuperAgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperAgentController],
    }).compile();

    controller = module.get<SuperAgentController>(SuperAgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
