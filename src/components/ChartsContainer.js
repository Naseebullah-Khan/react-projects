import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import { useSelector } from "react-redux";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(false);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Bar Chart" : "Area Chart"}
      </button>
      {barChart ? <AreaChart data={data} /> : <BarChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
