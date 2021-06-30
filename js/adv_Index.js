//alert('JS Loaded')
// TIME function configuration
const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('.minute')
const currentDate = new Date
const secRatio = currentDate.getSeconds() / 60
const minutesRatio = (secRatio + currentDate.getMinutes()) / 60
const hoursRatio = (minutesRatio + currentDate.getHours()) / 12

hourHand.style.setProperty('--rotation', hoursRatio * 360)
minuteHand.style.setProperty('--rotation', minutesRatio * 360)

// check am pm | default is true which is AM
let am_pm = true

// console.log("Hours: " + hoursRatio * 360)
// console.log("Mins: " + minutesRatio * 360)

console.log(currentDate.getHours())

// ----------------------------

let input_Hours = document.getElementById("hours").nodeValue
let input_Mins = document.getElementById("mins").nodeValue


setHourValue = (HourVal) => {
        hourHand.style.setProperty('--rotation', HourVal * 30)
}

setMinValue = (MinVal) => {
        minuteHand.style.setProperty('--rotation', (MinVal * 0.1) * 60)
}

// AM PM TOGGLE

let button_AM = document.querySelector(".am-button")
let button_PM = document.querySelector(".pm-button")

addStyleClass_AM = () => {
    button_AM.classList.add("am-button-selected")
    button_PM.classList.remove("pm-button-selected")

    let btn_element = document.getElementById('btn')

    setHour = document.getElementById('hours').value

    if(setHour == 12){
        setHour = parseInt(setHour) + 12
    }

    if(parseInt(setHour) >= storeTime_Open && parseInt(setHour) < storeTime_Close){
        // nothing
        btn_element.classList.remove("btn-disabled")
    }else {
        btn_element.classList.add("btn-disabled")
    }
    console.log(setHour)
}

addStyleClass_PM = () => {
    button_PM.classList.add("pm-button-selected")
    button_AM.classList.remove("am-button-selected")

    let btn_element = document.getElementById('btn')

    setHour = document.getElementById('hours').value
    
    if(setHour == 12){
        setHour = parseInt(setHour) 
    }else{
        setHour = parseInt(setHour) + 12
    }

    if(parseInt(setHour) >= storeTime_Open && parseInt(setHour) < storeTime_Close){
        // nothing
         btn_element.classList.remove("btn-disabled")
         
    }else {
        btn_element.classList.add("btn-disabled")
    }
    // console.log(setHour + "ampm false")
}

// Set the current time on page load
setCurrentTime = () => {
    // alert("Hello world")
    let timeMin = currentDate.getMinutes()

    document.getElementById("hours").value = currentDate.getHours()
    //document.getElementById("mins").value = currentDate.getMinutes()
    document.getElementById("mins").value = pad(timeMin)

    if( parseInt(document.getElementById("hours").value) > 12){
        clickPMElement()
        document.getElementById("hours").value = currentDate.getHours() - 12
    }else{
        clickAMElement()
        document.getElementById("hours").value = currentDate.getHours()
    }

}

function clickPMElement(){
    document.querySelector(".pm-button").click()
    }

function clickAMElement(){
    document.querySelector(".am-button").click()
    }
// LImit to numbers only
document.getElementById('hours').addEventListener('keydown', function limitNum(e) {
    var key   = e.keyCode ? e.keyCode : e.which;

    if (!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
         (key == 65 && ( e.ctrlKey || e.metaKey  ) ) ||
         (key >= 35 && key <= 40) ||
         (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
         (key >= 96 && key <= 105)
       )) e.preventDefault();
});

document.getElementById('mins').addEventListener('keydown', function(e) {
    var key   = e.keyCode ? e.keyCode : e.which;

    if (!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
         (key == 65 && ( e.ctrlKey || e.metaKey  ) ) ||
         (key >= 35 && key <= 40) ||
         (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
         (key >= 96 && key <= 105)
       )) e.preventDefault();
});

// To allow value within range

document.getElementById("mins").addEventListener('mouseleave', function() {
    var val = parseInt(this.value);
    if(val > 59 || val < 0)
    {
        alert('Out of range. Input 0 - 59 in minutes')
        this.value = currentDate.getMinutes()
    }
})

document.getElementById("hours").addEventListener('mouseleave', function() {
    var val = parseInt(this.value);
    if(val > 12 || val < 0)
    {
        alert('Out of range. Input 0 - 12 in minutes')
        this.value = currentDate.getHours() - 12;
    }
})

// toggle am_pm
document.querySelector('.am-button').addEventListener('click', function() {
    am_pm = true
})

