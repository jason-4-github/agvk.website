import React, { PropTypes } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

class PieChartModel extends React.Component {
  render() {
    const data = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = (
      { cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
      const radius = innerRadius + ((outerRadius - innerRadius) * 0.5);
      const x = cx + (radius * Math.cos(-midAngle * RADIAN));
      const y = cy + (radius * Math.sin(-midAngle * RADIAN));

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    const { isSideMenuOpen, container } = this.props;
    const windowsWid = window.innerWidth;
    const windowsHei = window.innerHeight;
    let xWidth = (container === 'InOutBound' ? windowsWid / 2 : windowsWid / 6);
    xWidth = (isSideMenuOpen === true ? xWidth - 170 : xWidth);
    return (
      <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
        <PieChart>
          <Pie
            data={data}
            cx={xWidth}
            cy={windowsHei / 7}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
          >
            {
              data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={entry} />)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

PieChartModel.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default PieChartModel;
