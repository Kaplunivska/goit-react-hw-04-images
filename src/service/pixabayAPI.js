import axios from 'axios';

const IMAGE_PER_PAGE = 12;
const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '31910419-a0e9973305d8d11bbc959bfc7',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: IMAGE_PER_PAGE,
  },
});

export const getSearchedImages = async (query, page) => {
  const response = await axiosInstance.get('/', {
    params: {
      q: query,
      page: page,
    },
  });

  return { ...response.data, per_page: IMAGE_PER_PAGE };
};