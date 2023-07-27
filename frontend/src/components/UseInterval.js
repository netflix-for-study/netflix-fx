import { useEffect, useRef } from "react";

const UseInterval = (callbackfunc, delay) => {
  const saveCallbackfunc = useRef(callbackfunc);

  useEffect(() => {
    saveCallbackfunc.current = callbackfunc;
  });

  useEffect(() => {
    if (delay === null) return;

    const timer = setInterval(() => saveCallbackfunc.current(), delay);
    return () => clearInterval(timer);
  }, [delay]);
};

export default UseInterval;
