import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table
        .integer('coach_id')
        .unsigned()
        .references('id')
        .inTable('coaches')
        .onDelete('CASCADE')
        .notNullable()
      table.dateTime('starts_at').notNullable()
      table.integer('duration').notNullable()
      table.integer('capacity').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
