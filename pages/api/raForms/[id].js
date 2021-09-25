import RaForm from '../../../models/RaForm';
import mongoose from 'mongoose';
import cors from 'cors';
cors()
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

const formRoute = async (req, res) => {
  const {
    query: { id },
    method
  } = req;

  switch(method) {
    case 'GET':
      try {
        const raForm = await RaForm.findById(id);
        if (!raForm) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: raForm })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'PUT':
    try {
      const raForm = await RaForm.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      if (!raForm) {
        return res.status(400).json({ success: false })
      }
      res.status(200).json({ success: true, data: raForm })
    } catch (error) {
      res.status(400).json({ success: false })
    }
    break;
    case 'DELETE':
      try {
        const deletedRaForm = await RaForm.deleteOne({ _id: id });
        if (!deletedRaForm) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
      default:
      res.status(400).json({ success: false })
      break;
  }
}

export default formRoute;