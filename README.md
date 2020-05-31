## CI/CD:
The CI, CD is implemented with github actions. Associated time /.github/workflows/OnPush.yml <br/>
Once a push to any branch (development or master) a simple check is made to make sure there is no program crashing error are made <br/>
The workflow define and set up the environment, and runs the test by command "npm run test_render", "npm run test_api" to test if both frontend and backend are working. <br/>
Automated Deployment: The app is deployed on heroku, once a push request is made to master, heroku will wait for the github action workflow to complete without error, the enable an automated deployment. The app will be rebuilt and redeployed with code in "master" branch. Push to development will not trigger autodeploy. Please Note that the test is run on push to any branches including "master", which means whenever it's deployed to Heroku, it must passes all the tests in the workflow.


## Testing Instructions:
To see the deployed Webapp. You can go to https://checkoutcalculator.herokuapp.com/ <br/>
To see the mobileapp, you can go to github repo https://github.com/csc301-summer-2020/assignment1_pair-9-nickinhinguyen-1003366190-mobile.git <br/>
To set up a testing environment, you can clone this Repo and in the project directory by run the following command:<br/> 
"npm run build"<br/>
then run <br/>
"npm start"<br/>
<br/>
You should be able to see the app by accessing http://localhost:3000 in your browser.<br/>
The app allows you to select pre-defined items of different prices, choose addtax/not addtax, choose the discount in % to apply, and display the final price <br/> 
Details of available scripts see below. there are 2 additional testing script runs very simple test<br/> 

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the frontend client for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br />

### `npm start`

Runs the server, make sure a build package is available.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test_render`

which runs a test on frontend rendered dom element. Associated with the testing script in src/App.test.js. <br/> 
It simply renders the page and checks if string "Price Total" is contained and rendered to make sure the page is rendering. <br/> according to requirement of the assignment, only one single simple but scalable test is required. This test can be extended to test multiple rendered DOM item. 

### `npm run test_render`

which runs a test on backend API. Associated with the testing script in test/task.js. <br/>
It uses Mocha and Chai packages to send request to the server and check if the API /api/calculate computes the result correctly <br/>
This file can be easily extended to check other API requests such as get, delete, put, etc.<br/>
In this assignment the backend only does a simple function: given price, taxrate, and discount, computes and return the final price. <br/>
according to requirement of the assignment, only one single simple but scalable test is required. This test can be extended to test multiple rendered API requests. 


