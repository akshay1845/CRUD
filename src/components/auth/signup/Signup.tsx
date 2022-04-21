import { DatePicker, message, Modal, Typography } from "antd";
import { Form, Input, Button } from "antd";
import { Row, Col, Image, Radio } from "antd";
import { Select } from "antd";
import "./signup.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Checkbox from "antd/lib/checkbox/Checkbox";
import moment from "moment";
import * as EmailValidator from 'email-validator';

const { Option } = Select;
const { Password } = Input;
const { Title } = Typography;
const { RangePicker } = DatePicker;

const Signup = () => {
  const [form] = Form.useForm();
  const navigation = useNavigate();
  

  //BirthDate
  function disabledDate(current :any) {  
    return current < moment("YYYY") || current > moment().subtract(18, 'year');
}

const terms = ()=>{
  Modal.info({
    title:"Terms & Conditions",
    content:(
      <div>
        Agree Our Terms & Conditions, This is about our policy.<br/>
        If you are not accepting our policy, you can't Register!!!
      </div>
    )
  })
}



  return (
    <div className="signupContainer">
      <Row
        className="rowFormClass"
        // style={{ width: "fit-content", margin: "auto" }}
        // gutter={[40, 32]}
      >
        <div className="left">
        <Col span={12} className="formColumn">
          <Title level={2} className="title">
            Registration
          </Title>

          <Form
            autoComplete="off"
            style={{ padding: "15px 0" }}
            form={form}
            layout="vertical"
            onFinish={(values) => {
              if (localStorage.getItem(values.Email) === null) {
                localStorage.setItem(values.Email, JSON.stringify(values));
                form.resetFields();
                navigation("/");
              } else {
                form.resetFields(["Email"]);
                message.error("Email is Already Exist!!!");
              }
            }}
          >
            <Form.Item
              name="Name"
              label="Name:"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
                {
                  pattern: /^[A-Za-z]{3,29}$/,
                  message: "Name must be more than 3 Characters and not <br />Contain any Numeric Values",
                },
              ]}
              hasFeedback
            >
              <Input type={"text"} placeholder="Enter Your Name" />
            </Form.Item>

            <Form.Item
              name="Email"
              label="Email Address:"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  validator: (_, value) => 
                  value && 
                  EmailValidator.validate(value) ? 
                  Promise.resolve() :
                  Promise.reject("Please Enter Valid Email")
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter Your Email Id" />
            </Form.Item>

            <Form.Item
              label="Password:"
              name="password"
                rules={[
                  {
                    required: true,
                    message: "Password is required",
                  },
                  { min: 6, message: "Atleast 6 Characters Required in Password" },
                  {
                    validator: (_, value) =>
                      value &&
                      /[A-Z]/.test(value) &&
                      /[a-z]/.test(value) &&
                      /[0-9]/.test(value) &&
                      /[@#$%^&]/.test(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            "Note: Must use 1 capital, 1 small, 1 Numeric, 1 symbol"
                          ),
                  },
                ]}
              hasFeedback
            >
              <Password placeholder="Enter Password"></Password>
            </Form.Item>

            <Form.Item
              label="Confirm Password:"
              name="confirm password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message:"Confirm Password is required"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Password Doesn't match");
                  },
                }),
              ]}
              hasFeedback
            >
              <Password placeholder="Re-Enter Password"></Password>
            </Form.Item>

            <Form.Item
              label="Gender:"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please select Gender",
                },
              ]}
              hasFeedback
            >
              <Radio.Group>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: true, message: "Please select BirthDate" }]}
            >
              <DatePicker format="DD/MM/YYYY"disabledDate={disabledDate}  />
            
            </Form.Item>

            <Form.Item name="country" label="Country:" requiredMark="optional">
              <Select placeholder="--Choose Country--">
                <Option value="India">India</Option>
                <Option value="Canada">Canada</Option>
                <Option value="Australia">Australia</Option>
                <Option value="England">England</Option>
                <Option value="America">America</Option>
                <Option value="Japan">Japan</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "you must have to Accept our Terms & Conditions before submitting"
                        ),
                },
              ]}
            >
              <Checkbox>
                {" "}
                Agree to our <a onClick={()=>{terms()}}>Terms & conditions</a>
              </Checkbox>
            </Form.Item>

            <Form.Item
              style={{
                width: "fit-content",
                margin: "auto",
                paddingBottom: "10px",
              }}
            >
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>

        </div>
        <div className="right">
        <Col span={12}>
          <div className="rightCol">
            <Image
              width={500}
              src={"assets/register.svg"}
              style={{ marginTop: "120px" }}
              preview={false}
            />
            <Row>
              <Col span={24} offset={5} className="colToNavigate">
                Already have an Account &nbsp;
                <NavLink to="/"> LogIn </NavLink>
              </Col>
            </Row>
          </div>
        </Col>

        </div>
      </Row>
    </div>
  );
};

export default Signup;
