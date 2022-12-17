import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "direct_messages";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id", { primaryKey: true });

      table.text("content");

      table
        .uuid("sender_id")
        .unsigned()
        .nullable()
        .references("users.id")
        .onDelete("SET NULL");

      table
        .uuid("receiver_id")
        .unsigned()
        .nullable()
        .references("users.id")
        .onDelete("SET NULL");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
