# NYPL Open Hours App
This is the assignment for NYPL interview. The task is to build an application to generate and URL to check the open hours of different branches based on NYPL's location API.

The application contains two functions. The first functuon is for the user to check the open hours of a specific branch, and it will show if the branch is open at the current of the time along with the open hours. The second function is to check if the branch will be opened after a particular number of days at the same accessed time in the future. 

How to Install it?

Prerequirment: The application needs NodeJS. Please install NodeJS before your start installing.

1. Clone the repository to your local machine.
2. Get into your applcation folder with your Terminal(OS) or CMD (Windows) and do "npm install".
3. Run "node server.js." The application will start a server at http://localhost:8080


How to Test and Use it?

1. With the browser you like, link to http://localhost:8080/index.html. This will link you to the homepage of the application.
2. There is one droptown menu and the other input field. The dropdown menu is for you to choose a branch for NYPL. The input field is for you to choose the number of days. It is mandontory to choose a branch for the application, but the user can leave the day field unselected. The default value of the day field is 0.
3. After the user choose the branch and the number of days, press "Selected Confirm," and the application will generates a result URL.
4. Put the result URL into your browser, the application will lead you to the result page. There, if the number of days is not indicated, the user will found if the branch is open now and the open hours of the branch. If the second input, the numbers of days, is indicated, the application will lead the user to a page that tells the branch will be opened after the number of days  and the open hours of that day.
