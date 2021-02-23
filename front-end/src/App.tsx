import React from 'react'
import { Button, Paper, Container, Typography } from '@material-ui/core'
import logo from './logo.svg'
import Navbar from './Components/navbar'
import Routes from './routes'

function App() {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}
export default App
