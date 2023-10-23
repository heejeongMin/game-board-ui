import { Button, Checkbox, Form, Input, Layout, Menu } from "antd";
import { loginAPI } from '../service/UserService';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Content, Footer, Header } from "antd/es/layout/layout";


const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();


  const onFinish = async (values: any) => {
    loginAPI(values).then((response) => {
      navigate("/")
    })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onSubmit = async (values: any) => {
    console.log("onSubmit");
  }

  return (
    <Layout style={{ height: "100%" }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
        />
      </Header>
      <Layout>
        <Content
          style={{
            padding: '0 50px',
          }}
        >
          <div className="Login"
            style={{
              padding: 24,
              minHeight: 380,
            }}
          >
            <div>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  // label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}

                >
                  <Input placeholder="username"
                    style={{
                      minWidth: "300px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  // label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="password"
                    style={{
                      minWidth: "300px",
                    }}

                  />
                </Form.Item>



                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Content>
      </Layout>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Pancho World @2023 created by Pancho Corp.
      </Footer>
    </Layout >


  );
};

export default Login;
