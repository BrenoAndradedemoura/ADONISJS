import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import authConfig from '../../../config/auth'
import Comentario from '../../Models/Comentario'
import ComentarioValidator from '../../Validators/ComentarioValidator'


export default class ComentariosController {

  public async index({ }: HttpContextContract) {
    const Comentario = await Message.query().preload('user').orderBy('id')
    return Comentario
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(MessageValidator)
    const Comentario = await Message.create({ ...data, userId: auth.user?.id })
    return Comentario
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const Comentario = await Message.findOrFail(params.id)
      return comentariosController
    } catch (error) {
      response.status(400).send("Mensagem não encontrada!!!")
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { title, comentario } = await request.validate(MessageValidator)
    try {
      const comentario = await Message.findOrFail(params.id)
      comentario.title = title
      comentario.Message = Message
    } catch (error) {
      response.status(400).send("Mensagem não encontrada!!!")
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const comentario = await Message.findOrFail(params.id)
      await comentario.delete()
      return comentario
    } catch (error) {
      response.status(400).send("Mensagem não encontrada!!!")
    }
  }
}
