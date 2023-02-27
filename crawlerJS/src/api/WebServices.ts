import axios from 'axios';

const fetchPage = async (url: string) => {
  const pageResponse = await axios.get(url, { responseEncoding: 'binary' });

  return pageResponse.data;
};

export { fetchPage };
