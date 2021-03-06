import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const standardRef = useRef(null);

  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((target) => setOpacity(target.intersectionRatio));
      },
      {
        threshold: 0,
        rootMargin: "-100px 0px 0px 0px",
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
    <HeaderWrapper opacity={opacity}>
      <header>This Is Header</header>
      <div ref={standardRef} />
      <span>{opacity}</span>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  background: tomato;
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  div {
    width: 100%;
    height: 400px;
    position: absolute;
    top: 0;
    background-image: url(https://images.theconversation.com/files/443350/original/file-20220131-15-1ndq1m6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C3354%2C2464&q=45&auto=format&w=926&fit=clip);
    object-fit: cover;
  }
  header {
    transition: all 0.3s ease-in-out;
    z-index: 1;
    background: ${(props) =>
      props.opacity === 0 ? `cornflowerblue` : `tranparent`};
    border: 3px solid cornflowerblue;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    position: sticky;
    top: 0%;
  }
`;

export default Header;
