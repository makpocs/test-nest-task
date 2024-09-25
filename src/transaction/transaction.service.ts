import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(
    account: Account,
    value: number,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      account,
      value,
    });
    return this.transactionRepository.save(transaction);
  }

  async getTransactionHistory(accountId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { account: { id: accountId } },
      order: { transactionDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }
}
