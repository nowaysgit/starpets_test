import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';

@Injectable()
export class MigrationsService implements OnModuleInit {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  private umzug: Umzug;

  async onModuleInit() {
    this.umzug = new Umzug({
      migrations: { glob: 'src/migrations/*.{ts,js}' },
      context: this.sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize: this.sequelize }),
      logger: console,
    });

    try {
      await this.umzug.up();
    } catch (error) {
      console.error('Migrations up', error);
    }
  }
}
