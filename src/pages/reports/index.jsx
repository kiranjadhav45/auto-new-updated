import React from "react";
import MonthlyReport from "../../components/reports/MonthlyReport";
import Layout from "../../components/common/Layout";
import CurrentStock from "../../components/reports/CurrentStock";
import Supplier from "../../components/reports/Supplier";
import Purchase from "../../components/reports/Purchase";
import Consumption from "../../components/reports/Consumption";

const Report = () => {
  return (
    <Layout>
      {/* <MonthlyReport /> */}
      {/* <CurrentStock /> */}
      {/* <Supplier /> */}
      {/* <Purchase /> */}
      <Consumption />
    </Layout>
  );
};

export default Report;
