module.exports = {
    docs: [
        {
            type: 'category',
            label: 'Getting started',
            items: [
                'getting-started/introduction',
                'getting-started/installation'
            ]
        },
        {
            type: 'doc',
            id: 'application-lifecycle',
        },
        {
            type: 'doc',
            id: 'attributes',
        },
        {
            type: 'doc',
            id: 'command-line-interface',
        },
        {
            type: 'doc',
            id: 'configuration',
        },
        {
            type: 'category',
            label: 'Database layer',
            items: [
                'database/introduction',
                'database/basics',
                'database/entities',
                'database/relations',
                'database/entity-behaviors',
                'database/lifecycles',
                'database/columns-properties',
                'database/driver',
            ],
        },
        {
            type: 'doc',
            id: 'dependency-injection',
        },
        {
            type: 'doc',
            id: 'events-and-subscribers',
        },
        {
            type: 'category',
            label: 'GraphQl',
            items: [
                'graphql/introduction',
                'graphql/configuration',
                'graphql/generators',
                'graphql/builder',
                'graphql/middleware',
                'graphql/resolvers',
                'graphql/schema',
                'graphql/tools',
                'graphql/relay',
                'graphql/security',
            ],
        },
        {
            type: 'doc',
            id: 'httpfoundation',
        },
        {
            type: 'doc',
            id: 'logging',
        },
        {
            type: 'doc',
            id: 'making-requests',
        },
        {
            type: 'doc',
            id: 'routing-and-controllers',
        },
        {
            type: 'category',
            label: 'Security',
            items: [
                'security/introduction',
                'security/authentication',
                'security/authorization',
                'security/users',
                'security/firewall',
            ],
        },
        {
            type: 'category',
            label: 'Runtime',
            items: [
                'runtime/introduction',
                'runtime/cron',
                'runtime/coroutines',
                'runtime/websocket',
            ],
        },
    ],
};
