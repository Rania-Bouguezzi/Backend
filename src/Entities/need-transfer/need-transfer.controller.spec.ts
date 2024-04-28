import { Test, TestingModule } from '@nestjs/testing';
import { NeedTransferController } from './need-transfer.controller';

describe('NeedTransferController', () => {
  let controller: NeedTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeedTransferController],
    }).compile();

    controller = module.get<NeedTransferController>(NeedTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
