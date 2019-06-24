monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var calendars = Array.from(document.getElementsByClassName("calendar"))
// var showDatePickers = []
// calendars.forEach(calendar => showDatePickers.push(calendar.children[1]))
var getCurrentDateStr = () => {
 var today = new Date()
    var day = "" + today.getDate(),
    month = "" + (today.getMonth() + 1)
      if(day.length === 1){day = 0 + "" + day}
      if(month.length === 1){month = 0 + "" + month}
   return (`${month}-${day}-${today.getFullYear()}`)
}
var minDateStr = getCurrentDateStr() //if minimum date is present date
var maxDateStr = "06-28-2020"

var constructPicker = (e) =>{
    var calendarGrid =  document.createElement('table')
  calendarGrid.className = 'calendarTable'
  calendarGrid.tabIndex = 1
  calendarGrid.id = 'grid-' + e.target.parentElement.children[0].id   
  var initialDate = e.target.parentElement.children[0].value //date that loads with webpage (should be within minimum and maximum range)
   if (initialDate === ''){
      focusDate = new Date(minDateStr)
   }
   else {
      focusDate = new Date(initialDate)
   }   
   endDate = new Date(maxDateStr)
   
calendarGrid.innerHTML = constructGrid(maxDateStr, minDateStr, focusDate)
// display the grid where attatched to the parent
var positionStyle = document.createElement('style');
positionStyle.type = 'text/css';
positionStyle.innerHTML = ` .calendarTable{
   margin-top: ${e.target.parentElement.offsetHeight}px;
   margin-left: -12px;
   z-index: 1;    
 }`;
 calendarGrid.appendChild(positionStyle)
e.target.parentElement.appendChild(calendarGrid)
e.target.parentElement.classList.remove('inactive')
e.target.parentElement.children[2].focus()
// add event listener after appending
document.getElementById(calendarGrid.id).addEventListener("focusout", (ev)=>{
deconstructPicker(ev)
})
document.getElementById(calendarGrid.id).addEventListener('click', (ev) => {
   var mmyy = calendarGrid.caption.innerText.split(' ')
   var target = ev.target
   // check whether date was clicked, clicked date is open for selection then select    
   if(target.classList.contains('day') && !target.classList.contains('n') ){         
      var parentInput = document.getElementById(calendarGrid.id.split('grid-')[1])       
      parentInput.value = `${("0" + ((Number(monthName.indexOf(mmyy[0]))) + 1)).slice(-2)}/${("0" + target.innerText).slice(-2) }/${mmyy[1]}` 
      parentInput.focus()
   }  
   
  // check whether up or down is clicked then change grid values
  else if(target.id == 'up'){
     var newFocusDate // date to change grid to
     var lastGridDate
     // if present is january go to previous year december
   if (monthName.indexOf(mmyy[0]) === 0){
    newFocusDate = `12-01-${Number(mmyy[1]) - 1}`
    lastGridDate = `12-31-${Number(mmyy[1]) - 1}`
   }
   // other months
   else{
      var month_ = monthName.indexOf(mmyy[0])
      newFocusDate = `${("0" + month_).slice(-2)}-01-${Number(mmyy[1])}`
      lastGridDate = `${("0" + month_).slice(-2)}-${getMaxMonthDay(month_ - 1,Number(mmyy[1]))}-${mmyy[1]}`
   } 
   if(cmpStr(lastGridDate) >= cmpStr(minDateStr)){
      calendarGrid.innerHTML= constructGrid(maxDateStr, minDateStr, newFocusDate)
      calendarGrid.appendChild(positionStyle)}
      else{
         //show a red indicator around up icon
      }
  } 
  else if(target.id == 'down'){
   var newFocusDate 
   var lastGridDate
   if (monthName.indexOf(mmyy[0]) === 11){
      newFocusDate = `01-01-${Number(mmyy[1]) + 1}` 
      lastGridDate = `01-31-${Number(mmyy[1]) + 1}` 
     }
     // other months
     else{
        newFocusDate = `${("0" + ((Number(monthName.indexOf(mmyy[0]))) + 2)).slice(-2)}-01-${mmyy[1]}`
        lastGridDate =  `${("0" + ((Number(monthName.indexOf(mmyy[0]))) + 2)).slice(-2)}-${getMaxMonthDay(("0" + ((Number(monthName.indexOf(mmyy[0]))) + 2)).slice(-2), mmyy[1])}-${mmyy[1]}`
     }
     
     if(cmpStr(newFocusDate) <= cmpStr(maxDateStr) )
      calendarGrid. innerHTML = constructGrid(maxDateStr, minDateStr, newFocusDate)
      calendarGrid.appendChild(positionStyle)  
  }
})

}
 //yy mm dd format
 var cmpStr = (dateStr) => {
   return `${dateStr.split('-')[2]}-${dateStr.split('-')[0]}-${dateStr.split('-')[1]}`
  }
