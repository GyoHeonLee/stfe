import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";

const Rect = () => {
  const standardRef = useRef(null);

  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((target) => setOpacity(target.intersectionRatio));
      },
      {
        threshold: [
          0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
          0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
        ],
        rootMargin: "0px",
      }
    );
    if (standardRef.current) {
      observer.observe(standardRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [standardRef]);

  return (
    <RectWrapper ref={standardRef}>
      <span>{opacity}</span>
      <span>{opacity}</span>
    </RectWrapper>
  );
};

const RectWrapper = styled.div`
  background: tomato;
  width: 150px;
  height: 200px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  span {
  }
`;

export default Rect;
