import React, { useEffect, useState } from 'react';

export const SecondsCountDown: React.FC<{seconds: number, downTo?: number, onFinish?: () => unknown}> = 
  ({ seconds, downTo = 1, onFinish }) =>  {
    const [curCount, setCount] = useState(seconds);
    useEffect(() => {
      const timer = setInterval(() => {
        if(curCount > downTo) {
          setCount((count) => count-1);
        } else {
          clearInterval(timer);
          onFinish?.();
        }
      }, 1000);
      return () => clearInterval(timer);
    });
    return <span>{curCount}</span>
}