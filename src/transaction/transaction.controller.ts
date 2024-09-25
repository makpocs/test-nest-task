import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from 'typeorm';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':accountId')
  @ApiOperation({ summary: 'Получить историю транзакций для аккаунта' })
  @ApiResponse({
    status: 200,
    description: 'История транзакций получена',
    type: [Transaction],
  })
  getTransactionHistory(@Param('accountId') accountId: string) {
    return this.transactionService.getTransactionHistory(accountId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить транзакцию по ID' })
  @ApiResponse({
    status: 200,
    description: 'Транзакция найдена',
    type: Transaction,
  })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
