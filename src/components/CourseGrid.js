import React from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from './ImagePlaceholder'

export default function CourseGrid(courses, skeleton = false) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {courses.map(({ title, courseCode, createdAt, description, SK, ID }) => (
        <div
          className="overflow-hidden border-2 border-gray-200 sm:rounded-lg"
          key={courseCode}
        >
          <div className="group">
            <Link to={`/courses/${ID}`}>
              <ImagePlaceholder
                imageText={title}
                w="2"
                h="1"
                className="object-cover object-center group-hover:bg-gray-800"
              />
              <div className="p-6">
                <h2 className="mb-1 text-xs font-medium tracking-widest text-gray-500 font-title">
                  {courseCode}
                </h2>

                <h1 className="mb-3 text-lg font-semibold text-gray-900 font-title">
                  {title}
                </h1>
                <p className="mb-3 leading-relaxed font-body">{description}</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
