import { Button, Col, Input } from "antd";
import { Form, message } from "antd";
import { useContext, useEffect, useState } from "react";
// import {addData} from '../../../redux/actions/action'
import { useDispatch, useSelector } from "react-redux";

import "./editdata.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Logincontext } from "../../../context/Context";

const Editdata = () => {
  let { id } = useParams<any>();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [data, setData] = useState([])

  const { account, setAccount, apidata, setApidata } =
    useContext<any>(Logincontext);

  // console.log("from edit", typeof parseInt(id));
  data = apidata.filter((no: any) => no.id == id);
  console.log("id from edit", data);
  // console.log("tgis is data", data[0].name);
  useEffect(()=>{
    setData(data)
  },[])
  

  // const setObj = (val: any) => {
  //   const object = {
  //     id:id,
  //     name: val.name,
  //     username: val.userName,
  //     email: val.email,
  //     address: {
  //       street: val.street,
  //       city: val.city,
  //       zipcode: val.zipcode,
  //     },
  //     phone: val.phone,
  //     website: val.website,
  //     company: {
  //       name: val.companyName,
  //     },
  //   };

  // };

  return (
    <div className="addRecordContainer">
      {data.map((element: any) => {
      return(
        <>
          <div className="form">
            <Col span={12} className="column">
              <h2 className="title">Add Record</h2>
              <Form
                autoComplete="off"
                style={{ padding: "15px 0" }}
                form={form}
                layout="vertical"
                onFinish={(defaultValues) => {}}
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
                      min: 3,
                      message: "Name must be more than 3 Characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type={"text"}
                    defaultValue={element?.name}
                   
                  />
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
                      min: 3,
                      message: "It must be more than 3 Characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type={"text"}
                    defaultValue={element?.username}
                  />
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
                      type: "email",
                      message: "Please Enter Valid Email",
                    },
                    {
                      min: 3,
                      message: "email must be more than 3 Characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input defaultValue={element?.email} />
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
                  <Input
                    type={"text"}
                    defaultValue={element?.address?.street}
                  />
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
                      min: 3,
                      message: "City must be more than 3 Characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type={"text"}
                    defaultValue={element?.address?.city}
                  />
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
                      message: "zipcode must be more than 3 Characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type={"text"}
                    defaultValue={element?.address?.zipcode}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      min: 10,
                      message: "Please input  phone number!",
                    },
                  ]}
                >
                  <Input
                    type={"text"}
                    defaultValue={element?.phone}
                  />
                </Form.Item>

                <Form.Item
                  name="website"
                  label="Website"
                  rules={[{ required: true, message: "Please input website!" }]}
                >
                  <Input
                    defaultValue={element?.website}
                  />
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
                      min: 3,
                      message: "Company Name must be more than 3 Characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type={"text"}
                    defaultValue={element?.company.name}
                  />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </div>
          ;
        </>)
      })}
    </div>
  );
};

export default Editdata;
