import mongoose, {Document, Schema} from "mongoose";
import Auth from "../../domain/Auth";

interface AuthDocument extends Omit<Auth, 'id'>, Document {}

const UserSchema = new Schema<AuthDocument>({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    rol: {
        type: String,
        enum: ['Administrador', 'Investigador'],
        required: true
    },

    passwordResetCode: {
        type: String,
        required: false
    },
    passwordResetExpires: {
        type: Date,
        required: false
    }
  
});

const UserModel  = mongoose.model<AuthDocument>('Users',UserSchema );

export default UserModel;