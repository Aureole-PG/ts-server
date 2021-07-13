import {DataTypes} from 'sequelize';
import { db } from '../db/connection';

const User: any  = db.define('users',{
    name: {
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    state:{
        type: DataTypes.TINYINT
    }
})

export {User}