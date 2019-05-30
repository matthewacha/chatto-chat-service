import ChatControllerApi from './chatRoute';


export default (app) => {
    app.get('/chats', ChatControllerApi.getChats)
    app.post('/chat', ChatControllerApi.postChat)
}