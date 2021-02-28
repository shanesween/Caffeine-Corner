import React from 'react'
import { Paper, createStyles, Grid, makeStyles, Theme, Fade, ButtonBase, Avatar, Typography } from '@material-ui/core'
import { categoryConfig } from '../config/category';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    paper: {
      display: 'flex',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: 116
    },
    button: {
      '&:hover': {
        zIndex: 1,
        '& $imageTitle': {
          border: '4px solid currentColor',
          borderRadius: '4px'
        },
      },
    },
    imageTitle: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      fontSize: '1.5rem',
      fontWeight: 600,
    }
  }),
);

const Landing: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fade in timeout={1000}>
        <Grid container spacing={4}>
          {categoryConfig.map(item => (
            <Grid key={item.category} item md={4} sm={4} xs={12}>
              <Paper className={classes.paper}>
                <ButtonBase focusRipple href={`products${item.category}`} style={{ width: '100%' }} className={classes.button}>
                  <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                    <Avatar variant="rounded" src={item.icon} />
                    {item.label}
                  </Typography>
                </ButtonBase>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Fade>
    </div >
  );
}
export default Landing
