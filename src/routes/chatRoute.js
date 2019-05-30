import RabbitQP from '../rabbitApi/sendApi';


export default class ChatControllerApi {
    static async getChats(req, res) {
        console.log(req.params)
        try{
            const users = await RabbitQP.handleEvent({ exchange: 'jobs', routingKey: '', content: { msg: 'Great this works', task: 'publish' }})
        }catch(error){}
        res.status(200).json({msg: 'This is successful'})
    }

    static async postChat(req, res) {
        const { body, method, url } = req;
        const payload = {
            exchange: body.exchange,
            routingKey: body.routingKey,
            content : {
                id: body.id,
                body: body.body,
                sendTo: body.sendTo,
                sentBy: body.from,
                task: body.task,
                method,
                url
            }
        }
        try{
            await RabbitQP.handleEvent(payload)
            res.status(201).json({ msg: 'Sent'})
        } catch(error) {
            res.status(404).json(error.message)
        }
    }
}