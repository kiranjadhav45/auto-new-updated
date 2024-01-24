import React from "react";
import MonthlyReport from "../../components/reports/MonthlyReport";
import Layout from "../../components/common/Layout";
import CurrentStock from "../../components/reports/CurrentStock";

const Report = () => {
  return (
    <Layout>
      <MonthlyReport />
      {/* <CurrentStock /> */}
    </Layout>
  );
};

export default Report;
