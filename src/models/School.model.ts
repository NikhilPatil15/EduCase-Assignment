import { DataTypes } from "sequelize";
import { connectDatabase } from "../Database/dbConnection";


export const SchoolModel = async() => {

    const db:any = await connectDatabase()

    const School = db.define("School",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false,
            
        },
        latitude:{
            type:DataTypes.FLOAT,
            allowNull:false,
            validate:{
                min:-90,
                max:90
            }
        },
        longitude:{
            type:DataTypes.FLOAT,
            allowNull:false,
            validate:{
                min:-180,
                max:180
            }
        }
    }) 




   return School
}

