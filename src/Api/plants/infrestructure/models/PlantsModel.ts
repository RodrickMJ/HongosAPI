import mongoose, {Document, ObjectId, Schema} from "mongoose";
import IPlants from "../../domain/Plants";

interface plantsDocument extends Omit<IPlants, 'id'>, Document{
    readinds: Array<ObjectId>
}

const PlantsSchema = new Schema <plantsDocument>({
    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    registration_date: {
        type: Date,
        default: Date.now
    },

    readinds: [{
        type:   Schema.Types.ObjectId,
        ref: 'Readings'
    }]
    
});

const PlantsModel = mongoose.model<plantsDocument>('Plants', PlantsSchema);

export default PlantsModel;