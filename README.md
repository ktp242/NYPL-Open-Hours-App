# NYPL Open Hours App
This is an assignment for New York Public Library. The task is to build an application to generate a URL to check the open hours of different branches based on New York Public Library's location API.

The application contains three functions. The first function is for the user to check if a specific branch is open at the accessed time. The second function is to check if the branch will be open after a particular number of days from the accessed time in the future. The third function is for the user to enter a timestamp, and check if the brach is open at the given time. All these three results will be showed along with the regular open hour of the given time as well.

##How to Install it

Prerequisite: The application needs NodeJS. Please install NodeJS at your local machine before your start to install it.

1. Clone the repository to your local machine.
2. Get into your applcation folder with your Terminal(OS) or CMD (Windows) and execute "npm install".
3. Run "node server.js." The application will start a server at "http://localhost:1234". If you find that you can't listen to the port, please check if the port is occupied by other applications.

##How to Test and Use it

1. With the browser you like, link to [http://localhost:1234/index.html](http://localhost:1234/index.html). This will lead you to the homepage of the application.

2. Follow the steps indicated on the homepage to use the application. 
   <br>Step 1: Choose the branch you want to look up. This step is mandatory. 
   -Step 2: Choose which optional function you want to use at this time. If you choose to look up if the branch will be open after a number of days in the future, choose option A. If you want to look up if the branch will or was open at a certain time, choose option B. Only one function a time. The default setting is option A.
   -Step 3:  If you choose option A. Fill in an integer in the input field. However, if what you type in is not a number, or the number is less than 0, the input value will be set to 0. If you enter a float, for exampe, 4.5, the value after decimal point will be eliminated, so 4.5 will be 4. 

   If you choose option B. Fill in a timestamp in the input field. Follow the timestamp format like this "YYYY-MM-DD HH:MM:SS". For example "2015-05-28 13:00:23". The format is military time.

3. Press "Confirm Selection" after you have done all the settings, and the application will generate a URL for requesting later. The URL will be like this "http://localhots:1234/<the slug of the branch>/<optional parameter>"

4. Copy the result URL into your browser, the application will lead you to the result page. If you choose option A, the URL will lead you to the page that tells if the branch will be open in the number of days in the future from now. If you choose option B, the result page will tell if the branch will be or was open at the indicated time. If you cut off the <optional parameter> of the URL and remove the last "/", such as "http://localhots:1234/<the slug of the branch>", you will be led to the page that tells you if the branch is open now.
