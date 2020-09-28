import dbConnect from '../../../util/dbConnect.js';
import randomString from '../../../util/randomString';
import Link from '../../../models/Link';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      try {
        const links = await Link.find({});
        res.status(200).json({ success: true, links });
      } catch (error) {
        console.log('Error in GET', error);
        res.status(500).json({ success: false, error });
      }
      break;
    }
    case 'POST': {
      try {
        const { url, customId } = req.body;
        let urlIdentifier = customId ? customId : randomString();
        let exists = await Link.findOne({ urlIdentifier });

        while (exists && !customId) {
          urlIdentifier = randomString();
          exists = await Link.findOne({ urlIdentifier });
        }

        if (customId && customId.length > 6) {
          return res.status(400).json({
            success: false,
            error: 'Custom id cannot be longer than 6 characters.',
          });
        }

        if (exists && customId) {
          return res
            .status(400)
            .json({ success: false, error: 'Identifier already exists' });
        }

        const urlWithoutProtocol = url
          .replace(/^https?:/i, '')
          .replace(/^\/\//i, '');

        const created = await Link.create({
          originalUrl: urlWithoutProtocol,
          urlIdentifier,
        });
        res.status(201).json({ success: true, link: created });
      } catch (error) {
        console.log('Error in POST', error);
        res.status(500).json({ success: false, error });
      }
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
