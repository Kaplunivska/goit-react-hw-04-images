import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchedImages } from 'service/pixabayAPI';

export const useImageSearch = searchQuery => {
  const response = useInfiniteQuery({
    queryKey: ['search-image', searchQuery],
    queryFn: ({ pageParam = 1 }) => getSearchedImages(searchQuery, pageParam),
    enabled: searchQuery.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (_lastPage, pages) => {
      const firstPage = pages[0];
      if (pages.length < Math.ceil(firstPage.totalHits / firstPage.per_page)) {
        return pages.length + 1;
      }
    },
    select: data =>
      data.pages.reduce((acc, page) => [...acc, ...page.hits], []),
  });

  return response;
};
