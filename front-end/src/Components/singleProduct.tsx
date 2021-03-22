import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Collapse, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { getSingleProduct } from '../store/products/actions';
import { AppState } from '../store';
import { addProduct } from '../store/cart/actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        media: {
            height: 0,
            // paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: theme.palette.secondary.main
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);

const SingleProduct: React.FC = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);
    const product = useSelector((state: AppState) => state.product.product)
    const [quantity, setQuantity] = React.useState(1)
    const cart = useSelector((state: AppState) => state.cart)
    const user = useSelector((state: AppState) => state.user)
    console.log("CART HERE", cart)
    console.log("User HERE", user)
    useEffect(() => {
        dispatch(getSingleProduct(Number(location.pathname.split('/')[2])))
    }, [dispatch, location.pathname])

    const addToCart = () => {
        dispatch(addProduct(product.id, quantity));
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    console.log(product);

    return (
        <div className={classes.root}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={product.title}
                    subheader={product.price}
                />
                <CardMedia
                    component="img"
                    className={classes.media}
                    src={product.imageUrl}
                    title="Paella dish"
                />
                <CardContent>
                    <Typography paragraph>
                        {product.description}
                    </Typography>
                    <Typography paragraph>
                        Origin: {product.origin}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={addToCart}
                    >
                        Add to cart
                    </Button>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>

                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}

export default SingleProduct