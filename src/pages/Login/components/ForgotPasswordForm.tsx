import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";


const ForgotPasswordForm = ({ displayForm }) => {
  const { Title } = Typography;
  const [fetching, setFetching] = useState(false);

  const onFinish = (values) => {
    setFetching(true);
    console.log('reset_password')
    setFetching(false);
  };

  return (
    <>
      <Form name="reset-password" className="login-form" onFinish={onFinish}>
        <Title style={{color: "#E9D758"}}>Fill in your email</Title>
        <p style={{color: "#E9D758"}}>You will receive a link to update your password</p>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email address",
            },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item className="display-form">
          <Button style={{color: "#E9D758"}} type="link" className="login-form-forgot" onClick={() => displayForm(true)}>
            <p style={{textDecoration: "underline", textDecorationColor: "#E9D758"}} >Back to login form </p>
          </Button>
        </Form.Item>

        <Form.Item className="submit-wrapper">
          {fetching ? (
            <p>Loading...</p>
          ) : (
            <Button style={{color: "#626364", background: "#E9D758"}} type="primary" htmlType="submit" className="login-form-button">
              Reset password
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
