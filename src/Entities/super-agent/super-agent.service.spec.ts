import { Test, TestingModule } from '@nestjs/testing';
import { SuperAgentService } from './super-agent.service';

describe('SuperAgentService', () => {
  let service: SuperAgentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAgentService],
    }).compile();

    service = module.get<SuperAgentService>(SuperAgentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
