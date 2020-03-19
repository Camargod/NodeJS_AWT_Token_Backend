const {Router} = require('express');
const devService = require('../src/services/devsService');
const userService = require('../src/services/userService')
const routes = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('./config/auth')

// routes.get("/devs", async(req,resp)=>
// {
//     let res = await devService.listDevs();
//     resp.json(res);
// });

// routes.post("/devs/:githubuser", async(req,resp)=>
// {
//     console.log({"Corpo da requisição":req.body});
//     let res = await devService.saveUser(req.params.githubuser, req.body.techs,req.body.location);
//     resp.json(res);
// });

routes.post("/user/save", async(req,resp)=>
{
    let body = req.body;
    let res = await userService.saveUser(body,resp);
    res.pwd = undefined;
    return resp.status(200).json(res);
});

routes.post("/user", async(req,resp)=>
{
    let body = req.body;
    let res = await userService.getUser(body);
    
    if(!res.name)
    {
        return resp.status(400).send({error:'User not found'});
    }
    if(!await bcrypt.compare(body.pwd, res.pwd))
    {
        return resp.status(400).send({error:'Invalid Password'});
    }
    res.pwd = undefined;

    const token = jwt.sign({id:res.id},authConfig.secretMD5,
    {
        expiresIn: 84600
    })
    res.token = token;

    return resp.status(200).json(res);
});

module.exports = routes;