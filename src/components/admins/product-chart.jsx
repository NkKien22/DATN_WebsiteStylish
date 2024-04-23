import React from 'react';
import { Line, Bar, Pie } from '@ant-design/charts';

const ProductChart = () => {
  // Line Chart
  const lineData = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const lineConfig = {
    data: lineData,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
    },
  };

  // Bar Chart
  const barData = [
    { type: 'A', sales: 200 },
    { type: 'B', sales: 300 },
    { type: 'C', sales: 400 },
    { type: 'D', sales: 500 },
  ];
  const barConfig = {
    data: barData,
    xField: 'type',
    yField: 'sales',
  };

  // Pie Chart
  const pieData = [
    { type: 'A', value: 200 },
    { type: 'B', value: 300 },
    { type: 'C', value: 400 },
    { type: 'D', value: 500 },
  ];
  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: { layout: 'overlap' },
  };

  // Column Chart, Area Chart, Radar Chart can be created similarly

  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={lineData} {...lineConfig} />
      
      <h2>Bar Chart</h2>
      <Bar data={barData} {...barConfig} />
      
      <h2>Pie Chart</h2>
      <Pie data={pieData} {...pieConfig} />
      
      {/* Additional charts can be added here */}
    </div>
  );
};

export default ProductChart;
