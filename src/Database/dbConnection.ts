
import { Sequelize } from "sequelize";

export const connectDatabase = async()=>{
    try {
        const db = new Sequelize({
            dialect:'mysql',
            host:process.env.DB_HOST,
            username:process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,   
            database:process.env.DB_NAME
        })

        await db.authenticate()

        console.log("MYSQL connected successfully!")

        await db.sync()

        return db   
    } catch (error) {
        console.log("Something went wrong while connecting to the Database: ", error)
    }
}