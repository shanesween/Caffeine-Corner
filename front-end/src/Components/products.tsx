import { makeStyles, Theme, createStyles, Grid, Paper, ButtonBase, Typography, Box, } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link, Route, Switch } from 'react-router-dom'
import { AppState } from '../store'
import { getProducts } from '../store/products/actions'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      minHeight: 200
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

const Products: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const classes = useStyles();

  useEffect(() => {
    if (location.pathname.includes('category')) {
      dispatch(getProducts(location.pathname.split('/')[3]))
    } else {
      dispatch(getProducts())
    }
  }, [dispatch, location.pathname])


  const products = useSelector((state: AppState) => state.products.products)

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {products.map(item => (
          <Grid item md={4} sm={6} xs={12} key={item.title}>
            <Link to={`/products/${item.id}`} >
              <ButtonBase href={`/products/${item.id}`}>
                <Paper className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Box className={classes.image}>
                        <img className={classes.img} alt="complex" src={item.imageUrl} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {item.category}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {item.origin}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" style={{ cursor: 'pointer' }}>
                            Remove
                </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">{item.price}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </ButtonBase>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Products
