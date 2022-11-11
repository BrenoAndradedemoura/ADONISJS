import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comentario from '../../Models/Comentario'
import ComentarioValidator from '../../Validators/ComentarioValidator'


export default class ComentariosController {

  public async index({ }: HttpContextContract) {
    const comentario = await Comentario.all()
    return comentario
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(ComentarioValidator)
    const comentario = await Comentario.create({ ...data })
    return comentario
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const comentario = await Comentario.findOrFail(params.id)
      return comentario
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
      comentario.save()
      return comentario
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
