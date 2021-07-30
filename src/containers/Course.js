import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Page from '../containers/Page'
import { onError } from '../libs/errorLib'

export default function Course() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    function loadCourse() {
      return API.get('courses', `/courses/${id}`)
    }

    async function onLoad() {
      try {
        const course = await loadCourse()
        const { title } = course

        setTitle(title)
        setCourse(course)
      } catch (e) {
        onError(e)
      }
    }

    onLoad()
  }, [id])
  return (
    <div>
      <Navbar className="flex-grow" />
      <Page>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p>{course?.description}</p>
      </Page>
    </div>
  )
}
