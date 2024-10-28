import { Model, DataTypes } from "sequelize";
import Auth from "../../domain/Auth";
import sequelize_conection from "../../../Database/ConectionDatabase";

class UserModel extends Model <Auth> implements Auth {
    id!: string;
    email!: string;
    password!: string;
    name!: string;
    rol!: "Administrador" | "Investigador";
}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
     name: {
        type: DataTypes.STRING(50),
        allowNull: false
     },
     password: {
        type: DataTypes.STRING,
        allowNull: false
     },
     rol: {
        type: DataTypes.ENUM,
        values: ['Administrador', 'Investigador']
     }
},{
    tableName: 'users',
    timestamps: false,
    sequelize: sequelize_conection
})



export default UserModel;