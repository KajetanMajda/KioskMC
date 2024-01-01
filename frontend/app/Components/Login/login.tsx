import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';

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
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validateForm}
        >
            {() => (
                <Form>
                    <Field name="username" />
                    <ErrorMessage name="username" />
                    <Field name="password" type="password" />
                    <ErrorMessage name="password" />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default Login;