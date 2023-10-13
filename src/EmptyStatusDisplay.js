import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "./Actions/GlobalContext";
import { LiveData } from "./Actions/utils";
import { RadialChart, Hint } from "react-vis";
import "./LoginPage.css";
import {
  Button,
} from "@mui/material";
import { Document, Page, View, PDFViewer } from "@react-pdf/renderer";

// Define a custom PDF component
const PDFDocument = ({ pieChartData }) => (
  <Document>
    <Page size="A4">
      <View>
        <RadialChart
          data={pieChartData}
          width={400}
          height={300}
          labelsRadiusMultiplier={0.7}
        />
      </View>
    </Page>
  </Document>
);

export default function EmptyStatusDisplay() {
  const {
    plant,
    shop,
    storageType,
    storageNo,
    storageSide,
    storageRow,
  } = useContext(GlobalContext);

  const graphRef = useRef(null);

  const [count0, setCount0] = useState(0);
  const [count1, setCount1] = useState(0);
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const EmptyCount = async () => {
    const formData = {
      plant,
      shop,
      storageType,
      storageNo,
      storageSide,
      storageRow,
    };
    const emptyCount = await LiveData(formData);
    setCount0(emptyCount.Count0);
    setCount1(emptyCount.Count1);
  };

  const pieChartData = [
    { angle: count0, label: "Filled" },
    { angle: count1, label: "UnFilled" },
  ];

  const handleMouseOver = (d) => {
    setHoveredSlice(d);
  };

  const handleMouseOut = () => {
    setHoveredSlice(null);
  };

  const percent = parseFloat((count0 / (count0 + count1)) * 100).toFixed(2);

  const downloadGraphAsPDF = () => {
    const blob = new Blob([<PDFDocument pieChartData={pieChartData} />], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Location_Status.pdf";
    a.click();
  };

  useEffect(() => {
    EmptyCount();
  }, [plant, shop, storageType, storageNo, storageSide, storageRow]);

  return (
    <div className="live_container3" ref={graphRef}>
      {/* <Button onClick={EmptyCount}>Refresh Data</Button>
      <a href="#" onClick={downloadGraphAsPDF} download="Location_Status.pdf">
        Download PDF
      </a> */}
      <div className="pie-chart">
        <RadialChart
          data={pieChartData}
          width={400}
          height={300}
          labelsRadiusMultiplier={0.7}
          onValueMouseOver={handleMouseOver}
          onValueMouseOut={handleMouseOut}
        >
          {hoveredSlice && (
            <Hint value={hoveredSlice}>
              <div className="tooltip">
                <p>{hoveredSlice.label}</p>
                <p>{hoveredSlice.angle} (percentage)</p>
              </div>
            </Hint>
          )}
        </RadialChart>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color filled"></div>
            <div className="legend-label">Filled</div>
          </div>
          <div className="legend-item">
            <div className="legend-color unfilled"></div>
            <div className="legend-label">UnFilled</div>
          </div>
        </div>
      </div>
      <div className="complete-details">
        <div className="details">
          <div className="details_title">
            <p>Number of filled locations</p>
          </div>
          <div className="details_value">
            <p>{count0}</p>
          </div>
        </div>
        <div className="details">
          <div className="details_title">
            <p>Number of Unfilled locations</p>
          </div>
          <div className="details_value">
            <p>{count1}</p>
          </div>
        </div>
        <div className="details">
          <div className="details_title">
            <p>Percentage of Filled locations</p>
          </div>
          <div className="details_value">
            <p>{percent}%</p>
          </div>
        </div>
        <div className="details">
          <div className="details_title">
            <p>Total Number of locations available</p>
          </div>
          <div className="details_value">
            <p>{count0 + count1}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
