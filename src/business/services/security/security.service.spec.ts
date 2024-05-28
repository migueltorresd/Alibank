import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SecurityService } from './security.service';
import { AccountService } from '../account/account.service';
import { CustomerRepository, DocumentTypeRepository, AccountRepository, AccountTypeRepository } from '../../../data/persistence/repositories';
import { CustomerDTO, SignDTO } from '../../dtos';

describe('SecurityService', () => {
  let service: SecurityService;
  let jwtService: JwtService;
  let accountService: AccountService;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecurityService,
        JwtService,
        AccountService,
        CustomerRepository,
        DocumentTypeRepository,
        AccountRepository,
        AccountTypeRepository     ],
      
    }).compile();

    service = module.get<SecurityService>(SecurityService);
    jwtService = module.get<JwtService>(JwtService);
    accountService = module.get<AccountService>(AccountService);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
