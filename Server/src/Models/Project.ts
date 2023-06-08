import { DataTypes } from "sequelize";
import Connection from "./Connection";

const Project = Connection.define("Project", {
    projectId: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
    },

    projectName: {
        type: DataTypes.STRING(30), 
        allowNull: false, 
        unique: true
    }, 

    projectAdvancement: {
        type: DataTypes.FLOAT, 
        allowNull: false, 
        validate: { min: 0, max: 5 }
    },

    projectDescription: {
        type: DataTypes.TEXT, 
        allowNull: false, 
    },

    deadline: {
        type: DataTypes.STRING(20), 
        allowNull: true, 
    }, 

    imageLocalization: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },

    messageProject: {
        type: DataTypes.STRING(20),
        allowNull: false
    }, 

    ghRepo: {
        type: DataTypes.STRING, 
        validate: { isUrl: true }
    }
}, { timestamps: false });

export default Project;