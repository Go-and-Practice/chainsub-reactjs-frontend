import React from 'react'
import Helmet from 'react-helmet'

import PostsList from './index'

export default () => (
    <div className="blog">
      <Helmet title="Publishing platform" />
      <section className="container">
        <h1>
          The list of <strong>latest</strong> articles.
        </h1>
        <PostsList displayName="GetPostsByDate" />
      </section>
    </div>
)