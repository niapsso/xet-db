import Hash from "@ioc:Adonis/Core/Hash";
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";
import DirectMessage from "./DirectMessage";

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true;

  @hasMany(() => DirectMessage, {
    foreignKey: "senderId",
    serializeAs: null,
  })
  public myDms: HasMany<typeof DirectMessage>;

  @hasMany(() => DirectMessage, {
    foreignKey: "receiverId",
    serializeAs: null,
  })
  public dms: HasMany<typeof DirectMessage>;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public nickname: string;

  @column()
  public username: string;

  @column()
  public email: string;

  @column()
  public profilePic: string;

  @column({ serializeAs: null })
  public password: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid();
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
