import { useEffect, useRef } from 'react';

export const useMounted = () => {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return isMounted.current;
};
