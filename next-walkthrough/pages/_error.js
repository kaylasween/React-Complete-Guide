import React from 'react'
import Link from 'next/link'

const errorPage = () => (
  <div>
    <h1>Oops! Something went wrong!</h1>
    <Link href="/"><a>Go back</a></Link>
  </div>
)

export default errorPage