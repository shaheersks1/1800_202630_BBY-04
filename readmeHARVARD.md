Schedulr
https://www.youtube.com/watch?v=t8JR0i5U1ok
What Schedulr is: Schedulr is a platform that gives you an optimized week schedule that tailors to reach your goals. 
So far the platform does as follows: Lets you sign up, login, check progress of your scheduled tasks, make your perfect schedule to reach specified goal.
What each page does: Main, Sign up and login, well they are as specified. Ex.html is where we get to it. This is where the schedule gets displayed and where we grab the info from user.
We first get their json schedule file (the one I use is my BCIT school schedule I took a screenshot and had AI convert it to JSON), then we get their end of week or during of the week-
goal, and lastly by what end day must this goal be achieved. This is all handed by ai_schedule.js which grabs the input fields, combines certain ones like goalINputZ and byDate to one 
string and combine it to the AI's prompt and send it. We retrieve and have ui_scedule.js to display it nice and cleanly and making it interactive. Then I setup progress.html that grabs the progress from 
ai_schedule.js and displays it super cool (made by AI the UI lowkey). So yes, those are the main ones that I feel needed to be explained.
How the work was spread. Razor: he did most of the login signup and database setup. Shaheer: Almost all styling using bootstrap. Me: Setup AI, setup schedule and goal database (documents in the users database).
Many debates were in the project, such as actually how it will work and what is the point of us. What I mean by that is that our app at first was suppose to get all of the users mandatory commitments like work 
and after work activities. Then we get their goal that could be literally anything. But there was one flaw. If the user typed in, be a millionaire by 2027 we wouldn't be able to do that. So we thought of
adding a background video explaining what to put but then we were just compensating on a flaw. So we narrowed it all down to precision and specificity, which is now what it does! Still this app has much more to do.
