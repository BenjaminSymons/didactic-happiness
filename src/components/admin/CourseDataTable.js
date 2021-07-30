import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../libs/contextLib'
import { onError } from '../../libs/errorLib'

export default function CourseDataTable(props) {
  // const [courses, setCourses] = useState([])
  // const { isAuthenticated } = useAppContext()
  // const [isLoading, setIsLoading] = useState(true)
  // const [headers, setHeaders] = useState([])

  // useEffect(() => {
  //   function getKeys() {
  //     const keyArr = []
  //     cc.forEach((element) => {
  //       Object.keys(element).map((e) => keyArr.push(e))
  //     })
  //     const keySet = new Set(keyArr)
  //     setHeaders(Array.from(keySet))
  //   }

  //   getKeys()
  // }, [cc])

  //   useEffect(() => {
  //     async function onLoad() {
  //       if (!isAuthenticated) {
  //         return
  //       }

  //       try {
  //         const courses = await loadCourses()
  //         setCourses(courses)
  //       } catch (e) {
  //         onError(e)
  //       }

  //       setIsLoading(false)
  //     }
  //     onLoad()
  //   }, [isAuthenticated])

  const getKeys = function () {
    const keyArr = []
    props.data.forEach((element) => {
      Object.keys(element).map((e) => keyArr.push(e))
    })
    const keySet = new Set(keyArr)
    return Array.from(keySet)
  }

  const getHeader = function () {
    var keys = getKeys()
    return keys.map((key, index) => {
      return (
        <th className="px-6 py-3" key={key}>
          {key}
        </th>
      )
    })
  }

  const getRowsData = function () {
    var items = props.data
    var keys = getKeys()
    return items.map((row, index) => {
      return (
        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
          <RenderRow key={index} data={row} keys={keys} />
        </tr>
      )
    })
  }

  const RenderHeader = (headers) => {
    return headers.map((key, index) => {
      return (
        <th className="px-6 py-3" key={key}>
          {key.toUpperCase()}
        </th>
      )
    })
  }

  const RenderRow = (props) => {
    return props.keys.map((key, index) => {
      return (
        <td key={props.data[key]} className="px-6 py-3 text-left">
          {props.data[key]}
        </td>
      )
    })
  }

  function loadCourses() {
    return API.get('courses', '/courses')
  }

  return (
    <div className="w-full">
      <div className="my-6 bg-white rounded shadow-md">
        <table className="">
          <thead>
            <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
              {getHeader()}
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-600">
            {getRowsData()}
          </tbody>
        </table>
      </div>
    </div>
  )
}
