import { DateTime } from "luxon";
import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";

export default class DirectMessage extends BaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public content: string;

  @column()
  public senderId: string;

  @column()
  public receiverId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(directMessage: DirectMessage) {
    directMessage.id = uuid();
  }
}
