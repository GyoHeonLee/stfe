import Head from "next/head";
import AppLayout from "../src/components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";
import useInput from "../src/hooks/useInput";
import { useCallback, useState } from "react";
import styled from "styled-components";

const Signup = () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) setTermError(true);

    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>Signup | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nickname">NICKNAME</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">PASSWORD</label>
          <br />
          <Input
            name="user-password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">PASSWORD-CHECK</label>
          <br />
          <Input
            name="user-password-check"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMessage>??????????????? ???????????? ????????????.</ErrorMessage>
          )}
          {termError && <ErrorMessage>????????? ??????????????? ?????????.</ErrorMessage>}
        </div>

        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            ????????? ?????? ??? ?????? ?????? ???????????????.
          </Checkbox>
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit">
            ????????????
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

const ErrorMessage = styled.div`
  color: red;
`;

export default Signup;
