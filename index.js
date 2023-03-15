const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const year1 = new Date();
var d = new Date(`${year1.getFullYear()}-${year1.getMonth() + 1}`);
var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
let today = year1.getDate();
var clock = document.getElementById('Clock');
let DateArray = [];
var allDays = [];
function Change() {
    let val = event.target;
    lastDay = new Date(d.getFullYear(), val.value, 0).getDate();
    d = new Date(`${d.getFullYear()}-${val.value}`);
    Start();

}

function AddCommbox() {
    let item = document.querySelector(".form-select");
    //alert(item.innerHTML)
    let string = '';
    //alert(year.getMonth())
    for (let index = 0; index < month.length; index++) {
        const element = month[index];
        if (index == d.getMonth()) {
            string += `<option selected value="${index + 1}">${element}</option>`;
        }
        else {
            string += `<option value="${index + 1}">${element}</option>`;
        }
    }
    item.innerHTML = string;
}

function LDate(time) {
    let Timer = new Date(time);
}

function Start() {
    var allCookie = document.cookie;
    try{
        //alert("a");
        let myArrayCookie = allCookie.split(';')
        .find(cookie => cookie.trim().startsWith('myArray='))
        .split('=')[1].split(',');
        //alert(myArrayCookie);
        DateArray =myArrayCookie;
    }
    catch(err) {
        DateArray = [];
    }
    let isokay = false;
    let RDate = null;
    let RDateCount = null;
    allDays = [];
    for (var i = 1; i <= lastDay; i++) {
        allDays.push(new Date(d.getFullYear(), d.getMonth(), i));
    }
    let value = document.querySelector("tbody")
    let content = '';
    let num = 0;
    if (year1.getFullYear() == d.getFullYear() && allDays[num].getMonth() == year1.getMonth()) {
        isokay = true;
        //alert(d.getFullYear());
    }
    if (d.getMonth() - 1 == -1) {
        RDate = 12;
        RDateCount = new Date(d.getFullYear(), RDate, 0).getDate();
    }
    else {
        RDate = d.getMonth();
        RDateCount = new Date(d.getFullYear(), RDate, 0).getDate();
    }
    for (let index = 0; index < 6; index++) {
        content += `<tr>`;

        for (let j = 0; j < 7; j++) {
            if (num <= lastDay - 1) {
                let days = allDays[num];
                let weekday = days.getDay() - 1;
                if (weekday == -1) {
                    weekday = 6;
                }
                else if (weekday == 6) {
                    weekday = 0;
                }
                let day = days.getDate();

                if (weekday == j) {
                    if (isokay && day == today) {

                        content += `<td onclick="myFunction()" class="td_today animate__animated animate__shakeX" onclick="Clikc">${day}</td>`
                    }
                    else {
                        let boolens = true;
                        for (let index = 0; index < DateArray.length; index++) {
                            const element = DateArray[index];
                            if (days.toJSON().slice(0, 10) == element) {
                                boolens = false;
                                content += `<td onclick="myFunction()" class="animate__animated animate__flash" style="background-color: rgba(0, 0, 0, 0.365); color: white; border-color: rgb(4, 118, 248);">${day}</td>`
                                break;
                            }
                        }
                        if (boolens) {
                            content += `<td onclick="myFunction()" >${day}</td>`
                        }
                    }
                    num++;
                }
                else {
                    //let number =RDateCount-(RDateCount-(RDateCount-1));
                    content += `<td class="td_noneR">R</td>`
                }

            }
            else {
                content += `<td class="td_noneL">L</td>`
            }

        }
        content += `<tr>`;
    }
    value.innerHTML = content;
    let RDatalist = document.querySelectorAll(".td_noneR")
    let LDatalist = document.querySelectorAll(".td_noneL")
    //alert(RDatalist.length);
    for (let index = RDatalist.length - 1; index >= 0; index--) {
        let element = RDatalist[index];
        element.innerHTML = RDateCount--;

    }

    //alert(LDatalist.length);
    for (let index = 0; index < LDatalist.length; index++) {
        let element = LDatalist[index];
        element.innerHTML = index + 1;

    }
    AddCommbox();
}

function myFunction() {

    let val = event.target;
    let DT = new Date(`${d.getFullYear()}-${d.getMonth() + 1}-${val.innerHTML}`);
    if (val.style.backgroundColor == "") {
        ///alert(DT.toJSON().slice(0, 10))
        val.style.backgroundColor = "rgba(0, 0, 0, 0.365)";
        val.style.color = "white";
        val.style.borderColor = "rgb(4, 118, 248)";
        DateArray.push(DT.toJSON().slice(0, 10));
        var dateStr = JSON.stringify(DateArray);
        setCookie(DateArray);

    }
    else {
        val.style.backgroundColor = "";
        val.style.color = "";
        val.style.borderColor = "";
        for (let index = 0; index < DateArray.length; index++) {
            const element = DateArray[index];
            if (element == DT.toJSON().slice(0, 10)) {
                DateArray.splice(index, 1)
                var dateStr = JSON.stringify(DateArray);
                setCookie(dateStr);
            }

        }
    }
    //indexsisi++;
}
Start();

function setCookie(str) {
  document.cookie = `myArray=${str}`;
}

function Click_G(val){
    if (val.length>3&&val>=1800&&val<=year1.getFullYear()) {
        d = new Date(`${val}-${d.getMonth()}`)
        Start();
    }
    return false;
}


setInterval(() => {
    let Timer = new Date();
    if (clock.style.color == "") {
        clock.style.color = "transparent";
    }
    else {
        clock.style.color = "";
    }
    clock.innerHTML = `${checkTime(Timer.getHours())} : ${checkTime(Timer.getMinutes())} `;
}, 1000);


function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
