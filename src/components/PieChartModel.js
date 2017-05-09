import React, { PropTypes } from 'react';
import randomColor from 'random-color';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Sector } from 'recharts';

class PieChartModel extends React.Component {
  constructor(props) {
    super(props);
    const { inOutboundData } = this.props;
    this.state = {
      pieColors: '',
      activeIndex: 0,
      data: inOutboundData || [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ],
    };
    this.onPieEnter = this.onPieEnter.bind(this);
    this.handleRandomColor = this.handleRandomColor.bind(this);
  }
  componentDidMount() {
    this.handleRandomColor();
  }
  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }
  handleRandomColor() {
    const { inOutboundData } = this.props;
    const colorsIndexes = [];
    const colorlength = inOutboundData ? inOutboundData.length : 4;
    for (let index = 0; index < colorlength; index += 1) {
      const color = randomColor(0.8, 0.99);
      colorsIndexes.push(color.hexString());
    }
    this.setState({
      pieColors: colorsIndexes,
    });
  }

  render() {
    const { data } = this.state;
    const renderActiveShape = (props) => {
      const RADIAN = Math.PI / 180;
      const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, percent, name } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + ((outerRadius + 10) * cos);
      const sy = cy + ((outerRadius + 10) * sin);
      const mx = cx + ((outerRadius + 30) * cos);
      const my = cy + ((outerRadius + 30) * sin);
      const ex = mx + ((cos >= 0 ? 1 : -1) * 22);
      const ey = my;
      const textAnchor = cos >= 0 ? 'start' : 'end';

      return (
        <g>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text x={ex + ((cos >= 0 ? 1 : -1) * 12)} y={ey} textAnchor={textAnchor} fill="#333">{`${name}`}</text>
          <text x={ex + ((cos >= 0 ? 1 : -1) * 12)} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
            {`(${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    };
    const { container } = this.props;
    const { pieColors } = this.state;

    return (
      <ResponsiveContainer width="100%" >
        <PieChart onMouseEnter={this.onPieEnter}>
          {container === 'InOutBound'
          ? <Legend layout="horizontal" align="center" verticalAlign="bottom" height={50} />
          : ''}
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            outerRadius={80}
            fill="#8884d8"
          >
            {
              data.map((entry, index) =>
              <Cell
                fill={pieColors[index % pieColors.length]} key={entry}
              />)
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
