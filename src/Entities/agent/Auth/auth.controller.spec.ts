import { Test, TestingModule } from '@nestjs/testing';
import { AuthAgentController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthAgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthAgentController],
    }).compile();

    controller = module.get<AuthAgentController>(AuthAgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
