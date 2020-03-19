const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name:String,
    pwd:
    {
        type:String,
        required:true,
        select:false
    }
});

schema.pre('save', async function(next)
{
    try
    {
        const hash = await bcrypt.hash(this.pwd,10);
        this.pwd = hash;
        next();
    }
    catch(err)
    {
        throw err;
    }
    
})
module.exports = mongoose.model('users', schema);