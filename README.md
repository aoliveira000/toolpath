# This is the toolpath code challenge.

    Monorepo Setup
        Initialize a Turborepo.
        Directory structure should include two workspaces; apps and packages.
    Shared Types
        In /packages/types, create a Task interface
    Express API
        In /apps/api, create an Express server with endpoints:
            GET /tasks → returns an array of tasks
            POST /tasks → accepts a task and adds it to memory
    Next.js Web App
        In /apps/web, create a page (/tasks) that:
        Fetches tasks from the Express API (/tasks).
        Displays the list of tasks.
        Includes a simple form to add a new task.
    Scripts & Turborepo Pipelines
        dev: Starts both the Next.js and Express dev servers.
        build: Compiles each service to javascript. The NextJS app should compile in standalone mode.
        lint: Run lint in each workspace
        test: Run tests in each workspace
    Test driven development
        Follow the TDD cycle while building the specified functionality
    Logging
        Add a shared logging package used by both apps
        Log output should be in json format, with no whitespaces
    Stretch goals:
        Add a database to the API instead of just keeping tasks in memory
        Use tailwind to add some styling to the NextJS pages
