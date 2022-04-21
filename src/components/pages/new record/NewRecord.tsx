import { Button, Col, Input, Row } from "antd";
import { Form } from "antd";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as EmailValidator from "email-validator";

import "./newRecord.scss";
import { useNavigate } from "react-router-dom";
import { Logincontext } from "../../../context/Context";

const NewRecord = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [id, setId] = useState(0);

  const { account, setAccount, apidata, setApidata } =
    useContext<any>(Logincontext);

  // console.log("array",apidata.at(-1));

  const getId = apidata.at(-1)
  
  useEffect(()=>{
    setId(getId)
  },[])



  

  const setObj = (val: any) => {
    const object = {
      id: id,
      name: val.name,
      username: val.userName,
      email: val.email,
      address: {
        street: val.street,
        city: val.city,
        zipcode: val.zipcode,
      },
      phone: val.phone,
      website: val.website,
      company: {
        name: val.companyName,
      },
    };

    apidata.push(object);

    setApidata(apidata);
  };

  return (
   getId?
   (
    <div className="addRecordContainer">
    <div className="form">
      <div className="column">
        <h2 className="title">Add Record</h2>

        <Form
          autoComplete="off"
          style={{ padding: "15px 0" }}
          form={form}
          layout="vertical"
          onFinish={(values) => {
            setObj(values);
            navigate("/home");
          }}
        >
          <Row>
            <Col span={11}>
              <Form.Item
                name="name"
                label="Name:"
                rules={[
                  {
                    required: true,
                    message: "Name is required",
                  },
                  {
                    pattern: /^[A-Za-z]{3,29}$/,
                    message:
                      "Name must be more than 3 Characters and not Contain any Numeric Values",
                  },
                ]}
                hasFeedback
              >
                <Input type={"text"} placeholder="Enter Your Name" />
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <Form.Item
                name="userName"
                label="User Name:"
                rules={[
                  {
                    required: true,
                    message: "User Name is required",
                  },
                  {
                    pattern: /^[A-Za-z]{3,29}$/,
                    message:
                      "UserName must be more than 3 Characters and not Contain any Numeric Values",
                  },
                ]}
                hasFeedback
              >
                <Input type={"text"} placeholder="Enter User Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={11}>
              <Form.Item
                name="email"
                label="Email Address:"
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                  {
                    validator: (_, value) =>
                      value && EmailValidator.validate(value)
                        ? Promise.resolve()
                        : Promise.reject("Please Enter Valid Email"),
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Enter Email Id" />
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    min: 10,
                    max: 10,
                    message: "Please input Valid phone Number!",
                  },
                ]}
                hasFeedback
              >
                <Input type={"number"} placeholder="Enter Phone no." />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col lg={{ span: 7 }}>
              <Form.Item
                name="street"
                label="street:"
                rules={[
                  {
                    required: true,
                    message: "street is required",
                  },
                  {
                    min: 3,
                    message: "street must be more than 3 Characters",
                  },
                ]}
                hasFeedback
              >
                <Input type={"text"} placeholder="Enter street here..." />
              </Form.Item>
            </Col>
            <Col lg={{ span: 7, offset: 1 }}>
              <Form.Item
                name="city"
                label="City:"
                rules={[
                  {
                    required: true,
                    message: "City is required",
                  },
                  {
                    pattern: /^[A-Za-z]{3,29}$/,

                    message:
                      "City must be more than 3 Characters and not Contain Numeric values",
                  },
                ]}
                hasFeedback
              >
                <Input type={"text"} placeholder="Enter City here..." />
              </Form.Item>
            </Col>
            <Col lg={{ span: 7, offset: 1 }}>
              <Form.Item
                name="zipcode"
                label="zipcode:"
                rules={[
                  {
                    required: true,
                    message: "zipcode is required",
                  },
                  {
                    min: 6,
                    max: 6,
                    message: "zipcode must be 6 Characters",
                  },
                ]}
                hasFeedback
              >
                <Input type={"text"} placeholder="Enter Zipcode here..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="website"
            label="Website"
            rules={[{ required: true, message: "Please input website!" }]}
          >
            <Input placeholder="Enter website here..." />
          </Form.Item>

          <Form.Item
            name="companyName"
            label="Company Name:"
            rules={[
              {
                required: true,
                message: "Company Name is required",
              },
              {
                pattern: /^[A-Za-z]{3,29}/,
                message:
                  "Company Name must be more than 3 Characters and not contain any Numeric Values",
              },
            ]}
            hasFeedback
          >
            <Input type={"text"} placeholder="Enter Company Name" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 10,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              Add
            </Button>
            <Button onClick={() => navigate("/home")}>Cancel</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </div>
   ):
   <div className="loader">
   
   <img src="https://i.gifer.com/origin/ec/ecf46fc2a40f43ad0ef438b04b0d2e8e_w200.gif" alt="" />
   </div>
  );
};

export default NewRecord;
