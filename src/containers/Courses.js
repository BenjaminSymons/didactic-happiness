import { API } from 'aws-amplify'
import React, { useState, useEffect } from 'react'
import { useAppContext } from '../libs/contextLib'
import { onError } from '../libs/errorLib'
import CourseGrid from '../components/CourseGrid'

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
        <h1>List of Courses</h1>
        {!isLoading && renderCoursesList(courses)}
      </div>
    )
  }

  return <div>{isAuthenticated ? renderCourses() : renderLander()}</div>
}
