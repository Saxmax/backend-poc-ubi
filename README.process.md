# Work Test Process

I have not created a REST API backend service before, nor have I worked in Postgres.
So this was a challenge not in writing code but in learning about these processes
within the time allotted to me.

I am comfortable in the Node.js and NPM environment and I have experimented with the Express package before,
so this felt like a good place to start. And doing things in TypeScript would help by just having the type definitions of new packages.

## Project Structure

I looked up a few online resources showcasing their setup for a node/express/postgres app.
I tried a few of these to understand the flow, and eventually landed in my own setup.

It would be good to get started testing things early so since I already had to learn multiple
new packages, I decided to postpone postgres in favor of working with a HashMap dummy data.
This was a good decision as it let me work on the project structure and flow, and adding the basic features.
But it also took me quite a while to convert everything later to SQL queries.
Had I considered how different that would be from working with a HashMap I would have structured the dummy data differently.

## Issues & Slowdowns

The core project was quick to create (and further develop).
Even working with new technology (to me) - like postgres, zod, express routes, and docker setup -
it was all well documented and easy to set up.

The problems really were with the SQL queries and understanding the inner workings of a postgres database.
I prefer making code as modular as possible, but I found I had to settle for some middle-ground regarding
the SQL queries. As you can see I use helper functions in the `UtilityService` class, but initially I would have
wanted something completely dynamic; a custom `SqlQueriesService` class that could take minimum input and produce
valid SQL queries for me to run.

## AI Assistance

As a developer I have attempted to incorporate use of AI in my coding habits but I have found that
it mostly takes a lot more time and I end up needing to do the bulk of the work anyway.

With that said I have embraced using AI as a tool to discuss problems with.
This helps me in the way that "rubber ducking" helps any developer - it breaks the problems down,
makes me write them out in a manner of explaining it to someone not "in the loop", and this usually
helps me get to where I need.

So for this project specifically, the code is written solely by me, but I have used ChatGPT to:

- Explain to me what postgres schemas are, and how to use the `psql` terminal
- Suggest packages to help with specific problems; e.g `zod` for validating incoming data, only picking out the bits that are of interest
- Discuss the work test instructions to help me create a plan of features and see if I might have missed anything
- Pasting code snippets regarding SQL queries to quickly point out what I might improve or do differently
