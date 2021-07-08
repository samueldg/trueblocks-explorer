import { createUseStyles } from 'react-jss';

//-----------------------------------------------------------------
export const useAcctStyles = createUseStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 28fr 3fr',
  },
  cardHolder: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '5px',
    border: '1px solid lightgrey',
    padding: '4px',
  },
  card: {
    border: '1px solid lightgrey',
    width: '600px',
  },
  tableHead: {
    padding: '0px',
    margin: '0px',
    overflowX: 'hidden',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '+1',
    borderBottom: '1px solid lightgrey',
  },
  tableRow: {
    padding: '0px',
    margin: '0px',
    overflowX: 'hidden',
    textAlign: 'right',
  },
});
