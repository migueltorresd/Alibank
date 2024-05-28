import { Test, TestingModule } from '@nestjs/testing';
import { DepositService } from './deposit.service';
import { AccountRepository, DepositRepository } from '../../../data/persistence/repositories';
import { DepositEntity, AccountEntity } from '../../../data/persistence/entities';
import { DepositDTO, PaginationDTO, DataRangeDTO } from 'src/business/dtos';

describe('DepositService', () => {
  let service: DepositService;
  let depositRepository: DepositRepository;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositService,
        {
          provide: DepositRepository,
          useValue: {
            register: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn(),
            findByDataRange: jest.fn(),
          },
        },
        {
          provide: AccountRepository,
          useValue: {
            findOneById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DepositService>(DepositService);
    depositRepository = module.get<DepositRepository>(DepositRepository);
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  describe('deleteDeposit', () => {
    it('should delete a deposit', () => {
      // Arrange
      const depositId = 'depositId';
      jest.spyOn(depositRepository, 'delete').mockImplementation();

      // Act
      service.deleteDeposit(depositId);

      // Assert
      expect(depositRepository.delete).toHaveBeenCalledWith(depositId);
    });
  });

  describe('getHistory', () => {
    it('should return deposit history with pagination', async () => {
      // Arrange
      const accountId = 'accountId';
      const pagination: PaginationDTO = { page: 0, length: 2 };
      const deposits = [
        { account: { id: accountId }, amount: 100, dateTime: Date.now() },
        { account: { id: accountId }, amount: 200, dateTime: Date.now() },
        { account: { id: accountId }, amount: 300, dateTime: Date.now() },
      ] as DepositEntity[];

      jest.spyOn(depositRepository, 'findAll').mockResolvedValue(deposits);

      // Act
      const result = await service.getHistory(accountId, pagination);

      // Assert
      expect(result).toEqual(deposits.slice(0, 2));
      expect(depositRepository.findAll).toHaveBeenCalled();
    });

    it('should return deposit history with pagination and date range', async () => {
      // Arrange
      const accountId = 'accountId';
      const pagination: PaginationDTO = { page: 0, length: 2 };
      const dataRange: DataRangeDTO = { startDate: 0, endDate: Date.now(), startAmount: 100, endAmount: 300 };
      const deposits = [
        { account: { id: accountId }, amount: 100, dateTime: Date.now() },
        { account: { id: accountId }, amount: 200, dateTime: Date.now() },
        { account: { id: accountId }, amount: 300, dateTime: Date.now() },
      ] as DepositEntity[];

      jest.spyOn(depositRepository, 'findByDataRange').mockResolvedValue(deposits);

      // Act
      const result = await service.getHistory(accountId, pagination, dataRange);

      // Assert
      expect(result).toEqual(deposits.slice(0, 2));
      expect(depositRepository.findByDataRange).toHaveBeenCalledWith(dataRange.startDate, dataRange.endDate);
    });
  });
});
