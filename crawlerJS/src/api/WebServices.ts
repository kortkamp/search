import axios from 'axios';

const fetchPage = async (url: string) => {
  const pageResponse = await axios.get(url, { responseEncoding: 'utf8' });
  return pageResponse.data;
};

export { fetchPage };
