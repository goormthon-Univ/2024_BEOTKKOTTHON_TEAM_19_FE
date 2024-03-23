import { useCallback, useEffect, useRef } from "react";

const useIntersect = (onIntersect, options) => {
  // 타겟을 담을 ref
  const ref = useRef(null);

  // onIntersect가 변경될 때마다(새로 만들어질 때마다) 생성된다.
  const callback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, callback, ref]); // callback이 변경될 때마다 실행된다.

  return ref;
};

export default useIntersect;
