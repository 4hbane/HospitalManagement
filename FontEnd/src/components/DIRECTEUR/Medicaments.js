import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation } from '@devexpress/dx-react-chart';

const data = [{
  Medicament: 'Dolipran',
  Total: 17,
}, {
  Medicament: 'Supradyn ',
  Total: 23,
}, {
  Medicament: 'Aspegic ',
  gold: 12,
}, {
  Medicament: 'Dafalgan',
  Total: 5,
}, {
  Medicament: 'Kardegic',
  Total: 10,
},
{
  Medicament: 'Paroxétine',
  Total: 5,
}, {
  Medicament: 'Macrogol',
  Total: 10,
}];

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data
    };
  }


  render() {
    const { data: chartData } = this.state;
    console.log(this.state.medicaments)
    console.log(data)
    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis />
          
          
          <BarSeries
            name="Médicaments"
            valueField="Total"
            argumentField="Medicament"
            barWidth = '0.4'
          />
          <Animation />
          <Title text="Statistiques des Médicaments en stock" />
          <Stack />
        </Chart>
      </Paper>
    );
  }
}
