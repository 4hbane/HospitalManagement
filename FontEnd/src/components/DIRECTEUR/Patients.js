import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import * as d3Format from 'd3-format';
import { scaleBand } from '@devexpress/dx-chart-core';
import {
  ArgumentScale, Stack, Animation, EventTracker, HoverState,
} from '@devexpress/dx-react-chart';
import { withStyles } from '@material-ui/core/styles';

const data = [
  { month: "Mars", Visites: 10, Hospitalisations: 5 },
  { month: "Avril", Visites: 8, Hospitalisations: 7 },
  { month: "May", Visites: 10, Hospitalisations: 3 },
  { month: "Juin", Visites: 11, Hospitalisations: 1 },
  { month: "Juillet", Visites: 10, Hospitalisations: 23 },
  { month: "Aout", Visites: 5, Hospitalisations: 9 },
  { month: "Septembre", Visites: 1, Hospitalisations: 9 },
];

const styles = theme => ({
  primaryButton: {
    margin: theme.spacing(1),
    width: '120px',
  },
  secondaryButton: {
    margin: theme.spacing(1),
    width: '170px',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    marginBottom: '1px',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    marginBottom: '1px',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hoverGroup: {
    width: '300px',
  },
  name: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

const tooltipContentTitleStyle = {
  fontWeight: 'bold',
  paddingBottom: 0,
};
const tooltipContentBodyStyle = {
  paddingTop: 0,
};

const TooltipContent = (props) => {
  const { targetItem, text, ...restProps } = props;
  return (
    <div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentTitleStyle}
          text={targetItem.series}
        />
      </div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentBodyStyle}
          text={data[targetItem.point][targetItem.series]}
        />
      </div>
    </div>
  );
};
const Root = withStyles({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
})(({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
));
const Label = withStyles({
  label: {
    whiteSpace: 'nowrap',
  },
})(({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
));

const TitleText = withStyles({ title: { marginBottom: '30px' } })(({ classes, ...restProps }) => (
  <Title.Text {...restProps} className={classes.title} />
));


const encodeTarget = ({ series, point }) => (2 * point + Number(series === 'China'));
const decodeTarget = code => ({ series: code % 2 ? 'China' : 'USA', point: Math.floor(code / 2) });

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hover: null,
      selection: [{ series: 'Visites'}],
      tooltipTarget: null,
      tooltipEnabled: true,
    };

    this.changeHover = hover => this.setState({ hover });
    this.changeTooltip = targetItem => this.setState({ tooltipTarget: targetItem });

    this.turnPrevSelection = () => this.setState(({ selection }) => {
      const target = selection[0];
      if (!target) {
        return null;
      }
      const newTarget = decodeTarget(Math.max(encodeTarget(target) - 1, 0));
      return { selection: [newTarget] };
    });
    this.turnNextSelection = () => this.setState(({ selection }) => {
      const target = selection[0];
      if (!target) {
        return null;
      }
      const newTarget = decodeTarget(Math.min(encodeTarget(target) + 1, 2 * data.length - 1));
      return { selection: [newTarget] };
    });

    this.toggleTooltip = () => this.setState(({ tooltipEnabled }) => ({
      tooltipEnabled: !tooltipEnabled,
      tooltipTarget: null,
    }));
  }

  render() {
    const {
      hover, tooltipTarget, tooltipEnabled,
    } = this.state;

    return (
      <Paper>
        <Chart
          data={data}
        >
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />

          <Title
            text="Statistiques des Visites & Hospitalisations"
            textComponent={TitleText}
          />
          <BarSeries
            name="Visites"
            valueField="Visites"
            argumentField="month"
            barWidth = '1'
          />
          <BarSeries
            name="Hospitalisations"
            valueField="Hospitalisations"
            argumentField="month"
            barWidth = '1'
          />
          <Stack />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <EventTracker onClick={this.click} />
          <HoverState hover={hover} onHoverChange={this.changeHover} />
          <Tooltip
            targetItem={tooltipEnabled && tooltipTarget}
            onTargetItemChange={this.changeTooltip}
            contentComponent={TooltipContent}
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(styles)(Demo);