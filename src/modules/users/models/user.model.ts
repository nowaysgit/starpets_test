import { ApiResponseProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ timestamps: false, modelName: 'users' })
export class User extends Model {
  @ApiResponseProperty({ type: Number })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiResponseProperty({ type: Number })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    defaultValue: 0,
  })
  balance: number;
}
