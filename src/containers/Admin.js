import React, { useState } from 'react'
import CourseDataTable from '../components/admin/CourseDataTable'

export default function Admin() {
  const [currentPage, setCurrentPage] = useState(null)

  function handlePageSelection(page) {
    setCurrentPage(page)
  }

  const cc = [
    {
      createdAt: 1627518670433,
      entityType: 'course',
      SK: 'COURSE#0c1d5751-5e1c-4cc9-8156-819736357e47',
      PK: 'COURSE',
      title: 'Testing the postmaster',
    },
    {
      entityType: 'course',
      code: 'fc101',
      createdAt: 1626848022937,
      SK: 'COURSE#174b48f5-470e-49b9-abed-1c192ce1b025',
      PK: 'COURSE',
      description: 'This is where we put the description.',
      courseCode: 'FC101',
      title: 'The First and only course',
    },
    {
      entityType: 'course',
      createdAt: 1627518584732,
      SK: 'COURSE#845e29e1-f741-4006-9875-27c343c64fa1',
      PK: 'COURSE',
      courseCode: 'TST101',
      title: 'Testing the postmaster',
    },
    {
      entityType: 'course',
      createdAt: 1626917779760,
      SK: 'COURSE#9a7d23ed-ce1c-4205-a363-8c16a9cf9f0a',
      PK: 'COURSE',
      courseCode: 'CTFY101',
      title: 'Creating things for you',
    },
    {
      entityType: 'course',
      createdAt: 1626848221512,
      SK: 'COURSE#b58d29a0-0f2b-4bf6-90a9-1c274eea76a0',
      PK: 'COURSE',
      courseCode: 'CTFY102',
      title: 'Creating things for you',
    },
    {
      entityType: 'course',
      createdAt: 1627527279020,
      SK: 'COURSE#c43b8076-6b93-4d42-8ccd-62d2ca4d4a34',
      description:
        'This is a simple test to see that the data sent from Postman makes its way into DynamoDb',
      PK: 'COURSE',
      ID: 'c43b8076-6b93-4d42-8ccd-62d2ca4d4a34',
      courseCode: 'TEST11',
      title: 'Testing the postmaster',
    },
    {
      entityType: 'course',
      createdAt: 1626855155135,
      SK: 'COURSE#fa6c7dfd-eb3b-455f-9e13-679643d2748a',
      PK: 'COURSE',
      courseCode: 'CTFY103',
      title: 'Creating things for you',
    },
  ]

  return (
    <div>
      <div className="flex w-screen h-screen bg-gray-100">
        {/* Container */}
        <aside className="flex flex-col items-center h-full text-gray-700 bg-white shadow">
          {/* Navbar */}
          <div className="flex items-center w-full h-16">
            <a className="w-6 h-6 mx-auto" href="../">
              <img
                className="w-6 h-6 mx-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
                alt="svelte logo"
              />
            </a>
          </div>

          <ul>
            <li className="hover:bg-gray-100">
              <button
                className="flex items-center justify-center w-full h-16 px-6 focus:text-orange-500"
                onClick={(e) => handlePageSelection('Courses')}
              >
                Courses
              </button>
            </li>
            <li className="hover:bg-gray-100">
              <button
                className="flex items-center justify-center w-full h-16 px-6 focus:text-orange-500"
                onClick={(e) => handlePageSelection('Users')}
              >
                Users
              </button>
            </li>
          </ul>
        </aside>
        <section className="flex flex-col p-4">
          {currentPage === 'Courses' && (
            <>
              <div className="flex items-end">
                <h1 className="mr-3 text-3xl font-bold">Course Maintenance</h1>
                <button className="px-2 py-1 text-white bg-indigo-500 rounded hover:bg-indigo-600">
                  New Course
                </button>
              </div>
              <CourseDataTable data={cc} />
            </>
          )}
        </section>
      </div>
    </div>
  )
}
