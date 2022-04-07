import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../../redux/actions/action";
import { Table, Tag, Space, Typography, Row, Col } from "antd";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callApi);
  }, []);

  const Apidata = useSelector((state: any): any => state.API_Data.Apidata);
  console.log(Apidata, "from selector");

  //Table Columns
  const columns = [
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
  ];

  //Table Data
  let data = Apidata.map((val: any) => {
    return {
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
