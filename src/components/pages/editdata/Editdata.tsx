import { Button, Col, Input, Row } from "antd";
import { Form, message } from "antd";
import { useContext, useEffect, useState } from "react";
// import {addData} from '../../../redux/actions/action'
import { useDispatch, useSelector } from "react-redux";
import * as EmailValidator from "email-validator";

import "./editdata.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Logincontext } from "../../../context/Context";
import { setApi } from "../../../redux/actions/action";

const Editdata = () => {
  let { id } = useParams<any>();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [data, setData] = useState<any>([]);

  const { account, setAccount, apidata, setApidata } =
    useContext<any>(Logincontext);

  data = apidata.filter((no: any) => no.id == id);

  useEffect(() => {
    setData(data);
  }, []);

  const setObj = (val: any) => {
    const object = {
      id: data[0].id,
      name: val.name != undefined ? val.name : data[0].name,
      username: val.userName != undefined ? val.userName : data[0].username,
      email: val.email != undefined ? val.email : data[0].email,
      address: {
        street: val.street != undefined ? val.street : data[0].address.street,
        city: val.city != undefined ? val.city : data[0].address.city,
        zipcode:
          val.zipcode != undefined ? val.zipcode : data[0].address.zipcode,
      },
      phone: val.phone != undefined ? val.phone : data[0].phone,
      website: val.website != undefined ? val.website : data[0].website,
      company: {
        name:
          val.companyName != undefined ? val.companyName : data[0].company.name,
      },
    };

    const index = apidata.findIndex((i: any) => i.id == data[0].id);
    // console.log("index of updated data", index);

    apidata[index] = object;

    setApidata(apidata);
  };

  return (
    <div className="editRecordContainer">
      {data.map((element: any) => {
        return (
          <>
            <div className="form">
              <div className="column">
                <h2 className="title">Update Data</h2>
                <Form
                  autoComplete="off"
                  style={{ padding: "15px 0" }}
                  form={form}
                  layout="vertical"
                  onFinish={(defaultValues) => {
                    // console.log("onfinish=>", defaultValues);
                    setObj(defaultValues);
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
                            // required: true,
                            message: "Name is required",
                          },
                          {
                            pattern: /^[A-Za-z]{3,29}$/,
                            message:
                              "Name must be more than 3 Characters and not <br />Contain any Numeric Values",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input type={"text"} defaultValue={element?.name} />
                      </Form.Item>
                    </Col>
                    <Col span={11} offset={2}>
                      <Form.Item
                        name="userName"
                        label="User Name:"
                        rules={[
                          {
                            // required: true,
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
                        <Input type={"text"} defaultValue={element?.username} />
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
                            // required: true,
                            message: "Email is required",
                          },
                          {
                            type: "email",
                            message: "Please Enter Valid Email",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input defaultValue={element?.email} />
                      </Form.Item>
                    </Col>
                    <Col span={11} offset={2}>
                      <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                          {
                            // required: true,
                            min: 10,
                            max: 10,
                            message: "Please input valid phone number!",
                          },
                        ]}
                      >
                        <Input type={"text"} defaultValue={element?.phone} />
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
                            // required: true,
                            message: "street is required",
                          },
                          {
                            min: 3,
                            message: "street must be more than 3 Characters",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type={"text"}
                          defaultValue={element?.address?.street}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={{ span: 7, offset: 1 }}>
                      <Form.Item
                        name="city"
                        label="City:"
                        rules={[
                          {
                            // required: true,
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
                        <Input
                          type={"text"}
                          defaultValue={element?.address?.city}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={{ span: 7, offset: 1 }}>
                      <Form.Item
                        name="zipcode"
                        label="zipcode:"
                        rules={[
                          {
                            // required: true,
                            message: "zipcode is required",
                          },
                          {
                            min: 6,
                            message: "zipcode must be 6 Characters",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type={"text"}
                          defaultValue={element?.address?.zipcode}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="website"
                    label="Website"
                    // rules={[{ required: true, message: "Please input website!" }]}
                  >
                    <Input defaultValue={element?.website} />
                  </Form.Item>

                  <Form.Item
                    name="companyName"
                    label="Company Name:"
                    rules={[
                      {
                        // required: true,
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
                    <Input type={"text"} defaultValue={element?.company.name} />
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
                      Save
                    </Button>
                    <Button onClick={() => navigate("/home")}>Cancel</Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            ;
          </>
        );
      })}
    </div>
  );
};

export default Editdata;
