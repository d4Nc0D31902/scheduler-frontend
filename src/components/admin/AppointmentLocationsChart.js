import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function LocationSalesChart({ appointments }) {
  // Count the occurrences of each location
  const locationCounts = {};
  appointments.forEach((appointment) => {
    const location = appointment.location;
    locationCounts[location] = (locationCounts[location] || 0) + 1;
  });

  // Sort the locations by count in descending order
  const sortedLocations = Object.keys(locationCounts).sort(
    (a, b) => locationCounts[b] - locationCounts[a]
  );

  // Extract the most requested location
  const mostRequestedLocation = sortedLocations[0];

  // Prepare data for the chart
  const data = sortedLocations.map((location) => ({
    name: location,
    percent: (locationCounts[location] / appointments.length) * 100,
  }));

  const pieColors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
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
      <h2>Most Requested Location: {mostRequestedLocation}</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="percent"
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
