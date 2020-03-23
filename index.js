const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./src/routes");
const cors = require("cors");
const authConfig = require('./src/config/auth')

mongoose.connect(`mongodb+srv://creeplays:${authConfig.mongodbPwd}@omnistack10-bkvir.mongodb.net/AutenticationTest?retryWrites=true&w=majority`,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(console.log("--- Mongoose Conectado ---"));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(1234);