var deconstructPicker = (e_) => {
   e_.target.parentElement.className += ' inactive'
   e_.target.parentElement.children[2].remove()
}
// make grid
var constructGrid = (maxD, minD, focusD)=>{
   if(typeof(focusD) == "string") {
      focusD = new Date(focusD)
   }    
 var grid = `<caption><img id="up" src="./img/up.png"><span>${monthName[focusD.getMonth()]} ${focusD.getFullYear()}</option>
 </span><img id="down" src="./img/down.png">
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
var rows = 6
var col = 7
var maxCalendarDay = getMaxMonthDay(focusD.getMonth(), focusD.getFullYear())
var dayfill =  ''
var state = ''   //whether the date is selected
var withinRange = '' //whether date is within the maxi and min date
   
//Create Table
for(var r = 1; r <= rows; r ++)
{
 grid += "<tr>"
 var startColumn = focusD.getDay() + 1
      for(var c = 1; c <= col; c++)         
      {  
         if((r + ',' + c) == (1 + ',' + startColumn)){
            //column to start inserting days
            dayfill = 0
         }

         if(dayfill === 0)
         {
            dayfill++
         }   
         else if(dayfill > 0 && dayfill < maxCalendarDay)
         {
            dayfill++
         }  
         else{dayfill = ''}
         if(focusD.getDate() === dayfill){
         state = 'selected'
         }
         else{
            state = 'not-selected'
         }    
         // check for dates within min and max range and attatch class name
         var curr = `${focusD.getFullYear()}-${ ('0' +(Number(focusD.getMonth()) + 1)).slice(-2)}-${('0' + dayfill).slice(-2)}` //.slice - 2 to add 0 in front        
        if(curr >= cmpStr(minD) && curr <= cmpStr(maxD) )
        {
         withinRange = ''
        }     
        else{withinRange = 'n'}    
         classNames = `${state} ${withinRange} day` 
         grid += `<td class="${classNames}">${dayfill}</td>`
      }
 grid +=  "</tr>"       
}
    return grid 
}
var getMaxMonthDay = (month_, yr) =>{
   var maxCalendarDay
   function leapyear(year)
{
   return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0); //from w3resource
}  // september, april, june, november
var _31s = [0,2,4,6,7,9,11]
if ( _31s.indexOf(month_) != -1){
   maxCalendarDay = 31
}
// check for others and not leap year
if ( _31s.indexOf(month_) == -1){
   maxCalendarDay = 30
}
//Check for leap year february
if(month_ == 1){
  if(leapyear(yr)){
     maxCalendarDay = 29
  }
 else{ maxCalendarDay = 28}
}  
return maxCalendarDay
}
calendars.forEach(calendar => {
   calendar.addEventListener('click', (e) =>{      
      if(e.target.id === "cld-img"){
         e.target.previousElementSibling.focus()
      }             
})
   calendar.addEventListener('click', (e) =>{     
         if(e.target.parentElement.classList.contains('inactive')){
            constructPicker(e)}     
   })  
})  
