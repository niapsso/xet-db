import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public static schema = schema.create({
    nickname: schema.string({}, [
      rules.maxLength(30),
      rules.alphaNum({ allow: ["space"] }),
    ]),
    username: schema.string({}, [
      rules.maxLength(15),
      rules.alphaNum({ allow: ["underscore"] }),
      rules.unique({ table: "users", column: "username" }),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    profilePic: schema.string.optional(),
    password: schema.string({}, [rules.minLength(5), rules.maxLength(25)]),
  });

  public messages: CustomMessages = {};
}
