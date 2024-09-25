import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  async getBalance(accountId: string): Promise<number> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) throw new NotFoundException('Account not found');
    return account.balance;
  }

  async deposit(accountId: string, depositDto: DepositDto): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) throw new NotFoundException('Account not found');

    account.balance += depositDto.value;
    return this.accountRepository.save(account);
  }

  async withdraw(
    accountId: string,
    withdrawDto: WithdrawDto,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) throw new NotFoundException('Account not found');

    if (
      account.balance < withdrawDto.value ||
      withdrawDto.value > account.dailyWithdrawalLimit
    ) {
      throw new BadRequestException(
        'Insufficient funds or withdrawal limit exceeded',
      );
    }

    account.balance -= withdrawDto.value;
    return this.accountRepository.save(account);
  }

  async block(accountId: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) throw new NotFoundException('Account not found');

    account.active = false;
    return this.accountRepository.save(account);
  }
}
