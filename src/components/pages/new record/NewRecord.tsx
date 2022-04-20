import { Button, Col, Input } from "antd";
import { Form } from "antd";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

    const getId = apidata.reverse()[0].id 

  useEffect(() => {
    setId(getId + 1);
  }, []);

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
    <div className="addRecordContainer">
      <div className="form">
        <Col span={12} className="column">
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
                  message: "Name must be more than 3 Characters and not <br />Contain any Numeric Values",
                },
              ]}
              hasFeedback
            >
              <Input type={"text"} placeholder="Enter Your Name" />
            </Form.Item>

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
                  message: "UserName must be more than 3 Characters and not <br />Contain any Numeric Values",
                },
              ]}
              hasFeedback
            >
              <Input type={"text"} placeholder="Enter User Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address:"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  pattern: /^[A-Za-z]{3,29}$/,
                  message: "Please Enter Valid Email",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter  Email Id" />
            </Form.Item>

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

            <Form.Item
              name="city"
              label="City:"
              rules={[
                {
                  required: true,
                  message: "City is required",
                },
                {
                  pattern:
                  /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@gmail\.com$/,
                  message: "City must be more than 3 Characters and not Contain Numeric values",
                },
              ]}
              hasFeedback
            >
              <Input type={"text"} placeholder="Enter City here..." />
            </Form.Item>

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
                  max:6,
                  message: "zipcode must be 6 Characters",
                },
              ]}
              hasFeedback
            >
              <Input type={"text"} placeholder="Enter Zipcode here..." />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  min: 10,
                  max:10,
                  message: "Please input Valid phone Number!",
                },
              ]}
              hasFeedback
            >
              <Input type={"number"} placeholder="Enter Phone no." />
            </Form.Item>

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
                  pattern:
                  /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@gmail\.com$/,
                  message: "Company Name must be more than 3 Characters and not contain any Numeric Values",
                },
              ]}
              hasFeedback
            >
              <Input type={"text"} placeholder="Enter Company Name" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              ADD
            </Button>
            <Button onClick={() => navigate('/home')}>CANCEL</Button>
          </Form>
        </Col>
      </div>
    </div>
  );
};

export default NewRecord;
