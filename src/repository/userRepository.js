const userMongoose = require("../entities/userMongoose");

class UserRepository
{
    async getUser(user)
    {
        let {name,pwd} = user;
        return await userMongoose.findOne({name}).select('+pwd').lean().exec().catch((err)=>{return err});
    }
    async saveUser(user)
    {
        return await userMongoose.create(user).catch((err)=>{return err});
    }
}

module.exports = UserRepository.prototype;

