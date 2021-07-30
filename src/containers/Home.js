import React from 'react'
import Navbar from '../components/Navbar'
import Page from './Page'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Page>
        <h1 className="text-2xl font-bold">Academy</h1>
      </Page>
    </div>
  )
}
