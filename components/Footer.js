import Github from '../assets/icons/github.svg';
import LinkedIn from '../assets/icons/linkedin.svg';
import Twitter from '../assets/icons/twitter.svg';
import DevTo from '../assets/icons/dev-badge.svg';

const Footer = () => {
  return (
    <footer style={FooterStyle}>
      <p>Copyright © 2020 by Robin Goudeketting</p>
      <div>
        <a
          style={LinkStyle}
          aria-label="Link to Robin's Github"
          href="https://github.com/GoudekettingRM"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github style={IconStyle} />
        </a>
        <a
          style={LinkStyle}
          aria-label="Link to Robin's LinkedIn"
          href="https://www.linkedin.com/in/robinmgoudeketting/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn style={IconStyle} />
        </a>
        <a
          style={LinkStyle}
          aria-label="Link to Robin's Twitter"
          href="https://twitter.com/RMGoudeketting"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter style={IconStyle} />
        </a>
        <a
          style={LinkStyle}
          aria-label="Link to Robin's Dev Profile"
          href="https://dev.to/goudekettingrm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DevTo style={IconStyle} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

const LinkStyle = {
  margin: '1rem',
};
const IconStyle = {
  height: '2rem',
  width: '2rem',
  margin: '0 1rem',
};
const FooterStyle = {
  marginBottom: '2rem',
};
