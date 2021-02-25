import React from 'react'
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import Navbar from './components/navbar'
import Routes from './routes'
import theme from './theme'

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${`/assets/bg.jpeg`})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />{' '}
        <Navbar />
        <Routes />
      </ThemeProvider>
    </div>
  )
}
export default App