document.querySelector('.pm-button').addEventListener('click', function() {
    am_pm = false
})

pass_SetTime = () => {
    let passMins = document.getElementById("mins").value
    let passHours = parseInt(document.getElementById("hours").value)
    if(am_pm == false){
        passHours += 12
    }



    // alert(`${passHours}:${pad(passMins)}:${am_pm}` )
    //return pad(passHours)+":"+passMins
    // if(passMins.length < 2) {
    //     //alert("1 digit")
    //     return pad(passHours)+":"+pad(passMins)
    // }else {
    //    // alert("2 digits")
    //     return pad(passHours)+":"+passMins
    // }
    if(passMins.length < 2) {

        if(passHours == 12 && am_pm){
            // passHours = 00
            return "00"+":"+pad(passMins)
        }else if(passHours == 12 && !am_pm){
            return "12"+":"+pad(passMins)
        }else if(passHours == 24 && !am_pm){
            return "12"+":"+pad(passMins)
        }else {
        //alert("1 digit")
        return pad(passHours)+":"+pad(passMins)
    }
    }else {
        if(passHours == 12 && am_pm){
            // passHours = 00
            return "00"+":"+passMins 
        }else if(passHours == 12 && !am_pm){
            return "12"+":"+passMins
        }else if(passHours == 24 && !am_pm){
            return "12"+":"+passMins
        }
        else {
       // alert("2 digits")
        return pad(passHours)+":"+passMins
        }
    }

}

// Turn 1 to 01 or two digits
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

testFunction = () => {
    alert(pass_SetTime())
}

// Store Time variables
var storeTime_Open = 0
var storeTime_Close = 0

// Receive data from chatbot
function onChatBotReady() {
    // You have to define HTML meta "bs:input:buttonName" in order to inform bot send data to buttonName parameter webview
    // var btnName = BotStarWebview('getParameter', 'buttonName');

      // You have to define HTML meta "bs:input:buttonName" in order to inform bot send data to buttonName parameter webview
    var btnName = BotStarWebview('getParameter', 'buttonName');
    // var btn = document.getElementById('btn')

    let hOpen = BotStarWebview('getParameter', 'openHours')
    let hClose = BotStarWebview('getParameter', 'closeHours')

    hOpen = "8"  //8am in the morning
    hClose = "19" // 7pm in the evening

    // let storeHours = parseInt(hOpen) + parseInt(hClose)

    var storeHours = hOpen+ "_"+ hClose

    let btn_element = document.getElementById('btn')
    if(currentDate.getHours() > hOpen && currentDate.getHours() < hClose){
        // nothing
        btn_element.classList.remove("btn-disabled")
    }else {
        btn_element.classList.toggle("btn-disabled")
    }

    storeTime_Open = hOpen
    storeTime_Close = hClose

  }

  
  // Store open or close validation
  function timeChangeValidation(setHour) {

    let btn_element = document.getElementById('btn')

    if(am_pm == false && setHour != 12){
        setHour = parseInt(setHour) + 12

        if(setHour >= storeTime_Open && setHour < storeTime_Close){
            // nothing
             btn_element.classList.remove("btn-disabled")
        }else {
            btn_element.classList.add("btn-disabled")
        }
        // console.log(setHour + " false and not equal to 12")
    }else if(am_pm == false && setHour == 12){
        setHour = parseInt(setHour)

        if(setHour >= storeTime_Open && setHour < storeTime_Close){
            // nothing
             btn_element.classList.remove("btn-disabled")
        }else {
            btn_element.classList.add("btn-disabled")
        }
        // console.log(setHour + " PM and equal to 12")
    }else if(am_pm == true && setHour == 12){
        setHour = parseInt(setHour) + 12

        if(setHour >= storeTime_Open && setHour < storeTime_Close){
            // nothing
             btn_element.classList.remove("btn-disabled")
        }else {
            btn_element.classList.add("btn-disabled")
        }
        // console.log(setHour + " AM and equal to 12")
    }else {
        if(parseInt(setHour) >= storeTime_Open && parseInt(setHour) < storeTime_Close){
            // nothing
            btn_element.classList.remove("btn-disabled")
        }else {
            btn_element.classList.add("btn-disabled")
        }
        // console.log(setHour)
    }

    // console.log(am_pm)
  }


  // Send Data to Chatbot
function sendResponse() {
    // alert("button is clicked")
    pass_SetTime()
    var getTimeOuput = pass_SetTime()

    var outputs = {
      timeOuput: getTimeOuput
    };

    BotStarWebview('sendResponse', '', outputs, 'Button Clicked').catch((err) => {
      console.log(err);
    });

  }
