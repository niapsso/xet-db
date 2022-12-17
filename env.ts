import Env from "@ioc:Adonis/Core/Env";

export default Env.rules({
  HOST: Env.schema.string({ format: "host" }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(["local"] as const),
  NODE_ENV: Env.schema.enum(["development", "production", "test"] as const),
  POSTGRES_HOST: Env.schema.string({ format: "host" }),
  POSTGRES_PORT: Env.schema.number(),
  POSTGRES_USER: Env.schema.string(),
  POSTGRES_PASSWORD: Env.schema.string.optional(),
  POSTGRES_DB: Env.schema.string(),
});
