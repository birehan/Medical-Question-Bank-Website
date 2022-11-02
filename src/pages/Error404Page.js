import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const Error404Page = () => {
  return (
    <div>Error 404 Page
            <Button>
                <Link to='/'>Go To Homeage</Link>
            </Button>
    </div>

  )
}

export default Error404Page