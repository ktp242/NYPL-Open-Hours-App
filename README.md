# NYPL Open Hours App
This is an assignment for New York Public Library. The task is to build an application to generate a URL to check the open hours of different branches based on New York Public Library's location API.

The application contains two functions. The first functuon is for the user to check the open hours of a specific branch, and it will show if the branch is open at the accessed the time along with the regular open hours. The second function is to check if the branch will be open after a particular number of days at the same accessed time in the future. 

##How to Install it

Prerequisite: The application needs NodeJS. Please install NodeJS at your local machine before your start to install it.

1. Clone the repository to your local machine.
2. Get into your applcation folder with your Terminal(OS) or CMD (Windows) and execute "npm install".
3. Run "node server.js." The application will start a server at "http://localhost:1234". If you find that you can't listen to the port, please check if the port is occupied by other applications.

##How to Test and Use it

1. With the browser you like, link to [http://localhost:1234/index.html](http://localhost:1234/index.html). This will lead you to the homepage of the application.
2. There are one droptown menu and one input field at the homepage. The dropdown menu is for you to choose a branch for New York Public Library. The input field is for you to choose the number of days. It is mandatory to choose a branch for requesting the result, but you can leave the input field for the number of the days unselected. The default value of it is 0. If you enter the input other than a number, or the number is less than 0, the input value will be set to 0 as well. If you enter a float, for exampe, 4.5, the value after decimal place will be eliminated, so 4.5 will be 4.

3. After you choose the branch and the number of days, press "Confirm Selection," and the application will generate a URL for requesting later.
4. Put the result URL into your browser, the application will lead you to the result page. There, if the number of days is not indicated, you will find the information that tells you if the branch is open or not and the open hours of the branch. If the second input, the numbers of days, is indicated, the URL will lead you to a differnet kind of page that tells you if the branch will be open after the number of days and the open hours of that day.
