import dbconnect from '../../../utils/dbconnect';
import RaForm from '../../../models/RaForm';

dbconnect();

export default async (req, res) => {
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