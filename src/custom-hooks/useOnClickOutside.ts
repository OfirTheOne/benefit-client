import React, { MutableRefObject, RefObject, useEffect } from 'react';

interface UseOnClickOutsideParams {
  ref: RefObject<HTMLDivElement> | MutableRefObject<Element | null>;
  handler: (event: Event) => void;
  ignoredElements: string;
}

const useOnClickOutside = ({ ref, handler, ignoredElements }: UseOnClickOutsideParams): void => {
  useEffect(() => {
    const listener = (event: Event) => {
      event.stopPropagation();
      const target = event.target as HTMLElement;
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current ||  ref.current.contains(target as Node) || target.closest(ignoredElements)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener, true);
    document.addEventListener('touchstart', listener, true);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  },
  [ref, handler, ignoredElements]
  );
};


export default useOnClickOutside;
