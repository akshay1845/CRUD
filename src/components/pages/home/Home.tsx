import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../../redux/actions/action";
import { Table, Tag, Space, Typography, Row, Col, Modal } from "antd";
import { Logincontext } from "../../../context/Context";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const Home = () => {
  const dispatch = useDispatch();

  const { account, setAccount } = useContext<any>(Logincontext);

  useEffect(() => {
    dispatch(callApi);
  }, []);

  const Apidata = useSelector((state: any): any => state.API_Data.Apidata);

  const info = (e: any) => {
    Modal.info({
      title: `Information of Id-${e}`,
      content: (
        <div>
          {Apidata.filter((val: any) => e == val.id).map((data: any) => (
            <>
              <pre>
                <b>Name:</b> <p>{data?.name}</p>

                <b>UserName:</b> <p>{data?.username}</p>
                
                <b>Email:</b> <p>{data?.email}</p>
                
                <b>Address:</b>
                <p>{data?.address?.street}</p> <p>{data?.address?.city}</p> <p>{data?.address?.zipcode}</p>
                
                <b>Phone.</b>  <p>{data?.phone}</p>
               
                <b>website:</b>  <p>{data?.website}</p>
               
                <b>company:</b> <p>{data?.company.name}</p>
                
              </pre>
            </>
          ))}
        </div>
      ),
      onOk() {},
    });
  };

  const rowData = (e: any) => {
    console.log("hello rowData", e);
    info(e);
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
          {/* {console.log("selector", record) */}
          {/* } */}

          <EyeOutlined onClick={() => rowData(record.no)} />
          {/* <a>Invite {record.name}</a> */}
          <EditOutlined />
          <DeleteOutlined />
        </Space>
      ),
    },
  ];

  //Table Data
  let data = Apidata.map((val: any) => {
    return {
      no: val?.id,
      name: val?.name,
      email: val?.email,
      city: val?.address?.city,
      phone: val?.phone,
      company: val?.company?.name,
    };
  });
  return (
    <div>
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};

export default Home;
