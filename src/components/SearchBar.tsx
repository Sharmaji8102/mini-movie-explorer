import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface Props {
  onDebouncedSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onDebouncedSearch }) => {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500); // delay

  useEffect(() => {
    if (debouncedInput.length >= 3) {
      onDebouncedSearch(debouncedInput);
    }
  }, [debouncedInput, onDebouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default SearchBar;
