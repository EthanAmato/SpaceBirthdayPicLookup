const myKey = "pcVgpiZzx7ghk6V00KA7RA4gNhrebSCGkctxp6cQ"; //API key for nasa


function displayErrorMessage(){
    let button = document.querySelector(".btn-secondary")
    button.innerHTML = "Please try another date"
    setTimeout(function(){button.innerHTML = "Find your space pic!"},3000)
}

function returnValidDate(year,month,day){
    let intYear = parseInt(year);
    let intMonth = parseInt(month);
    let intDay = parseInt(day);
    if (isNaN(intYear)|| isNaN(intMonth) || isNaN(intDay) ){
        displayErrorMessage();
    }
    else if (intYear < 1995 || intMonth >12 || intDay >31){
        displayErrorMessage();
    } else{
        return intYear.toString()+"-"+intMonth.toString()+"-"+intDay.toString();
    }
}

function makeHTTPRequest(date){
    return "https://api.nasa.gov/planetary/apod?date="+date+"&api_key="+myKey;
}


function extractImage(jsonResponse){
    json = JSON.parse(jsonResponse);
    return json.url;
}

function displayImage(imgURL){
    let spacePic = document.createElement('img'); 
    spacePic.src=imgURL;
    spacePic.setAttribute("class", "center")
    document.getElementById('spacePicture').appendChild(spacePic);
}

function makeAPICall() {
    year = document.getElementById('year').value;
    month = document.getElementById('month').value;
    day = document.getElementById('day').value;
    let formattedDate = returnValidDate(year,month,day);
    let request = new XMLHttpRequest();  
    request.open("GET",makeHTTPRequest(formattedDate)); 
    request.onload = function() {  
        if(request.status / 100 == 2){  
            let imageURL = extractImage(this.responseText);
            displayImage(imageURL);
        } else {
            displayErrorMessage();
        }
    }
    request.send();
} 