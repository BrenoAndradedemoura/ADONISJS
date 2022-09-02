import { DateTime } from 'luxon'
import {
   BaseModel,column
} from '@ioc:Adonis/Lucid/Orm'
import Server from '@ioc:Adonis/Core/Server'


export default class Comentario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public comentario: string

  @column()
  public data: Date


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
}
 Server.middleware.registerNamed({
   auth: () => import('App/Middleware/Auth')
 })
 
