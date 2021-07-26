import React, { useState } from 'react'
import { Form, Formik, useField } from 'formik'
import { LockClosedIcon } from '@heroicons/react/solid'
import * as Yup from 'yup'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../libs/contextLib'
import { useHistory } from 'react-router-dom'
import LoaderButton from '../components/LoaderButton'
import { onError } from '../libs/errorLib'

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </>
  )
}

export default function Login() {
  const { userHasAuthenticated } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()
  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          disabled={!Formik.dirty}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Email address is required'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setIsLoading(true)
            try {
              await Auth.signIn(values.email, values.password)
              userHasAuthenticated(true)
              history.push('/')
            } catch (e) {
              onError(e)
              setIsLoading(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <TextInput
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <TextInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                {/* <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting || !(Formik.isValid && Formik.dirty)}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button> */}
                <LoaderButton
                  type="submit"
                  isLoading={isLoading}
                  disabled={isSubmitting || (!Formik.isValid && Formik.dirty)}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:disabled"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </LoaderButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
