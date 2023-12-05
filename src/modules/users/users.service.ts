import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UpdateBalanceDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  public async getAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  public async updateBalance(dto: UpdateBalanceDto): Promise<number> {
    return await this.sequelize.transaction(async t => {
      const candidate = await this.userModel.findOne({ where: { id: dto.userId }, transaction: t });
      if (!candidate) {
        throw new BadRequestException('user not found');
      }
      candidate.balance = Number(candidate.balance); // decimal string to number
      if (dto.amount < 0 && candidate.balance + dto.amount < 0) {
        throw new BadRequestException('not enough balance');
      }
      await this.userModel.update(
        { balance: candidate.balance + dto.amount },
        { where: { id: dto.userId }, transaction: t },
      );
      const result = await this.userModel.findOne({ where: { id: dto.userId }, transaction: t });
      return result.balance;
    });
  }
}
