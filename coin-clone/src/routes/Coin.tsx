import styled from "styled-components";
import { useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
interface Params {
  coinId: string;
}
interface RouteState {
  name: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [price, setPrice] = useState({});
  const { coinId } = useParams<Params>();
  const { state } = useLocation<RouteState>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null};
    </Container>
  );
}

export default Coin;