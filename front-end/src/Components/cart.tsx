import React from 'react'
import { makeStyles, Theme, createStyles, Paper, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/cart/actions';
import { AppState } from '../store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {}
    })
)

const Cart: React.FC = () => {
    const dispatch = useDispatch()
    const classes = useStyles();

    React.useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])
    const cart = useSelector((state: AppState) => state.cart)
    const user = useSelector((state: AppState) => state.user)
    console.log("CART HERE", cart)
    console.log("User HERE", user)
    return (
        <Paper>
            <Grid container>
                <Grid item>
                    {cart ? (
                        <Typography variant="h6">
                            {cart.productId}
                        </Typography>
                    ) : (
                        <Typography variant="h6">
                            No order yet
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Cart