import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


const styles = ( theme ) => ({
  root: {
    maxWidth:800,
    marginTop: 20
  },
});
const data = [
  { personnel: 'Medecins', Total: 5 },
  { personnel: 'RHs', Total: 4 },
  { personnel: 'Pharmaciens', Total: 4 },
  { personnel: 'Réceptionnistes', Total: 2 },
];

class Personnels extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    const { classes } = this.props;

    return (
      <Container  className={classes.root}>
          <Paper>
            <Chart
              data={chartData}
            >
              <ArgumentAxis />
              <ValueAxis  />

              <BarSeries 
                valueField="Total"
                argumentField="personnel"
                barWidth = '0.4'
              />
              <Title text="Statistiques de Personnels" />
              <Animation />
            </Chart>
          </Paper>
      </Container>
    );
  }
}

Personnels.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Personnels);