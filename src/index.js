const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');


const resolvers = {
    Query: {
        info: () => `This is the API of hackernews`,
        links: (root, args, context, info) => {
            return context.db.query.links({}, info)
        }
    },

    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url
    },
    Mutation: {
        // 2
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args,url,
                    description: args.description
                },
            }, info)
        }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/bartosian1989/hacker/dev',
            secret: 'mysecret123',
            debug: true,
        })
    })
})

server.start(() => console.log('Server is running om 4000 port'))