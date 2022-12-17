import Env from "@ioc:Adonis/Core/Env";
import { DatabaseConfig } from "@ioc:Adonis/Lucid/Database";

const databaseConfig: DatabaseConfig = {
  connection: Env.get("DB_CONNECTION"),
  connections: {
    pg: {
      client: "pg",
      connection: {
        host: Env.get("POSTGRES_HOST"),
        port: Env.get("POSTGRES_PORT"),
        user: Env.get("POSTGRES_USER"),
        password: Env.get("POSTGRES_PASSWORD", ""),
        database: Env.get("POSTGRES_DB"),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
};

export default databaseConfig;
