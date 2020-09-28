import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '../network/axiosConfig';

const Redirect = ({ urlId }) => {
  const router = useRouter();
  useEffect(async () => {
    const fetchRedirect = async () => {
      const { data } = await axios.get(`/api/links/${urlId}`);
      router.push(data.url);
    };
    fetchRedirect();
    try {
    } catch (error) {
      console.error(error);
    }
  }, []);
  return <div>Loading...</div>;
};

export const getStaticPaths = async () => {
  const {
    data: { links },
  } = await axios.get('/api/links');

  const paths = links.map((link) => `/${link.urlIdentifier}`);
  return { paths, fallback: true };
};

export const getStaticProps = ({ params }) => {
  return { props: { urlId: params.urlId } };
};

export default Redirect;
