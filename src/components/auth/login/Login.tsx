import {useContext} from 'react'
import { Typography } from "antd";
import { Form, Input, Button } from "antd";
import { Row, Col, Image, message } from "antd";
import "./login.scss";
import {NavLink, useNavigate} from 'react-router-dom'
import {Logincontext} from '../../../context/Context'

const { Title } = Typography;
const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const {acount, setAccount} = useContext<any>(Logincontext)

  

  return (
    <div className="loginContainer">
      <Row className="row_class" gutter={[40, 32]}>
        <Col span={12} className="col1">
          <Title level={2} className="title">
            Login
          </Title>
          <Form
            style={{ padding: "15px 0" }}
            form={form}
            layout="vertical"
            //Triggered When Form Submitted
            onFinish={(values) => {
              const get_email = localStorage.getItem(values.Email);
              if (get_email === null) {
                form.resetFields();
                message.error("Email Not Found!!!");
              } else {
                const email_obj = JSON.parse(get_email);
                if (email_obj.password === values.password) {
                  localStorage.setItem("auth", JSON.stringify(email_obj));
                  setAccount(true)
                  navigate('/home')
                } else {
                  form.resetFields(["password"]);
                  message.error("Password Doesn't Match!!!");
                }
              }
            }}
          >
            <Form.Item
              name="Email"
              label="Email Address:"
              // rules={[
              //   {
              //     required: true,
              //     message: "Email is required",
              //   },
              //   {
              //     type: "email",
              //     message: "Please Enter Valid Email",
              //   },
              //   {
              //     min: 3,
              //     message: "Name must be more than 3 Characters",
              //   },
              // ]}
              hasFeedback
            >
              <Input placeholder="Enter Your Email Id" />
            </Form.Item>

            <Form.Item
              label="Password:"
              name="password"
                // rules={[
                //   {
                //     required: true,
                //   },
                //   { min: 6, message: "Atleast 6 Characters Required" },
                //   {
                //     validator: (_, value) =>
                //       value &&
                //       /[A-Z]/.test(value) &&
                //       /[a-z]/.test(value) &&
                //       /[0-9]/.test(value) &&
                //       /[@#$%^&]/.test(value)
                //         ? Promise.resolve()
                //         : Promise.reject(
                //             "Note: Must use 1 capital, 1 small, 1 Numeric, 1 symbol"
                //           ),
                //   },
                // ]}
                hasFeedback
            >
              <Input.Password placeholder="Enter Password"></Input.Password>
            </Form.Item>
            {/* <Checkbox >Remember Me</Checkbox> */}
            <Form.Item className="btn">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Image width={500} src={"assets/login.jpg"} preview={false} />
          <Row>
            <Col span={24} offset={10} className="navigateCol">
              Don't have an Account
              <NavLink to="/signup"> SignUp </NavLink>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
