import dbconnect from '../../../utils/dbconnect';
import RaForm from '../../../models/RaForm';

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