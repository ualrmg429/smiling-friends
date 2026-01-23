import { Test, TestingModule } from '@nestjs/testing';
import { PendingRegistrationService } from './pending-registration.service';

describe('PendingRegistrationService', () => {
  let service: PendingRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendingRegistrationService],
    }).compile();

    service = module.get<PendingRegistrationService>(PendingRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
