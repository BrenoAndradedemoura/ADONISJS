// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comentario from "../../Models/Comentario"

export default class ComentariosController {

    public async index({ }: HttpContextContract) {
        const topic = await Comentario.query().preload('user').orderBy('id')
        return topic
      }
    
      public async store({ request, auth }: HttpContextContract) {
        const data = await request.validate(comentariosdvcdvdValidator)
        const topic = await Comentario.create({ ...data, userId: auth.user?.id })
        return topic
      }
    
      public async show({ params, response }: HttpContextContract) {
        try {
          const topic = await comentario.findOrFail(params.id)
          return topic
        } catch (error) {
          response.status(400).send("Mensagem não encontrada!!!")
        }
      }
    
      public async update({ request, params, response }: HttpContextContract) {
        const { title, comentario } = await request.validate(comentariosvalidator)
        try {
          const topic = await comentario.findOrFail(params.id)
          topic.title = title
          topic.comentario = Comentario
          await topic.save()
          return topic
    
        } catch (error) {
          response.status(400).send("Mensagem não encontrada!!!")
        }
      }
    
      public async destroy({ params, response }: HttpContextContract) {
        try {
          const topic = await Comentario.findOrFail(params.id)
          await topic.delete()
          return topic
        } catch (error) {
          response.status(400).send("Mensagem não encontrada!!!")
        }
      }
    }
