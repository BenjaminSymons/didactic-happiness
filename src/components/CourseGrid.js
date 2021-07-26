import React from 'react'
import { Link } from 'react-router-dom'

export default function CourseGrid(courses) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {courses.map(({ title, courseCode, createdAt, SK }) => (
        <div className="overflow-hidden sm:rounded-lg" key={courseCode}>
          <div className="px-4 py-5 sm:px-6">
            <div className="bg-gray-200 aspect-w-1 aspect-h-1"></div>
            <Link to={`/courses/${SK}`}>
              <h3 className="text-lg leading-6 font-medium text-gray-900 pt-2">
                {title}
              </h3>
            </Link>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{courseCode}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
