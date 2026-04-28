import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Session from './session.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Coach extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare name: string

  @column()
  declare specialty: string

  // hasMany sessions
  @hasMany(() => Session)
  declare sessions: HasMany<typeof Session>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
