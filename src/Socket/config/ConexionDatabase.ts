import mongoose from "mongoose";
import 'dotenv/config';

const MONGODB_HOST = process.env['MONGODB_HOST'] || '44.221.253.147';
const PORT_DATABASE = process.env['PORT_DATABASE'] || '27017';
const MONGODB_DATABASE = process.env['NAME_DATABASE'] || 'HongosHD';

// Componer la URL de conexión
const MongoUrl = `mongodb://${MONGODB_HOST}:${PORT_DATABASE}/${MONGODB_DATABASE}`;

export default async function connectToDatabase() {
    try {
        // Añadir un log detallado para ver la URL de conexión
        console.log(`Conectando a MongoDB en: ${MongoUrl}`);

        // Intentar conectar con tiempos de espera aumentados
        await mongoose.connect(MongoUrl, {
            connectTimeoutMS: 30000,  // 30 segundos para la conexión
            socketTimeoutMS: 30000    // 30 segundos para operaciones de socket
        });

        // Si la conexión es exitosa, loguea el mensaje
        console.log('Conexión exitosa a la base de datos');
        
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        handleDatabaseError(error);  // Llamar a la función de manejo de errores
    }
}

// Manejo de errores más detallado según el tipo de error de Mongoose
function handleDatabaseError(error: unknown): void {
    if (error instanceof mongoose.Error) {
        switch (error.name) {
            case 'MongoNetworkError':
                console.error('Error de red: no se puede alcanzar el servidor de MongoDB. Verifica la conexión.');
                break;
            case 'MongooseServerSelectionError':
                console.error('Error de selección de servidor: no se puede conectar al servidor de MongoDB especificado.');
                break;
            default:
                console.error(`Error de Mongoose: ${error.message}`);
                break;
        }
    } else {
        console.error('Ocurrió un error desconocido al intentar conectar a la base de datos.');
    }
}
