import React from 'react'
import { makeStyles, Theme, createStyles, Paper, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../store/cart/actions';

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

    return (
        <Paper>
            <Grid container>
                <Grid item>
                    <Typography variant="h6">
                        Cart Here
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Cart