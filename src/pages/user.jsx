import React from 'react'
import { Router, Location } from '@reach/router'
import { navigate } from 'gatsby'

import { get } from 'lodash-es'

import { useQuery } from '@apollo/react-hooks'
import { GET_CURRENT_USER } from '../lib/backend-queries'

import { ssr } from '../lib/helpers'

import Layout from '../components/Layout'
import PostsByAuthor from '../components/PostsList/PostsByAuthor'

import Wallets from '../components/common/Wallets'

// The slate is crashing on SSR so...
const EditPost = (ssr) ? null : require('../components/common/EditPost').default
const CreatePost = (ssr) ? null : require('../components/common/CreatePost').default

const useUser = () => {
  const { data } = useQuery(GET_CURRENT_USER)
  return get(data, 'user.info', false)
}

export default () => {
  if (ssr) return null

  const user = useUser()

  if (!user) {
    navigate('/auth/signin')
    return null
  }

  return (
    <Location>
      {({ location }) => (
        <Layout location={location}>
          <Router location={location} className="router">
            <PostsByAuthor credentialsId={user.id} path="/user/articles" />
            <CreatePost user={user} path="/user/article/create" />
            <EditPost user={user} path="/user/article/edit/:id" />
            <Wallets user={user} path="/user/wallets" />
          </Router>
        </Layout>
      )}
    </Location>
  )
}