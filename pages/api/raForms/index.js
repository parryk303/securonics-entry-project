import RaForm from '../../../models/RaForm';
import mongoose from 'mongoose';

const connection = {};

const dbconnect = async () => {
    if (connection.isConnected) {
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected)
  }

dbconnect();

const homeRoute = async (req, res) => {
  const { method } = req;

  switch(method) {
    case 'GET':
      try {
        const raForms = await RaForm.find({});
        res.status(200).json({ success: true, data: raForms })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      try {
        const raForm = await RaForm.create(req.body);
        res.status(201).json({ success: true, data: raForm })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break;
      default:
      res.status(400).json({ success: false })
      break;
  }
}

export default homeRoute;