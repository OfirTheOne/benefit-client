import { useState, useEffect } from 'react';

interface Size {
  width: number | undefined;
}

export const useMobileView = (): boolean | undefined => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width } = windowSize;
  return width ? width < 474 : undefined;
};