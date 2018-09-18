import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './activities/App'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const GITHUB_BASE_URL = 'https://api.github.com/graphql'

const TOKEN = 'c04b418d8f3939cbe9b57ad4a4aaa3c26b0f595d'

const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    }
})


const client = new ApolloClient(
    {
        link: httpLink,
        cache: new InMemoryCache()
    }
)

render(<ApolloProvider client={client}><App client={client}/></ApolloProvider>, document.getElementById('root'))
