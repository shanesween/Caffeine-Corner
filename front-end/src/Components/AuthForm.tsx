/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { makeStyles, Theme, createStyles, TextField, Card } from '@material-ui/core';
import { auth } from '../store/user/actions';

interface AuthProps {
    name?: string,
    displayName?: string,
}

interface RegistrationFormData {
    formName: string
    email: string;
    password: string;
    passwordConfirmation: string;
}

interface DispatchProps {
    readonly Auth?: (email: string, password: string, method: string) => void
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
    const { register, handleSubmit } = useForm<RegistrationFormData>();
    const classes = useStyles()
    console.log(name);
    console.log(displayName);
    console.log(Auth);



    const onSubmit = React.useCallback((formValues: RegistrationFormData) => {
        // const formName = evt.target.name;
        // const email = evt.target.email.value;
        // const password = evt.target.password.value;
        Auth && Auth(formValues.email, formValues.password, formValues.formName)
    }, [Auth])

    return (
        <Card>

            <form
                className={classes.root}
                onSubmit={handleSubmit(onSubmit)}
                name={name}
            >
                <TextField id="outlined-basic" name="email" type="email" label="Email" variant="outlined" ref={register} />
                <TextField id="outlined-basic" name="password" type="password" label="Password" variant="outlined" ref={register} />
                <TextField id="outlined-basic" name="passwordConfirmation" type="password" label="Password" variant="outlined" ref={register} />

                <div>
                    <button type="submit">{displayName}</button>
                </div>
                {/* {error && error.response && <div> {error.response.data} </div>} */}
            </form>
            <div className="ml-3">
                <a href="/auth/google">{displayName} with Google</a>
            </div>
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

/**
 * PROP TYPES
 */
// AuthForm.propTypes = {
//     name: PropTypes.string.isRequired,
//     displayName: PropTypes.string.isRequired,
//     // handleSubmit: PropTypes.func.isRequired,
//     // error: PropTypes.object,
// };


export default AuthForm