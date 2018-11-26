const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!
    }
    
    type Link {
        id: ID!
        description: String!
        url: String!
    }
`

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
    Query: {
        info: () => `This is the API of hackernews`,
        links: () => {
            return links
        }
    },

    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log('Server is running om 4000 port'))