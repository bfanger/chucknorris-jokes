# Technical assignment

Create a client application based on JavaScript / Typescript. You decide if and which framework you use (Angular, React, Vue, etc). Please do not use any starter kits except the ones of the frameworks themselves. So, if you want to use Nuxt, you are allowed to do `yarn create nuxt-app` or for Angular `ng new <name of project>.`

While working on the project keep in mind that we will look at your way of working. Not at 'good' or 'bad.' It is all about the choices you have made and if you are able to explain them.

The API description is here: https://api.chucknorris.io/

## Non-Functional requirements

1. Create and manage the client application in a GIT repository. Make use of clear and comprehensible commit messages and Pull requests.
2. Add a CI/CD pipeline (e.g., GitHub actions) to build your application. The pipeline script may be a default one provided as an example by the platform.
3. The build of the CI/CD should result in a deployable package.
4. The delivered code should be "production ready" (make use of tests, etc).
5. It would be a pre if it also looks nice!

## Must Have requirements

1. On page load, fetch 10 random Chuck Norris jokes from the provided API
2. Show the results in a list.
3. Toggle a timer which will fetch a new joke every 5 seconds. The list of jokes has a max of 10 items. The oldest joke goes off the list then the maximum is reached. (Tip: oldest !== `joke.created_at || joke.updated_at` field)
4. The possibility to add and remove jokes as favorite (with a maximum of 10 favorites).
5. Favorites are shown in a list on a separate page.
6. When refreshing the page, favorites stay intact (i.e., use a database or cache).

Good Luck!
