import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountRepository, AccountTypeRepository, CustomerRepository } from '../../../data/persistence/repositories';
import { AccountEntity, AccountTypeEntity, CustomerEntity } from '../../../data/persistence/entities';
import { AccountDTO } from 'src/business/dtos';
import { ConflictException } from '@nestjs/common';

describe('AccountService', () => {
  let service: AccountService;
  let accountRepository: AccountRepository;
  let accountTypeRepository: AccountTypeRepository;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountRepository,
          useValue: {
            register: jest.fn(),
            findAll: jest.fn(),
            findOneById: jest.fn(),
            findByCustomer: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: AccountTypeRepository,
          useValue: {
            findOneById: jest.fn(),
          },
        },
        {
          provide: CustomerRepository,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
    accountTypeRepository = module.get<AccountTypeRepository>(AccountTypeRepository);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
  });

  describe('createAccount', () => {
    it('should create a new account', async () => {
      // Arrange
      const accountDTO: AccountDTO = {
        customerId: 'customerId',
        accountTypeId: 'accountTypeId',
      };

      const customer = new CustomerEntity();
      customer.id = 'customerId';

      const accountType = new AccountTypeEntity();
      accountType.id = 'accountTypeId';

      const newAccount = new AccountEntity();
      newAccount.customer = customer;
      newAccount.accountType = accountType;

      jest.spyOn(customerRepository, 'findOneById').mockResolvedValue(customer);
      jest.spyOn(accountTypeRepository, 'findOneById').mockResolvedValue(accountType);
      jest.spyOn(accountRepository, 'register').mockResolvedValue(newAccount);

      // Act
      const result = await service.createAccount(accountDTO);

      // Assert
      expect(result).toEqual(newAccount);
      expect(customerRepository.findOneById).toHaveBeenCalledWith('customerId');
      expect(accountTypeRepository.findOneById).toHaveBeenCalledWith('accountTypeId');
    });
  });

  describe('getBalance', () => {
    it('should return account balance', async () => {
      // Arrange
      const accountId = 'accountId';
      const account = new AccountEntity();
      account.id = accountId;
      account.balance = 100;
      account.state = true;

      jest.spyOn(service, 'getState').mockResolvedValue(true);
      jest.spyOn(accountRepository, 'findOneById').mockResolvedValue(account);

      // Act
      const result = await service.getBalance(accountId);

      // Assert
      expect(result).toBe(100);
      expect(service.getState).toHaveBeenCalledWith(accountId);
      expect(accountRepository.findOneById).toHaveBeenCalledWith(accountId);
    })
  });

  describe('addBalance', () => {
    it('should add balance to the account', async () => {
      // Arrange
      const accountId = 'accountId';
      const amount = 50;
      const account = new AccountEntity();
      account.id = accountId;
      account.balance = 100;
      account.state = true;
  
      jest.spyOn(service, 'getState').mockResolvedValue(true);
      jest.spyOn(accountRepository, 'findOneById').mockResolvedValue(account);
      // Act
      await service.addBalance(accountId, amount);
  
      // Assert
      expect(service.getState).toHaveBeenCalledWith(accountId);
      expect(accountRepository.findOneById).toHaveBeenCalledWith(accountId);
      expect(accountRepository.update).toHaveBeenCalledWith(accountId, { ...account, balance: 150 });
    })
  });  
});
