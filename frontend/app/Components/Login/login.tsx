import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import './login.css';
import '../DiningButton/DiningButton.css';

const Login = () => {
    const router = useRouter();
    const initialValues = {
        username: 'admin',
        password: 'admin123',
    };

    interface Values {
        username: string;
        password: string;
    }

    const login = async (username: string, password: string) => {
        return username === initialValues.username && password === initialValues.password;
    };

    const handleSubmit = async (values: Values) => {
        const isValid = await login(values.username, values.password);
        if (isValid) {
            router.push('/admin');
        } else {
            alert('Invalid login credentials');
        }
    };

    const validateForm = (values: Values) => {
        const errors: Partial<Values> = {};

        if (!values.username) {
            errors.username = 'Username is required';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        return errors;
    };

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validate={validateForm}
            >
                {() => (
                    <Form className="Form">
                        <Field name="username" className="field" />
                        <ErrorMessage name="username" className="errorMessage" />
                        <Field name="password" type="password" className="field" />
                        <ErrorMessage name="password" className="errorMessage" />
                        <button type="submit" className='dining'>Log in</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;