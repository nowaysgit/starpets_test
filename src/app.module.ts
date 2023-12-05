import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { IDatabase } from './common/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { MigrationsModule } from './modules/migrations/migrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env${process.env.NODE_ENV === 'development' ? '.development' : ''}`],
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<IDatabase>('database');
        return {
          dialect: 'postgres',
          host: config.postgres.host,
          port: config.postgres.port,
          username: config.postgres.username,
          password: config.postgres.password,
          database: config.postgres.database,
          autoLoadModels: true,
          synchronize: false, //use Migrations module
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    MigrationsModule,
  ],
})
export class AppModule {}
