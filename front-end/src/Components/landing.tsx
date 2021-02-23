import React from 'react'
import { Button, Paper, Container, Typography } from '@material-ui/core'

const Landing: React.FC = () => (
  <Container maxWidth="sm" className="App">
    <Paper>
      <Typography variant="h4" component="h1" gutterBottom>
        Create React App + Material-UI
        </Typography>
      <Button variant="contained" color="primary">
        Primary Button
        </Button>
      <Button variant="contained" color="secondary">
        Secondary Button
        </Button>
    </Paper>
  </Container>
)
export default Landing
