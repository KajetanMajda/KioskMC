import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import './login.css';
import '../DiningButton/DiningButton.css';

interface Values {
    username: string;
    password: string;
}

const Login = () => {
    const router = useRouter();

    const handleSubmit = async (values: Values, { setSubmitting, setStatus }: any) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                const { token } = await res.json();
                localStorage.setItem('token', token);
                router.push('/admin');
            } else {
                setStatus('Invalid login credentials');
            }
        } catch {
            setStatus('Could not connect to server');
        } finally {
            setSubmitting(false);
        }
    };

    const validateForm = (values: Values) => {
        const errors: Partial<Values> = {};
        if (!values.username) errors.username = 'Username is required';
        if (!values.password) errors.password = 'Password is required';
        else if (values.password.length < 8) errors.password = 'Password must be at least 8 characters';
        return errors;
    };

    return (
        <div className="container">
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleSubmit}
                validate={validateForm}
            >
                {({ isSubmitting, status }) => (
                    <Form className="Form">
                        <Field name="username" className="field" placeholder="Username" />
                        <ErrorMessage name="username" component="p" className="errorMessage" />
                        <Field name="password" type="password" className="field" placeholder="Password" />
                        <ErrorMessage name="password" component="p" className="errorMessage" />
                        {status && <p className="errorMessage">{status}</p>}
                        <button type="submit" className='dining' disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Log in'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
