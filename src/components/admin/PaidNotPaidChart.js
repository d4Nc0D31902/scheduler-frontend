import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function OrderStatusChart({ orders }) {
  // Count the occurrences of each order status dynamically
  const statusCounts = {};
  orders.forEach((order) => {
    const status = order.orderStatus;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  // Prepare data for the chart
  const data = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  // Set colors for the pie chart
  const pieColors = [
    "#FF204E",
    "#FF3EA5",
    "#E26EE5",
    "#FF8C00",
    "#00CED1",
    "#6495ED",
    "#32CD32",
    "#FFD700",
    "#FF6347",
    "#87CEEB",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ width: "100%", height: "500px", textAlign: "center" }}>
      {/* <h2>Order Status Distribution</h2> */}
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            nameKey="name"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={200}
            fill="#8884d8"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={pieColors[index % pieColors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ paddingRight: "20px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
