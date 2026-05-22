import mongoose from 'mongoose';

const MongoDb = async function () {
    mongoose.connection.on('connected', ()=>{
        console.log('Database Connected');
    });
    await mongoose.connect(`${process.env.DATABASE_URL}/auth`);

}

export default MongoDb;