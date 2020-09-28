import dbConnect from '../../../util/dbConnect.js';
import Link from '../../../models/Link';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case 'GET': {
      try {
        const link = await Link.findOne({ urlIdentifier: id });
        if (!link) {
          return res.status(404).json({
            success: false,
            error: `There is no URL linked with the identifier ${id}.`,
          });
        }
        res.json({
          success: true,
          url: `//${link.originalUrl}`,
        });
      } catch (error) {}
      break;
    }
    default: {
      res.status(400).json({
        success: false,
        error: `Endpoint for ${method} does not exist.`,
      });
      break;
    }
  }
};
