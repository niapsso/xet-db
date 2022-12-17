import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import { v4 as uuid } from "uuid";

import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all();

    return users;
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const image = request.file("profilePic", {
        extnames: ["jpeg", "png"],
        size: "2mb",
      });

      if (image) {
        const imageName = `${uuid()}.${image.extname}`;

        await image.move(Application.tmpPath("uploads"), { name: imageName });

        request.body().profilePic = imageName;
      }

      const payload = await request.validate({
        schema: CreateUserValidator.schema,
        data: request.body(),
      });

      const user = await User.create(payload);

      return response.created(user);
    } catch (error) {
      console.log("error:", error);

      return response.badRequest(error.messages);
    }
  }

  public async show({}: HttpContextContract) {
    return {
      msg: "amostra!!",
    };
  }

  public async update({}: HttpContextContract) {
    return {
      msg: "atualiza!!",
    };
  }

  public async destroy({}: HttpContextContract) {
    return {
      msg: "deleta!!",
    };
  }
}
