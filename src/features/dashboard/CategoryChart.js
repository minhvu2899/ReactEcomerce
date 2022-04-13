import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Thời trang nam', value: 400 },
  { name: 'Thời trang nữ', value: 300 },
  { name: 'Phụ kiện thời trang', value: 300 },
  { name: 'Túi sách', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CategoryChart() {
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await statisticApi.getReportLastTwoMonth()
  //       console.log(data)
  //       setIncome(data)

  //     }

  //     catch (e) {
  //       alert(e.message)
  //     }
  //   })()
  // })
  return (
    <ResponsiveContainer width="100%" aspect={2 / 2}>
      <PieChart width="100%" height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" />
      </PieChart>
    </ResponsiveContainer>
  );
}
