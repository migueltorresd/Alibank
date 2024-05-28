import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { AccountRepository, AccountTypeRepository, CustomerRepository } from '../../../data/persistence/repositories';
import { CustomerEntity } from '../../../data/persistence/entities';
import { NotFoundException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: {
            findOneById: jest.fn(),
            findOneByEmail: jest.fn(),
            findAll: jest.fn(),
            findAllDeleted: jest.fn(),
            existEmail: jest.fn(),
            register: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: AccountRepository,
          useValue: {
            register: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: AccountTypeRepository,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
  });

  describe('getCustomerInfo', () => {
    it('should return customer information', async () => {
      // Arrange
      const customerId = 'customerId';
      const customer = new CustomerEntity();
      customer.id = customerId;

      jest.spyOn(customerRepository, 'findOneById').mockResolvedValue(customer);

      // Act
      const result = await service.getCustomerInfo(customerId);

      // Assert
      expect(result).toEqual(customer);
      expect(customerRepository.findOneById).toHaveBeenCalledWith(customerId);
    });
  });

  describe('newCustomer', () => {
   
    it('should throw NotFoundException if email exists', async () => {
      // Arrange
      const customerDTO = {
        documentTypeId: 'documentTypeId',
        document: 'document',
        fullName: 'fullName',
        email: 'email@example.com',
        phone: '1234567890',
        password: 'password',
      };

      jest.spyOn(customerRepository, 'existEmail').mockResolvedValue(true);

      // Act & Assert
      await expect(service.newCustomer(customerDTO)).rejects.toThrow(NotFoundException);
      expect(customerRepository.existEmail).toHaveBeenCalledWith('email@example.com');
    });
  });

  describe('updatedCustomer', () => {
    it('should update customer information', async () => {
      // Arrange
      const customerId = 'customerId';
      const customerUpdateDTO = {
        document: 'newDocument',
        fullName: 'newFullName',
        phone: 'newPhone',
        password: 'newPassword',
      };
      const existingCustomer = new CustomerEntity();
      existingCustomer.id = customerId;

      jest.spyOn(customerRepository, 'findOneById').mockResolvedValue(existingCustomer);
      jest.spyOn(customerRepository, 'update').mockResolvedValue(existingCustomer);

      // Act
      const result = await service.updatedCustomer(customerId, customerUpdateDTO);

      // Assert
      expect(result).toEqual(existingCustomer);
      expect(customerRepository.findOneById).toHaveBeenCalledWith(customerId);
      expect(customerRepository.update).toHaveBeenCalledWith(customerId, expect.objectContaining({ fullName: 'newFullName' }));
    })
    });
});