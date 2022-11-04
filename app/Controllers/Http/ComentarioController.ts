import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import authConfig from '../../../config/auth'
import Comentario from '../../Models/Comentario'
import ComentarioValidator from '../../Validators/ComentarioValidator'


export default class ComentariosController {

  public async index({ }: HttpContextContract) {
    const comentario = await.query().preload('user').orderBy('id')
    return Comentario
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(ComentarioValidator)
    const comentario = await Comentario.create({ ...data, userId: auth.user?.id })
    return Comentario
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const comentario = await Comentario.findOrFail(params.id)
      return ComentariosController
    } catch (error) {
      response.status(400).send("Mensagem não encontrada!!!")
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { name, comentarios, data } = await request.validate(ComentarioValidator)
    try {
      const comentario = await Comentario.findOrFail(params.id)
      comentario.name = name
      comentario.comentarios = comentarios
      comentario.data = data
    } catch (error) {
      response.status(400).send("Mensagem não encontrada!!!")
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const comentario = await Comentario.findOrFail(params.id)
      await comentario.delete()
      return comentario
    } catch (error) {
      response.status(400).send("Mensagem não encontrada!!!")
    }
  }
}
