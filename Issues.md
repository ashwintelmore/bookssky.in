# Bookssky.in
## Task
- Profile
- Sell a book
- Buy a book
- private access
## Errors 
 - ~~React Scroll
## Solve Errors with Solution
 - React Scroll(Simply Google search u get your solution)
***
# Page => Edit Profile
## Not Complited task

- Add validator for social media link FB and linkdin by the help of `npm social-links`  
- We just store id of other media(insta , twit , discord) and during use of this
link we just add `https://demo-link.com` 
- Should be shows appropriate validator error to user
## Complited task
- make how much user profle completed
- After click on logout btn then it will shows "successfully logout"
and show s Login btn
- Add video link next to the text input tag
## Errors 
 - ~~when - on Refresh page
 - ~~What - all user Data is empty input field empty
 - ~~Wierd thing - when click anathor buttun the after click on Edit 
 Profile buttun then its work properly
## Solution for Errors 
- 
## Improvement 
- Changes in Percentage for profile complition algorithm
- linkdin or fb link error massege for user is not looking good
***
# Page => login / Register
## Task
- ~~Error Check
- ~~Not Empty
- ~~Masseges Shows
- ~~Email Confirmation 
- ~~Forget Password
- ~~After Login add No Show login / Register Page 
- ~~Remove Forget BTN from Register page
- 
# Page => Sell Book
## Not Completed Task
- remove the tag input and book images also
- upload book imgases successfully
- offers section should be in bottom
- make on collection and store all books on it
## Completed Task
- Set Condition for user profile should complite above 60 percetage
when profile is complited above 60 then only user can apply for selling book
## Errors 
- 1-> if we add first photo of book and it shows preview but if want
to change same photo without adding all photo
- 2 -> Not supporting png type images only supports jpg why?🤦‍♂️
    - i) when i uploading jpg file but in console shows jpeg
- 3 -> if  i going to upload photo but if i click on canncel on the not clicking
on open then it shows error type is undefined
- 4 -> something happend when i click on delete btn (check last book delete)
## Solution For Errors 
- 
## Improvements
- Multipage form first category select on the basis on seltion shows
the next user option
# Page => My Books
## Not Completed Task
- work on css js dropdown menu
- remove accecept and reject btns( Bcoz is not make big sence) and and 
    also remove the pending... btn from My Request section(Bcoz not make sence)
## Completed Task
- 
## Errors 
- 1-> 
## Solution For Errors 
- 
## Improvements
- Add Btn for use able to accecept and reject request and also shows in My request section
    pending status
# Page => Home Page
## Task
- useEffect for geting all categories
## Errors 
- category feting two time why see in redux devtool
## Improvements
- fetch category list and all book them must be same order then its ok but if then comes with
different order may be occur an error
# Page => Perticular Book
## Task
- 
## Errors 
- 
## Errors Solved
- Geting some warnning
    input in no value provided





initialState = {
    data = {},
    isFull = loolean,
    loading=loolean,
    errCode=""//string
    errMessage=""//string
    err={}//object
}