const UserRepository = require("../repository/userRepository")

class UserService
{
    async getUser(user)
    {
        try
        {
            let devs = await UserRepository.getUser(user);
            return devs;
        }
        catch(err)
        {
            throw err;
        }
    }
    async saveUser(user, resp)
    {
        try
        {
            let userValidation = await UserRepository.getUser(user);
            
            if(userValidation)
            {
                return resp.status(400).send({error:'User already exists'});
            }

            let devs = await UserRepository.saveUser(user);
            return devs;
        }
        catch(err)
        {
            throw err;
        }
    }
}

module.exports = UserService.prototype;