import { Button, Form, Input } from "antd";
import { useState, useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (
    <Form>
      <div>
        <label htmlFor="user-id">ID</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">PASSWORD</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          LOGIN
        </Button>
        <Link href="/signup">
          <a>
            <Button>SIGNUP</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default LoginForm;
