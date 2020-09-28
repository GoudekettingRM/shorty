import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from '../network/axiosConfig';

const Home = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const createShortUrl = async (event) => {
    event.preventDefault();

    if (!url) {
      alert('You need to enter a url.');
      return null;
    }

    const { data } = await axios.post('/api/links', {
      url,
    });

    setUrl('');
    setShortUrl(
      `${window.location.protocol}//${window.location.host}/${data.link.urlIdentifier}`,
    );
  };

  return (
    <>
      <form>
        <label htmlFor="url">Shorten it!</label>
        <input
          type="url"
          name="url"
          required
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <button type="submit" onClick={(e) => createShortUrl(e)}>
          Shortify
        </button>
      </form>
      {shortUrl && (
        <div>
          <p>Your url: {shortUrl}</p>
          <CopyToClipboard
            text={shortUrl}
            onCopy={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 3000);
            }}>
            <button>Copy Shorty</button>
          </CopyToClipboard>
          {copied && <span>Copied!</span>}
          <a href={shortUrl}>Check it out</a>
        </div>
      )}
    </>
  );
};

export default Home;
