# Calender-date-picker
HTML CSS Vanilla Javascript Calendar / date picker / Selector with maximum and minimum date range 
1. In the html script, create divs where you want the calendar picker in the format

````
<div class="calendar inactive"> 
  <input id="calendarN-input" class="calendar-input " placeholder="mm/dd/yy" type="text" value="">
  <img id="cld-img" src="./img/calendar.png">
 </div> 
 ````

the N would have values of 1, 2, 3.... according to the number of calendars in the page
the <img> files can be changed to preffered images

2. Link calendar.js to your to your page before your main js script
i.e
````<script src="./calendar.js"></script>````

 then add event listeners on the divs in your main js script to implement the calendar
i.e for a div with an id of calendar1-input: 
````
var calendar1 = document.getElementById("calendar1-input").parentElement
console.log(calendar1)
calendar1.addEventListener('click', (e) =>{    
 if(e.target.classList.contains("cld-img")){
  console.log(e.target)
    constructPicker(e, minumumDate, maximumDate)
 }             
}) // Set the minimum dates and maximum dates as indicated below
````
OR
if they all have the same date range easily;
````
var calendars = Array.from(document.getElementsByClassName("calendar"))
calendars.forEach(calendar => {
   calendar.addEventListener('click', (e) =>{      
      if(e.target.id === "cld-img"){
         constructPicker(e, minumumDate, maximumdate)
      }             
   })  
})  
````
If minimum date is present date use getCurrentDateSte(), and "01-01-0001" for unspecified minimum date range else "mm-dd-yyyy" format
Use ""N/A" for unlimited maximum date range else format "mm-dd-yyyy"

3. Add the calendar.css content to your style sheet and images to your work folder and style to your satisfaction. Be sure to edit the "src" paths. Also pardon the default theme I'm not very good with colors

4. Enjoy!!

*Note this uses the procedural pattern for simplicity
*OOP pattern will come as an update

Feel free to contribute (especially to style, year and month/year picker too), leave comment, open issues if any and star if you love it.
