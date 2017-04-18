import React, { PropTypes } from 'react';
import randomColor from 'random-color';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

class PieChartModel extends React.Component {
  render() {
    const { inOutboundData } = this.props;
    const data = inOutboundData || [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = (
      { cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
      const radius = innerRadius + ((outerRadius - innerRadius) * 0.5);
      const x = cx + (radius * Math.cos(-midAngle * RADIAN));
      const y = cy + (radius * Math.sin(-midAngle * RADIAN));
      return (
        <text x={x} y={y} fill="black" textAnchor={'middle'} dominantBaseline="central">
          {(percent !== 0) ? `${(percent * 100).toFixed()}%` : null}
        </text>
      );
    };
    const { isSideMenuOpen, container } = this.props;
    const windowsWid = window.innerWidth;
    const windowsHei = window.innerHeight;
    let xWidth = (container === 'InOutBound' ? windowsWid / 2 : windowsWid / 6);
    xWidth = (isSideMenuOpen === true ? xWidth - 170 : xWidth);
    return (
      <ResponsiveContainer width="100%" >
        <PieChart>
          <Tooltip />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" height={36} />
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
              data.map((entry, index) => {
                const color = randomColor();
                return (<Cell fill={color.hexString()} key={entry} />);
              })
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
