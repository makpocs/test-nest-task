import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './entities/client.entity';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Создать нового клиента' })
  @ApiResponse({ status: 201, description: 'Клиент создан', type: Client })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить клиента по ID' })
  @ApiResponse({ status: 200, description: 'Клиент найден', type: Client })
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех клиентов' })
  @ApiResponse({ status: 200, description: 'Список клиентов', type: [Client] })
  findAll() {
    return this.clientService.findAll();
  }
}
