export default theme => ({
  root: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '960px'
    },
    margin: 'auto'
  },
});
