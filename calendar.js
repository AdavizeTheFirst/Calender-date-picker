monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var calendars = Array.from(document.getElementsByClassName("calendar"))
var showDatePickers = []
calendars.forEach(calendar => showDatePickers.push(calendar.children[1]))
var getCurrentDateStr = () => {
 var today = new Date()
    var day = "" + today.getDate(),
    month = "" + (today.getMonth() + 1)
      if(day.length === 1){day = 0 + "" + day}
      if(month.length === 1){month = 0 + "" + month}
   return (`${month}-${day}-${today.getFullYear()}`)
}
var minDateStr = getCurrentDateStr() //if minimum date is present date
var maxDateStr = "06-27-2019"
// Initial date buggy, will add later
// var initialDate = "06-24-2019" //initial calendar date 
// calendars.forEach(calendar => calendar.children[0].value = initialDate) 

var constructPicker = (e) =>{
  var calendarGrid =  document.createElement('table')
  calendarGrid.className = 'calendarTable'
  calendarGrid.id = 'grid-' + e.target.parentElement.children[0].id
   startDate = new Date(minDateStr)
   if (e.target.previousElementSibling.value === ''){
      focusDate = startDate
   }
   else {
      focusDate = new Date(e.target.previousElementSibling.value)
   }   
   endDate = new Date(maxDateStr)
   var content = `<caption><img src="./img/up.png"> ${monthName[focusDate.getMonth()]} ${focusDate.getFullYear()}<img src="./img/down.png">
   </caption>
   <tr>
       <th>Su</th>
       <th>M</th>
       <th>Tu</th>
       <th>W</th>
       <th>Th</th>
       <th>F</th>
       <th>S</th>
   </tr>`
   //fill up the days.. 30 days has september, april june and november etc
   var rows = 5
   var col = 7
   var maxCalendarDay
   var dayfill =  0
   var state = ''   //whether the date is selected
   var withinRange = '' //whether date is within the maxi and min date
   function leapyear(year)
{
return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0); //from w3resource
}  // september, april, june, november
var _31s = [0,2,4,6,7,9,11]
   if ( _31s.indexOf(focusDate.getMonth()) != -1){
      maxCalendarDay = 31
   }
   // check for others and not leap year
   if ( _31s.indexOf(focusDate.getMonth()) == -1){
      maxCalendarDay = 30
   }
   //Check for leap year february
   if(focusDate.getMonth() == 1){
     if(leapyear(focusDate.getFullYear())){
        maxCalendarDay = 29
     }
    else{ maxCalendarDay = 28}
   }  
//Create Table
   for(var r = 1; r <= rows; r ++)
   {
    content += "<tr>"
         for(var c = 1; c <= col; c++)         
         {  
            if(dayfill === 0)
            {
               dayfill++
            }   
            else if(dayfill > 0 && dayfill < maxCalendarDay)
            {
               dayfill++
            }  
            else{dayfill = ''}
            if(focusDate.getDate() === dayfill){
            state = 'selected'
            }
            else{
               state = 'not-selected'
            }    
            // check for dates within min and max range and attatch class name
            var curr = `${focusDate.getFullYear()}-${ ('0' +(Number(focusDate.getMonth()) + 1)).slice(-2)}-${('0' + dayfill).slice(-2)}`
            //.slice - 2 to add 0 in front
            //yy mm dd format
           var cmpStr = (dateStr) => {
            return `${dateStr.split('-')[2]}-${dateStr.split('-')[0]}-${dateStr.split('-')[1]}`
           }
           if(curr >= cmpStr(minDateStr) && curr <= cmpStr(maxDateStr) )
           {
            withinRange = ''
           }     
           else{withinRange = 'n'}    
            classNames = `${state} ${withinRange} day` 
            content += `<td class="${classNames}">${dayfill}</td>`
         }
    content +=  "</tr>"    
   }
calendarGrid.innerHTML = content
// display the grid where attatched to the parent
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = ` .calendarTable{
   margin-top: ${e.target.parentElement.offsetHeight}px;
   z-index: 2;    
 }`;
 calendarGrid.appendChild(style)
e.target.parentElement.appendChild(calendarGrid)
e.target.parentElement.className += ' active'
// add event listner after appending
document.getElementById(calendarGrid.id).addEventListener('click', (e) => {
   var target = e.target
   // get selected day
   if(target.classList.contains('day') && !target.classList.contains('n') ){
      var day = target.innerText
      var parentInput = document.getElementById(target.parentElement.parentElement.parentElement.id.split('grid-')[1]) 
      console.log(focusDate)      
   }  
})

}
var deconstructPicker = (e) => {
   e.target.parentElement.children[2].remove()
   e.target.parentElement.classList.remove('active')
}

showDatePickers.forEach(showDatePicker => {
   showDatePicker.addEventListener('click', (e) =>{
      if (!e.target.parentElement.classList.contains('active')){
         constructPicker(e)
      }
      else{
         deconstructPicker(e)
      }
   })
})  
//remove calendar grid when focus is lost
// document.body.addEventListener('click', (e) => {
//    console.log(e.target)
// })
