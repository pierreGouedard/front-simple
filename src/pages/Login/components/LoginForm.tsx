import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "@/modules/query/authentication"
import { ILoginParams } from "@/modules/query/common.d";
import Loader from '@/components/loader'
import '../login.css'


const LoginForm = ({ displayForm }) => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string; }) => {

    setFetching(true);
    const requestBody: ILoginParams = {
      username: values.username,
      password: values.password,
    };
    await login({ loginParams: requestBody }).finally(() => setFetching(false));
    navigate("/");
  };

  return (
      <Form
        form={form}
        name="login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Title style={{color: "#E9D758"}}>Please Login</Title>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            }
          ]}
          style={{outline: 0, outlineColor: "#E9D758", borderColor: "#E9D758", border: 2}}
        >
          <Input 
          style={{outline: 'none'}}
          prefix={<UserOutlined className="site-form-item-icon" />} 
          placeholder="Username" 
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="login-form-forgot">
          <Button  style={{color: "#E9D758"}}  type="link" onClick={() => displayForm(false)}>
            <p style={{textDecoration: "underline", textDecorationColor: "#E9D758"}} >Forgot password</p>
          </Button>
        </Form.Item>

        <Form.Item className="submit-wrapper">
          {fetching ? (
            <Loader />
          ) : (
            <Button style={{color: "#626364", background: "#E9D758", border: "#E9D758" }} htmlType="submit" className="login-form-button">
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
  );
};

export default LoginForm;
