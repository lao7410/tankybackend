export class MessageManager {
    #messages
    constructor(){
        this.#messages = []
    }

    async getMessages () {
        return await MessageModel.find()
    }

    async addMessage (data) {
        const {user, message} = data
        return await MessageModel.create({user, message})
    }
}
export default MessageManager
