import {  Sequelize } from 'sequelize';
import * as dotenv from 'dotenv'
dotenv.config()

const env_property_as_number = (env_property : string | undefined) : number  => {
    if(typeof env_property === "undefined")
       throw new Error("Env property not defined")
    else{
        return Number(env_property)
    }
}

const env_property_as_string = (env_property : string | undefined) : string => {
    if(typeof env_property === "undefined")
      throw new Error("Env property not defined")
    else 
      return env_property
}

const host = process.env.DB_HOST
const db_name  =  env_property_as_string(process.env.DB_NAME)
const user_name = env_property_as_string (process.env.DB_USERNAME)
const password = process.env.DB_PASSWORD
const port = env_property_as_number(process.env.DB_PORT)

const sequelizeconnection = new Sequelize(db_name,user_name , password, {
    host,
    dialect : "postgres",
    port
});

const testandsync = async () => {
    try {
        await sequelizeconnection.authenticate()
        console.log("The connection made succesfully")
        await sequelizeconnection.sync({alter : true})
        console.log("data synced")
    }
    catch(err : any){
        console.log(err)
    }
}

export  {sequelizeconnection , testandsync as testconnection}
