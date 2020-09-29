import dbConnect from '../../../util/dbConnect';
import randomString from '../../../util/randomString';
import Link from '../../../models/Link';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      try {
        const links = await Link.find({});
        return res.status(200).json({ success: true, links });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in GET', error);
        return res.status(500).json({ success: false, error });
      }
    }
    case 'POST': {
      try {
        const { url, customId } = req.body;
        let urlIdentifier = customId || randomString();
        let exists = await Link.findOne({ urlIdentifier });

        while (exists && !customId) {
          urlIdentifier = randomString();
          // eslint-disable-next-line no-await-in-loop
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
        return res.status(201).json({ success: true, link: created });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in POST', error);
        return res.status(500).json({ success: false, error });
      }
    }
    default: {
      return res.status(400).json({
        success: false,
        error: `Endpoint for ${method} does not exist.`,
      });
    }
  }
};
