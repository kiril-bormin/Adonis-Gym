import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Coach from './coach.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime()
  declare startsAt: DateTime

  @column()
  declare duration: number

  @column()
  declare capacity: number

  // Relations avec d'autre tables
  @column()
  declare coachId: number // Clé étrangère

  @belongsTo(() => Coach)
  declare coach: BelongsTo<typeof Coach>

  @manyToMany(() => User, {
    pivotTable: 'bookings',
    pivotForeignKey: 'session_id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare participants: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
