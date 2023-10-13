import React, { useContext, useEffect, useState, useMemo } from "react";
import { GlobalContext } from "./Actions/GlobalContext";
import { TranData } from "./Actions/utils";
import "./LoginPage.css";
import {
  XYPlot,
  VerticalBarSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LabelSeries
} from 'react-vis';
import "react-vis/dist/style.css";

export default function Stock() {
  const [tranData, setTranData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [showEntry, setShowEntry] = useState(true);
  const [showExit, setShowExit] = useState(true);

  const {
    selectedFilter,
    selectedStartDate,
    selectedEndDate,
    selectedStartMonth,
    selectedEndMonth,
    selectedStartYear,
    selectedEndYear
  } = useContext(GlobalContext);

  const fetchTransactionData = async () => {
    try {
      const newData = await TranData();
      setTranData(newData);
    } catch (error) {
      console.log("Error fetching the transaction data:", error);
    }
  };

  const groupDataByDate = () => {
    const groupedData = {};

    tranData.forEach((item) => {
      const transactionDate = new Date(item.Date);
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);

      if (transactionDate >= startDate && transactionDate < endDate) {
        const date = transactionDate.toISOString().split("T")[0];
        if (!groupedData[date]) {
          groupedData[date] = { entry: 0, exit: 0 };
        }
        if (item.TypeOfTransaction === "entry") {
          groupedData[date].entry++;
        } else if (item.TypeOfTransaction === "exit") {
          groupedData[date].exit++;
        }
      }
    });

    const combinedArray = Object.entries(groupedData).map(([date, counts]) => ({
      x: date,
      entry: counts.entry,
      exit: counts.exit,
    }));

    setCombinedData(combinedArray);
  };

  const groupDataByMonth = () => {
    const groupedMonthData = {};

    tranData.forEach((item) => {
      const transactionDate = new Date(item.Date);
      const startDate = new Date(selectedStartMonth);
      const endDate = new Date(selectedEndMonth);
      const startMonth = startDate.getMonth() + 1;
      const startYear = startDate.getFullYear();
      const endMonth = endDate.getMonth() + 1;
      const transactionMonth = transactionDate.getUTCMonth() + 1;

      if (
        transactionDate.getUTCFullYear() === startYear &&
        transactionMonth >= startMonth &&
        transactionMonth < endMonth
      ) {
        const key = `${transactionMonth}-${transactionDate.getUTCFullYear()}`;
        if (!groupedMonthData[key]) {
          groupedMonthData[key] = { entry: 0, exit: 0 };
        }

        if (item.TypeOfTransaction === "entry") {
          groupedMonthData[key].entry++;
        } else if (item.TypeOfTransaction === "exit") {
          groupedMonthData[key].exit++;
        }
      }
    });

    const combinedArray = Object.entries(groupedMonthData).map(([month, counts]) => ({
      x: month,
      entry: counts.entry,
      exit: counts.exit,
    }));

    setCombinedData(combinedArray);
  };

  const groupDataByYear = () => {
    const groupedYearData = {};

    tranData.forEach((item) => {
      const transactionDate = new Date(item.Date);
      const startDate = new Date(selectedStartYear);
      const endDate = new Date(selectedEndYear);
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      const transactionYear = transactionDate.getUTCFullYear()

      if (
        transactionYear>=startYear && transactionYear<endYear) {
        const key = `${transactionYear}`;
        if (!groupedYearData[key]) {
          groupedYearData[key] = { entry: 0, exit: 0 };
        }

        if (item.TypeOfTransaction === "entry") {
          groupedYearData[key].entry++;
        } else if (item.TypeOfTransaction === "exit") {
          groupedYearData[key].exit++;
        }
      }
    });

    const combinedArray = Object.entries(groupDataByYear).map(([year, counts]) => ({
      x: year,
      entry: counts.entry,
      exit: counts.exit,
    }));

    setCombinedData(combinedArray);
  };

  const dayWiseGraph = () => {
    const entryGraphData = combinedData.map((d) => ({
      x: d.x,
      y: d.entry
    }));

    const exitGraphData = combinedData.map((d) => ({
      x: d.x,
      y: d.exit
    }));

    const xDomain = combinedData.map((d) => d.x);
    const yValues = combinedData.map((d) => Math.max(d.entry, d.exit));
    const yDomain = [0, Math.max(...yValues) + 5];

    return (
      <div className="graph-container">
        <div className="xy-plot-container">
          <XYPlot width={550} height={350} xType="ordinal" xDomain={xDomain} yDomain={yDomain}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-25} />
            <YAxis title="No of Entries/Exits" />
            {showEntry && <VerticalBarSeries data={entryGraphData} color="green" />}
            {showExit && <VerticalBarSeries data={exitGraphData} color="red" />}
            <LabelSeries
              data={combinedData.flatMap((d) => [
                {
                  x: d.x,
                  y: showEntry ? d.entry : 0,
                  label: showEntry ? `${d.entry}` : "",
                  yOffset: -20,
                  xOffset: -15,
                  color: "green",
                },
                {
                  x: d.x,
                  y: showExit ? d.exit : 0,
                  label: showExit ? `${d.exit}` : "",
                  yOffset: -20,
                  xOffset: 10,
                  color: "red",
                },
              ])}
            />
          </XYPlot>
        </div>
        <div className="legend-container">
          <button
            className={`legend-button ${showEntry ? "active" : ""}`}
            onClick={() => setShowExit(!showExit)}
            style={{ backgroundColor: "green" }}
          >
            Entry
          </button>
          <button
            className={`legend-button ${showExit ? "active" : ""}`}
            onClick={() => setShowEntry(!showEntry)}
            style={{ backgroundColor: "red" }}
          >
            Exit
          </button>
        </div>
      </div>
    );
  };

  const monthWiseGraph = () => {
    const entryGraphData = combinedData.map((d) => ({
      x: d.x,
      y: d.entry
    }));

    const exitGraphData = combinedData.map((d) => ({
      x: d.x,
      y: d.exit
    }));

    const xDomain = combinedData.map((d) => d.x);
    const yValues = combinedData.map((d) => Math.max(d.entry, d.exit));
    const yDomain = [0, Math.max(...yValues) + 5];

    return (
      <div className="graph-container">
        <div className="xy-plot-container">
          <XYPlot width={550} height={350} xType="ordinal" xDomain={xDomain} yDomain={yDomain}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-25} />
            <YAxis title="No of Entries/Exits" />
            {showEntry && <VerticalBarSeries data={entryGraphData} color="green" />}
            {showExit && <VerticalBarSeries data={exitGraphData} color="red" />}
            <LabelSeries
              data={combinedData.flatMap((d) => [
                {
                  x: d.x,
                  y: showEntry ? d.entry : 0,
                  label: showEntry ? `${d.entry}` : "",
                  yOffset: -20,
                  xOffset: -15,
                  color: "green",
                },
                {
                  x: d.x,
                  y: showExit ? d.exit : 0,
                  label: showExit ? `${d.exit}` : "",
                  yOffset: -20,
                  xOffset: 10,
                  color: "red",
                },
              ])}
            />
          </XYPlot>
        </div>
        <div className="legend-container">
          <button
            className={`legend-button ${showEntry ? "active" : ""}`}
            onClick={() => setShowExit(!showExit)}
            style={{ backgroundColor: "green" }}
          >
            Entry
          </button>
          <button
            className={`legend-button ${showExit ? "active" : ""}`}
            onClick={() => setShowEntry(!showEntry)}
            style={{ backgroundColor: "red" }}
          >
            Exit
          </button>
        </div>
      </div>
    );
  };

  const yearWiseGraph = () => {
    const entryGraphData = combinedData.map((d) => ({
      x: d.x,
      y: d.entry
    }));

    const exitGraphData = combinedData.map((d) => ({
      x: d.x,
      y: d.exit
    }));

    const xDomain = combinedData.map((d) => d.x);
    const yValues = combinedData.map((d) => Math.max(d.entry, d.exit));
    const yDomain = [0, Math.max(...yValues) + 5];

    return (
      <div className="graph-container">
        <div className="xy-plot-container">
          <XYPlot width={550} height={350} xType="ordinal" xDomain={xDomain} yDomain={yDomain}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-25} />
            <YAxis title="No of Entries/Exits" />
            {showEntry && <VerticalBarSeries data={entryGraphData} color="green" />}
            {showExit && <VerticalBarSeries data={exitGraphData} color="red" />}
            <LabelSeries
              data={combinedData.flatMap((d) => [
                {
                  x: d.x,
                  y: showEntry ? d.entry : 0,
                  label: showEntry ? `${d.entry}` : "",
                  yOffset: -20,
                  xOffset: -15,
                  color: "green",
                },
                {
                  x: d.x,
                  y: showExit ? d.exit : 0,
                  label: showExit ? `${d.exit}` : "",
                  yOffset: -20,
                  xOffset: 10,
                  color: "red",
                },
              ])}
            />
          </XYPlot>
        </div>
        <div className="legend-container">
          <button
            className={`legend-button ${showEntry ? "active" : ""}`}
            onClick={() => setShowExit(!showExit)}
            style={{ backgroundColor: "green" }}
          >
            Entry
          </button>
          <button
            className={`legend-button ${showExit ? "active" : ""}`}
            onClick={() => setShowEntry(!showEntry)}
            style={{ backgroundColor: "red" }}
          >
            Exit
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  useEffect(() => {
    if (tranData.length > 0 && selectedFilter === "Day Wise") {
      groupDataByDate();
    } else if (tranData.length > 0 && selectedFilter === "Monthly") {
      groupDataByMonth();
    }else if(tranData.length > 0 && selectedFilter === "Monthly"){
      groupDataByYear();
    }
  }, [selectedStartDate, selectedEndDate, selectedStartMonth,selectedStartYear,selectedEndYear, selectedEndMonth, selectedFilter]);

  return (
    <div className="chart-container">
      {selectedFilter === "Day Wise" && selectedStartDate && selectedEndDate && dayWiseGraph()}
      {selectedFilter === "Monthly" && selectedStartMonth && selectedEndMonth && monthWiseGraph()}
      {selectedFilter === "Yearly" && selectedStartYear && selectedEndYear && yearWiseGraph()}
    </div>
  );
}
