## installation

1. git clone repository
2. run `yarn install`
3. modify the .env file if you have something run on port 3000 already or are not using localhost (normally .env would be .gitignored but for this to work currently I just kept it in)
3. edit migrations/migrate-mongo-config.js to point to your mongo url
4. install migrate-mongo globally `npm install -g migrate-mongo`
5. cd into migrations and run `migrate-mongo up`
6. run `yarn build`
7. run `yarn start`

## instructions

login to the task application with the username of "humancare" and the password of "hcs2019"

User data pulled from mongo is displayed on the right.

To add a test enter task in text input and press "add"
To Update a task hover over the task, click edit. The "add" button will change to "update". enter task in the same text input and press update.
To Delete a task Hover over the task and click the "X"

To Logout click logout in the upper left corner.

## Steps to implement solution

The first step I took was to google a lot. I read through probably 3 different node, express authentication tutorials and 2 different node authentication tutorials specifically with a Vue.js front end. Many were more convoluted with a node backend api that ran of a different port than the vue.js front end. I didn't think this was necessary. My thought was that it makes more sense for this project to run the node api and have express serve my index.html with compiled javascript attached. My first step was to hit the ground running with the parts I knew best. So I started on the front end. I wrote the webpack.config.dev.js file to compile my vue.js into javascript and scss into css. Then I wrote the front-end boilerplate axios calls that I knew I was going to eventually make. Then I moved to the backed. I found the migrate-mongo package which was very similar to the way PHPs Laravel framework migrates tables. I set that up and created my Users.js model, easy. The hard part was going to be the authentication. I found a nice tutorial that explained to me how the passport and jsonwebtoken packages work with mongodb to provide authentication. I had used the passport package in a very small project about a year ago so I had rudimentary knowledge of how it works. This part and understanding how vue.js then allows or disallows users from navigating to unauthorized pages was my biggest hertle and took the most time. A bit of trial and error later and my application was authenticating. Then I set up the api routes to handle the CRUD operations for the tasks in routes/index.js to finish it off. Overal the project was a lot of fun and a good mix of things a new very well and thinks I knew but still needed to do some digging and trial and error to complete.