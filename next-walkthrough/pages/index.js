import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

const indexPage = () => (
  <div>
    <h1>The Main Page</h1>
    <Link href="/auth">Auth</Link>
    <button onClick={() => Router.push('/auth')}>Go to Auth</button>
  </div>
)

export default indexPage