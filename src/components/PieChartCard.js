import React, { PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { styles } from '../styles';

class PieChartCard extends React.Component {
  render() {
    const data = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
      const radius = innerRadius + ((outerRadius - innerRadius) * 0.5);
      const x = cx + (radius * Math.cos(-midAngle * RADIAN));
      const y = cy + (radius * Math.sin(-midAngle * RADIAN));

      return (
        <text x={x} y={y} fill="white" dominantBaseline="central" textAnchor={x > cx ? 'start' : 'end'}>
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    const { title, subtitle } = this.props;
    return (
      <Card style={{ minHeight: '100px', minWidth: '100px' }}>
        <CardHeader
          title={title}
          subtitle={subtitle}
          style={styles.Cube.card.header}
          titleStyle={styles.Cube.card.titleStyle}
        />
        <CardText style={{ height: '300px', width: '100%' }}>
          <Divider />
          <ResponsiveContainer>
            <PieChart >
              <Pie
                data={data}
                cx={210}
                cy={150}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
              >
                {
                  data.map((entry, index) => {
                    return (<Cell fill={COLORS[index % COLORS.length]} />);
                  })
                }
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardText>
      </Card>
    );
  }
}

PieChartCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default PieChartCard;
