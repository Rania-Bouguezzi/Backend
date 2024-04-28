import { Test, TestingModule } from '@nestjs/testing';
import { NeedTransferService } from './need-transfer.service';

describe('NeedTransferService', () => {
  let service: NeedTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeedTransferService],
    }).compile();

    service = module.get<NeedTransferService>(NeedTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
