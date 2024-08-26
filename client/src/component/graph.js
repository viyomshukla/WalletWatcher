import * as React from 'react';
import Paper from '@mui/material/Paper';
import {  Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';
import { styled } from '@mui/material/styles';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Tooltip,
    Title
  } from '@devexpress/dx-react-chart-material-ui';
 
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
const PREFIX = 'Demo';
const classes = {
  titleText: `${PREFIX}-titleText`,
};

const StyledText = styled(Title.Text)(() => ({
  [`&.${classes.titleText}`]: {
    textAlign: 'left',
  },
}));

const TextComponent = (props) => (
  <StyledText {...props} className={classes.titleText} />
);

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function Demo({ trans }) {
  // Mapping _id to month names and sorting by month order
  const formattedData = trans
    .map(item => ({
      ...item,
      _id: monthNames[item._id - 1]  // assuming _id is 1-based index
    }))
    .sort((a, b) => monthNames.indexOf(a._id) - monthNames.indexOf(b._id));

  return (
    <Paper style={{ marginTop: "54px", width: "1067px", marginLeft: "278px" }}>
      <Chart data={formattedData}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries
          valueField="total"
          argumentField="_id"
        />

        <EventTracker />
        <Tooltip />
        <Animation />
        <Title text="Expenses(Graph)" textComponent={TextComponent} />
      </Chart>
    </Paper>
  );
}
