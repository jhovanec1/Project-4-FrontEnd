# Project 4

For the completion of SEI and Project 4 I created a food delivery marketplace called 'DelivApp'. The app consists of
a backend using NodeJS and a frontend using REACT. The main user stories of the app are the ability to create an account and then 
purchase food for delivery. It also has parallel user stories allowing for delivery drivers and restaurants to register on their ends as well and then either be assigned orders to deliver or make.

## Approach

As with all of our projects, I began with constructing an ERD diagram to get a handle on what tables I would need. Alongside
this I also began sketches and wireframes for the general user interface I would create. From there I started with the backend, fully structuring that
and then moving to REACT to weave all the information together.

## Features

The app includes various outside API's in addition to the backend tables. The first is a location API which grabs the users location
upon arriving at the homepage. This is then sent to another API which pulls nearby restaurants and their menus. This is all completed before the user
logs in. Once the user logs in, the user will be able to see all their previous orders and then place new ones which will be 
avilable to the corresponding delivery drivers and restaurant staff through their respective logins. 



