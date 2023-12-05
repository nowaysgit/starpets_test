export interface IApp {
  port: number;
}

export interface IDatabase {
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}

export interface IConfiguration {
  app: IApp;
  database: IDatabase;
}

export default (): IConfiguration => ({
  app: {
    port: Number.parseInt(process.env.APP_PORT) || 3000,
  },
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: Number.parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    },
  },
});
