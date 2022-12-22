Stack: Typescript, React and Node
Linting: eslint with especific plugins. Follow airbnb guide
Testing: Jest. Make sure to install ts-js package to support Typescript and its types on @types/jest
Building: Webpack and node scripts
Github actions for workflow automation.

Other options for CI/CD workflow automation might have been Jenkins, Space Automation, TeamCity, CircleCI, Bamboo, Buddy, Codeship and many more. Some of them are able to take care of the entire CI cycle, others are specialized in specific steps.

Self hosted vs Cloud based environment  - things to consider for decision
- Size of the application and how it is structured - is it built with microservices? Do we share a common CICD for the entire app of is it specific by microservice? 
- Budget and resources for infrastructure management
- Expectations on security and trust of these tools
- How easily the tool integrates with the rest of the app ecosystem
- how much flexibility do we need when creating these workflows

Based on the given info, it gives the impression that the app is relatively simple and is developed/maintained by a small team (6 people). It's also mentioned that it would be released soon. On that alone, it seems like a cloud based solution will be the best option. It would be cheaper and much faster to onboard an set up when compared to a self-hosted solution, which I believe would be crucial since the team would be focused on the release and would not have much time to spend on configuring the CICD pipleline. 


