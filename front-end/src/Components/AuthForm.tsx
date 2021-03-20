import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles, Theme, createStyles, TextField, Card, Button, Typography } from '@material-ui/core';
import { auth } from '../store/user/actions';
import { AppState } from '../store';

interface AuthProps {
    name: string,
    displayName: string,
}

interface RegistrationFormData {
    email: string;
    password: string;
}

interface DispatchProps {
    readonly Auth: (email: string, password: string, method: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

type Props = DispatchProps & AuthProps

const AuthForm = (props: Props) => {
    const { name, displayName, Auth } = props
    const { handleSubmit, control } = useForm<RegistrationFormData>()
    const classes = useStyles()
    const user = useSelector((state: AppState) => state.user)

    const onSubmit = (formValues: RegistrationFormData) => {
        name && Auth(formValues.email, formValues.password, name)
    }

    return (
        <Card>
            {user.email ? (
                <Typography variant="h6" gutterBottom>
                    h6. Heading
                </Typography>
            ) : (
                <>
                    <form
                        className={classes.root}
                        onSubmit={handleSubmit(onSubmit)}
                        name={name}
                    >
                        <Controller
                            as={TextField}
                            name="email"
                            control={control}
                            label="email"
                            defaultValue=""
                        />
                        <Controller
                            as={TextField}
                            name="password"
                            control={control}
                            label="password"
                            defaultValue=""
                        />
                        <div>
                            <Button name="submit" type="submit" variant="outlined">{displayName}</Button>
                        </div>
                        {/* {error && error.response && <div> {error.response.data} </div>} */}
                    </form>
                    <div className="ml-3">
                        <a href="/auth/google">{displayName} with Google</a>
                    </div>
                </>
            )
            }
        </Card>
    );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state: AuthProps) => ({
    name: 'login',
    displayName: 'Login',
});

const mapSignup = (state: AuthProps) => ({
    name: 'signup',
    displayName: 'Sign Up',
});

const mapDispatch = {
    Auth: auth
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

export default AuthForm