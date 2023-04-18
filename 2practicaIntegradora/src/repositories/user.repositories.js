const UserDTO = require("../dto/user.dto")

class UserRpositories { // UserServices
    constructor(dao){
        this.dao = dao
    }

    async getUsers(limit, page){
        try {
            return await this.dao.get(limit, page)            
        } catch (error) {
            return error
        }
    }

    async getUser(){}
    
    async createUser(newUser){
        try {
            let newUserNormalize = new UserDTO(newUser)
            let result = await this.dao.create(newUserNormalize)
            return result            
        } catch (error) {
            return error
        }
    }

    async updateUser(){}    
    async deleteUser(){}    
}

module.exports = UserRpositories
