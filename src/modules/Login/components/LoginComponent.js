import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import loginServices from "../services/login.services";
import "../style.css";

function Login({ props }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form] = Form.useForm();

  const handleLogin = (data) => {
    setMessage("");
    setLoading(true);
    loginServices.login(data).then(
      () => {
        form.resetFields();
        window.location.reload();
        props.history.push("/");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="container login-container">
      <h1 className="login-header">Log In</h1>

      <div className="login-form">
        <Form form={form} onFinish={handleLogin} autoComplete="off">
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <Form.Item
            name={"email"}
            label="Email"
            style={{ display: "block" }}
            rules={[
              {
                type: "email",
                message: "Please enter a valid email",
              },
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="login-submit-container">
            <Form.Item className="login-submit">
              <Button type="secondry" htmlType="submit" size="large" disabled={loading}>
                Log In
              </Button>
            </Form.Item>
            <Link to="/register">
              <small>Don't have an account?</small>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
