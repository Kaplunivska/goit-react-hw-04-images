import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import css from './App.module.css';

const queryClient = new QueryClient();

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
    
  const searchHandler = value => {
    setSearchQuery(value);
  };

    return (
      <QueryClientProvider client={queryClient}>
      <div className={css.app}>
        <Searchbar onSubmit={searchHandler} />
        <ImageGallery searchQuery={searchQuery} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
    );
}