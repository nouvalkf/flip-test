import {useEffect, useState} from 'react';

type TValue = string;
type TDelay = number;

export const useDebounce = (value: TValue, delay: TDelay) => {
  // State and setters for debounced value
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
};
