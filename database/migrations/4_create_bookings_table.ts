import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('session_id')
        .unsigned()
        .references('id')
        .inTable('sessions')
        .onDelete('CASCADE')

      table.unique(['user_id', 'session_id']) // Un utilisateur peut réserver la même session qu'une seule fois

      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
