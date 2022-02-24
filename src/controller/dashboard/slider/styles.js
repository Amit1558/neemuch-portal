import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root:{
    minWidth: 275,
  },
  gridInner:{
    marginTop:'30px',
    paddingLeft:'10px',
    paddingRight:'10px'
  },

  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },

  border: {
    border: 'solid',
  },

  fullHeightCard: {
    height: '100%',
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '12px',
    height: '100%',
    position: 'relative',
  },

  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: "50px 90px"
  },
  actionDiv: {
    textAlign: 'center',
  },
});