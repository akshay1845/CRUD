import "./home.scss";
import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Table, Space, Modal, Popconfirm, message, Card } from "antd";
import { Logincontext } from "../../../context/Context";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddTwoTone,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { account, setAccount, apidata, setApidata } =
    useContext<any>(Logincontext);

  const [visible, setVisible] = useState(true);

  // console.log("from home context, ", apidata);

  const info = (e: number) => {
    Modal.info({
      title: `Information of Id-${e}`,
      content: (
        <div>
          {apidata.length > 0 &&
            apidata
              .filter((val: any) => e == val.id)
              .map((data: any) => (
                <>
                  <pre>
                    <b>Name:</b> <p>{data?.name}</p>
                    <b>UserName:</b> <p>{data?.username}</p>
                    <b>Email:</b> <p>{data?.email}</p>
                    <b>Address:</b>
                    <p>{data?.address?.street}</p> <p>{data?.address?.city}</p>{" "}
                    <p>{data?.address?.zipcode}</p>
                    <b>Phone.</b> <p>{data?.phone}</p>
                    <b>website:</b> <p>{data?.website}</p>
                    <b>company:</b> <p>{data?.company.name}</p>
                  </pre>
                </>
              ))}
        </div>
      ),
      onOk() {},
    });
  };

  const rowData = (e: number) => {
    console.log("hello rowData", e);
    info(e);
  };

  const confirm = (e: number) => {
    console.log("e=>", e);

    const index = apidata.findIndex((i: any) => i.id === e);
    console.log("index", index);

    apidata.splice(index, 1);
    message.success("Data Deleted Successfully");
    setApidata(apidata);
    navigate("/home");
  };
  const cancel = (e: number) => {
    message.warning("Data will not be Deleted");
  };

  //Table Columns
  const columns = [
    {
      title: "sr No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Comapany",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <EyeOutlined onClick={() => rowData(record.no)} />
          <NavLink to={`/editdata/${record.no}`}>
            <EditOutlined className="editRecord" />
          </NavLink>
          <Popconfirm
            title="Are you sure to delete this Data?"
            onConfirm={() => confirm(record.no)}
            onCancel={() => cancel(record.no)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //Table Data
  let data =
    apidata.length > 0 &&
    apidata.map((val: any) => {
      return {
        no: val?.id,
        name: val?.name,
        email: val?.email,
        city: val?.address?.city,
        phone: val?.phone,
        company: val?.company?.name,
      };
    });
  //logout

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAccount(false);
    navigate("/");
  };

  const authData: any = localStorage.getItem("auth");
  const obj = JSON.parse(authData);

  const date = new Date();
  const dob = obj.dob.split("T")[0].split("-");
  console.log("date", obj.dob.split("T")[0].split("-"));

  if (
    localStorage.getItem("dob") == null &&
    date.getDate() == parseInt(dob[2]) &&
    date.getMonth() + 1 == parseInt(dob[1])
  ) {
    console.log("yesss", localStorage.setItem("dob", obj.dob));
  } else {
    console.log("nooo", date.getDate(), date.getMonth(), obj.dob);
  }

  const setClose = () => {
    localStorage.setItem("close", "done");
    setVisible(false)
  };
  useEffect(() => {
    setApidata(apidata);
  }, [apidata, visible]);

  return (
    <div className="homeContainer">
      {localStorage.getItem("close") == null &&
        localStorage.getItem("dob") != null && (
          <>
            <div className="wishing">
              <Card
                title={`Heyyyy ${obj.Name}`}
                extra={<CloseOutlined onClick={() => setClose()} />}
                style={{ width: 300 }}
              >
                <p>Wish You very Happy Birthday!!!!</p>
              </Card>
            </div>
          </>
        )}
      <div className="logout">
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="newRecord">
        <NavLink to="/addRecord" className="editRecord">
          Add New Record
          <FileAddTwoTone />
        </NavLink>
      </div>
      <div className="table">
        <Table pagination={false} columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Home;
