import React, { useState } from 'react'
import { Form, Formik, useField } from 'formik'
import { LockClosedIcon } from '@heroicons/react/solid'
import * as Yup from 'yup'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../libs/contextLib'
import { Link, useHistory } from 'react-router-dom'
import LoaderButton from '../components/LoaderButton'
import { onError } from '../libs/errorLib'
import ImagePlaceholder from '../components/ImagePlaceholder'

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
    <div className="flex items-center justify-center h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Sign in to your account
          </h2>
          <Link to="/signup">
            <p className="font-medium text-center text-indigo-600 hover:text-indigo-500">
              Don't have an account?
            </p>
          </Link>
        </div>
        {/* <div className="bg-gray-300 aspect-h-3 aspect-w-5"></div> */}
        <ImagePlaceholder
          imageText="company_logo"
          altText="Company logo"
          w="5"
          h="3"
        />

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
              <div className="-space-y-px rounded-md shadow-sm">
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <TextInput
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <TextInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="block ml-2 text-sm text-gray-900"
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
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting || !(Formik.isValid && Formik.dirty)}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button> */}
                <LoaderButton
                  type="submit"
                  isLoading={isLoading}
                  disabled={isSubmitting || (!Formik.isValid && Formik.dirty)}
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:disabled"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
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
