
const mongoose= require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
    // console.log(err);
    console.log(err.name, err.message);
    console.log("uncaught exception occurred ! Shutting down...");
    process.exit(1);
})

const app = require('./apps');



mongoose.connect(process.env.CONN_STR, {
    // useNewUrlParser: true
}).then((conn) => {
    // console.log(conn);
    console.log('DB connection Successful');
})
    // .catch((err) => {
    // console.log("some error happen");
    // }
    // )
const port = process.env.PORT || 3000;
const server= app.listen(port, () => {
console.log('server is starting')
});


process.on('unhandledRejection', (err) => {

    console.log(err.name, err.message);
    console.log("unhandled rejection occurred ! Shutting down...");
    server.close();
    process.exit(1);
})