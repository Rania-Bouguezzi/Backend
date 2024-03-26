import { Test, TestingModule } from '@nestjs/testing';
import { AuthDriverController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthDriverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthDriverController],
    }).compile();

    controller = module.get<AuthDriverController>(AuthDriverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
