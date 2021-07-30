import { API } from 'aws-amplify'
import React, { useState, useEffect } from 'react'
import { useAppContext } from '../libs/contextLib'
import { onError } from '../libs/errorLib'
import CourseGrid from '../components/CourseGrid'
import ImagePlaceholder from '../components/ImagePlaceholder'
import Navbar from '../components/Navbar'
import Page from './Page'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const { isAuthenticated } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return
      }

      try {
        const courses = await loadCourses()
        setCourses(courses)
      } catch (e) {
        onError(e)
      }

      setIsLoading(false)
    }
    onLoad()
  }, [isAuthenticated])

  function loadCourses() {
    return API.get('courses', '/courses')
  }

  function renderCoursesList(courses) {
    return CourseGrid(courses)
  }

  function renderCourseListSkeleton() {
    const tempArray = [...Array(8).keys()]
    return (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {tempArray.map((e) => (
          <div
            className="overflow-hidden border-2 border-gray-200 sm:rounded-lg"
            key={e}
          >
            <div className="animate-pulse">
              <ImagePlaceholder
                w="2"
                h="1"
                className="object-cover object-center"
              />
              <div className="p-6">
                <h2 className="w-1/4 h-4 max-w-2xl mb-1 text-sm tracking-widest bg-gray-300">
                  {' '}
                </h2>
                <h1 className="w-1/2 h-6 max-w-2xl mb-4 text-lg bg-gray-500">
                  {' '}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function renderLander() {
    return (
      <div>
        <h1>Courses</h1>
      </div>
    )
  }

  function renderCourses() {
    return (
      <div>
        <Navbar />
        <Page>
          <h1 className="px-6 text-3xl font-bold text-gray-900 md:px-0">
            Available Courses
          </h1>
          <p className="px-6 mb-6 text-gray-500 md:px-0">
            All of the courses below are included in your membership.
          </p>
          {isLoading && renderCourseListSkeleton()}
          {!isLoading && renderCoursesList(courses)}
        </Page>
      </div>
    )
  }

  return <div>{isAuthenticated ? renderCourses() : renderLander()}</div>
}
