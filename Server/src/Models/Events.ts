import { DataTypes } from "sequelize";
import Connection from "./Connection";

const Events = Connection.define("Event", {
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
    },

    eventName: {
        type: DataTypes.STRING(100), 
        allowNull: false, 
    },

    description: {
        type: DataTypes.TEXT,
    },

    duration: {
        type: DataTypes.STRING(20), 
        allowNull: false
    }, 

    startDate: {
        type: DataTypes.STRING(20), 
        allowNull: false   
    }, 

    place: {
        type: DataTypes.ENUM("Discord", "InnovationLab", "Efrei"), 
        defaultValue: "InnovationLab"
    }
}, { timestamps: false });

export default Events;