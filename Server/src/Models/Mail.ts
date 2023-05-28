import Connection from "./Connection";
import { DataTypes } from "sequelize";

const Mail = Connection.define("Mail", {
    idMail: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
    },

    nameSender: {
        type: DataTypes.STRING,
        allowNull: false
    },

    mailSender: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content: {
        type: DataTypes.TEXT, 
        allowNull: false
    },

    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dateMail: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, { timestamps: false });

export default Mail;