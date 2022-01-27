# Create Rara App

A collections of react app templates to be used within the organization. The templates are created with discussed sets of packages. The templates are initially created by scaffolding with vite and later extended with chosen packages.

## Available Templates:

1. GraphQL
   > with react-query, typescript,vite, husky, eslint, graphql-code-generator,chakra-ui, react-location

## Common Packages Used across the templates:

For react app: I choose these: (after dabbling around with other alternatives...) at least for now..

- [Vite](https://vitejs.dev/) for scafollding with proper husky, eslint and prettier setup
- [react-query](https://react-query.tanstack.com/) with axios for server data management
- [Chakra ui](https://chakra-ui.com/) for style
- [Typescript](https://www.typescriptlang.org/)
- [React-location](https://react-location.tanstack.com/) for routing

### Has Commit Lint enabled

> You need to follow the [commit conventions](https://www.conventionalcommits.org/en/) and remove all the warnings and error to commit.

### .env File

The .env files have some predefined key value pairs that are generated based on the answer you've given while scaffolding the app.

> If you didn't provide any values, then a default path will be set. This env variables are used for api request in axios configuration file and if graphql is used then the VITE_SCHEMA_PATH will be used to set the path of schema

Where are the env variables used?

- src/generated/axiosHelper.ts (VITE_API_URL)
- codegen.yml (VITE_SCHEMA_URL)

```javascript
VITE_SCHEMA_PATH = http://localhost:9000/query
VITE_API_URL = http://localhost:9000/query
```

## Folder Structure

```
--src
-----components
-----constant
-----functions
-----generated
-----graphql
-----hooks
-----pages
-----routes
-----theme
```

> Do not make any edits to generated folder. This is where all the typings for api calls (with graphql) are generated by [graphql-code-gnerator](https://www.graphql-code-generator.com/) along with [react-query plugin](https://www.graphql-code-generator.com/plugins/typescript-react-query).

### For Development

- npm link (creates a symlink);
- create-rara-app folderName
