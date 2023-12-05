import { Body, Controller, Get, HttpCode, HttpStatus, Ip, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { UpdateBalanceDto } from './dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    type: [User],
    status: HttpStatus.OK,
    description: 'OK',
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Change user balance by amount' })
  @ApiResponse({
    type: Number,
    status: HttpStatus.OK,
    description: 'OK',
  })
  @Post('balance')
  @HttpCode(HttpStatus.OK)
  updateBalance(@Body() dto: UpdateBalanceDto): Promise<number> {
    return this.service.updateBalance(dto);
  }
}
