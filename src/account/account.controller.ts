import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Account } from './entities/account.entity';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый аккаунт' })
  @ApiResponse({ status: 201, description: 'Аккаунт создан', type: Account })
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get(':id/balance')
  @ApiOperation({ summary: 'Получить баланс аккаунта' })
  @ApiResponse({
    status: 200,
    description: 'Текущий баланс аккаунта',
    type: Number,
  })
  getBalance(@Param('id') id: string) {
    return this.accountService.getBalance(id);
  }

  @Post(':id/deposit')
  @ApiOperation({ summary: 'Пополнить счет' })
  @ApiResponse({ status: 201, description: 'Счет пополнен', type: Account })
  deposit(@Param('id') id: string, @Body() depositDto: DepositDto) {
    return this.accountService.deposit(id, depositDto);
  }

  @Post(':id/withdraw')
  @ApiOperation({ summary: 'Снять средства со счета' })
  @ApiResponse({ status: 201, description: 'Средства сняты', type: Account })
  withdraw(@Param('id') id: string, @Body() withdrawDto: WithdrawDto) {
    return this.accountService.withdraw(id, withdrawDto);
  }

  @Post(':id/block')
  @ApiOperation({ summary: 'Заблокировать аккаунт' })
  @ApiResponse({
    status: 200,
    description: 'Аккаунт заблокирован',
    type: Account,
  })
  block(@Param('id') id: string) {
    return this.accountService.block(id);
  }
}
