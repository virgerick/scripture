import React, { useState, useEffect } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  useEffect(() => {
    window.onresize = updateSize;
  }, []);
  return size
}