import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from '../network/axiosConfig';

const Home = () => {
  const [url, setUrl] = useState('');
  const [customId, setCustomId] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [success, setSuccess] = useState(null);
  const [copied, setCopied] = useState(false);

  const createShortUrl = async () => {
    const postData = { url };
    if (customId) {
      postData.customId = customId;
    }

    const { data } = await axios.post('/api/links', postData);

    setUrl('');
    setShortUrl(
      `${window.location.protocol}//${window.location.host}/${data.link.urlIdentifier}`,
    );

    setSuccess(true);
  };

  const submit = (event) => {
    event.preventDefault();

    if (!url) {
      // eslint-disable-next-line no-alert
      alert('You need to enter a url.');
    } else {
      createShortUrl();
    }
  };

  return (
    <>
      <form className={success ? 'hidden' : ''}>
        <label htmlFor="url">
          Shorten it!
          <input
            type="url"
            name="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <label htmlFor="customId">
          Your custom id!
          <input
            type="text"
            name="customId"
            value={customId}
            onChange={(e) => setCustomId(e.target.value)}
          />
        </label>
        <button type="submit" onClick={(e) => submit(e)}>
          Shortify
        </button>
      </form>
      {shortUrl && (
        <div>
          <p>
            Your url:
            {shortUrl}
          </p>
          <CopyToClipboard
            text={shortUrl}
            onCopy={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 3000);
            }}
          >
            <button type="button">Copy Shorty</button>
          </CopyToClipboard>
          {copied && <span>Copied!</span>}
          <a href={shortUrl}>Check it out</a>
        </div>
      )}
    </>
  );
};

export default Home;
