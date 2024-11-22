# Shopping Cart

## Summary

1. [How to run the project](#how-to-run-the-project)
2. [Architecture and design decisions](#architecture-and-design-decisions)

# How to run the project

1. Clone this project
```bash
git clone git@github.com:Isaac-alencar/shopping_cart.git
```

2. Once you clone the repository, you'll need to navigate to the project folder

```bash
cd ~/path/to/folder
```

3. So, we're inside the folder. First, we'll need to install the dependencies. In order to execute locally

```bash
	npm install
	# or
	yarn install
	# or
	pnpm install
	# or
	bun install
```

4. Now, we are able to run the project

```bash
	npm run dev
	# or
	yarn dev
	# or
	pnpm dev
	# or
	bun dev
```

Running tests
```bash
	npm run test
	# or
	yarn test
	# or
	pnpm test
	# or
	bun test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Architecture and design decisions

Before dig into the archecture topic, it is important to mention the tech stack defined to build the project

- [Next.js ](https://nextjs.org/docs) - Next js has a out of the box routing mechanism using pages folder. This is a convenience when setting up your application
- [Tailwindcss ](https://tailwindcss.com/) - Tailwindcss give a developer a agility to build some cool interfaces, with the mobile-first approach we can easily build responsiveness UI
- [Vitest ](https://vitest.dev/) - Lightweight testing runner for javascript/typescript
- [React Testing Library ](https://testing-library.com/docs/) - UI testing library for React application. Helps to handle the visual tests, simulate user interactions and test abstractions like hooks

## Architecture

This project follows the Four-Layer Architecture principle, dividing responsibilities into Presentation(UI), Application, Domain, and Infrastructure layers. This structure promotes maintainability, testability, and scalability by clearly separating concerns and ensuring each layer has a single purpose.

- **Domain** - Business rules, core of application
- **Infrastructure** - Communication with third part applications/resources
- **Application** - Use cases, connecting business rules with user actions
- **UI** - Presentation layer, the user interface itself

But, as we're not going necessarily to connect with a back-end (or any other service) in this project, this layer was omitted. Also, for simplicity the application layer will also handle the state changes, by giving both client (UI) a state source of truth while make communications with business rules through actions

# Code design

The project was divided in modules, this approach let the application resources(like cart, checkout, product details page, etc..) be more isolated to have it's own internal _components, providers, services, tests_

1. How folder structure is represented?

```bash
src/modules
└── shopping
    ├── application
    │   ├── DomainEntityContext.tsx
    │   ├── DomainEntityProvider.tsx
    │   ├── DomainEntityReducer.ts
    │   ├── useDomainEntity.test.tsx
    │   └── useDomainEntity.ts
    ├── domain
    │   ├── DomainEntity.test.ts
    │   ├── DomainEntity.ts
    ├── shared
    │   └── components
    │       └── Header.tsx
    └── ui
        ├── Component.tsx
        ├── ComponentB.tsx
        ├── ComponentC.tsx
        ├── ComponentC.test.tsx
        ├── ComponentD.tsx
        ├── ComponentD.test.tsx
        └── ComponentE.tsx
```

The application and domain are the core of the app, it communicate with each other to provide the current state of the application and implements the _use cases_  


2. **Why context API?**  
   The main point to make this structure using context API it for simplicity. Context API can be used as a dependency injection tool (and its being used like that in the project), we can inject any implementation for any service related with and perform a action. This is very useful for testing, we can decide whether to use real implementation of just mock functions (to test UI updates, for example)  

    Also, since context API it is implemented using `useReducer` we can move away the state layer to other place like a redux store (for example)
    and consume the state from a `redux store` (since the state can be injected via props on ` DomainEntityProvider`)
