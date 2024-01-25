import React from "react";
import MonthlyReport from "../../components/reports/MonthlyReport";
import Layout from "../../components/common/Layout";
import CurrentStock from "../../components/reports/CurrentStock";
import Supplier from "../../components/reports/Supplier";

const Report = () => {
  return (
    <Layout>
      {/* <MonthlyReport /> */}
      {/* <CurrentStock /> */}
      <Supplier />
    </Layout>
  );
};

export default Report;
