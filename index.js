const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
const year1 = new Date();
var d = new Date(`${year1.getFullYear()}-${year1.getMonth()+1}`);
var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
let today=year1.getDate();
// Tüm günleri içerecek bir dizi oluşturun
var allDays= [];
// Ayın tüm günlerini diziye ekleyin
// for (var i = 1; i <= lastDay; i++) {
//     allDays.push(new Date(d.getFullYear(), d.getMonth(), i));
// }

function Change(){
    let val = event.target;
    lastDay = new Date(d.getFullYear(), val.value, 0).getDate();

    d=new Date(`${d.getFullYear()}-${val.value}`);
    Start();

}

function AddCommbox(){
    let item = document.querySelector(".form-select");
    //alert(item.innerHTML)
    let string ='';
    //alert(year.getMonth())
    for (let index = 0; index < month.length; index++) {
        const element = month[index];
        if(index==d.getMonth()){
            string+=`<option selected value="${index+1}">${element}</option>`;
        }
        else{
            string+=`<option value="${index+1}">${element}</option>`;
        }
    }
    item.innerHTML = string;
}

function Start() {
    let isokay = false;
    allDays=[];
    for (var i = 1; i <= lastDay; i++) {
        allDays.push(new Date(d.getFullYear(), d.getMonth(), i));
    }
    let value = document.querySelector("tbody")
    let content = '';
    let num = 0;
    //alert(d.getMonth());
    if ( year1.getFullYear()==allDays[num].getFullYear()&& allDays[num].getMonth()==year1.getMonth()) {
        isokay = true;
        //alert(isokay);
    }
    //alert(isokay);
    for (let index = 0; index < 6; index++) {
        content += `<tr>`;
        
        for (let j = 0; j < 7; j++) {
            if(num<=lastDay-1){
                let days = allDays[num];
                let weekday = days.getDay()-1;
                if(weekday==-1){
                    weekday = 6;
                }
                else if(weekday==6){
                    weekday = 0;
                }
                let day = days.getDate();

                if (weekday==j) {
                    if (isokay&&day==today) {
                        content += `<td onclick="myFunction()" class="td_today" onclick="Clikc">${day}</td>`
                    }
                    else{
                        content += `<td onclick="myFunction()" >${day}</td>`    
                    }
                    num++;
                }
                else{
                    content += `<td onclick="myFunction()" class="td_none">0</td>`
                }                
                
            }
            else{
                content += `<td  onclick="myFunction()" class="td_none">0</td>`
            }  
  
        }
        content += `<tr>`;
    }
    value.innerHTML = content;
    AddCommbox();
}


Start();

function myFunction() {
    //var indexsisi = 0;
    //alert(indexsisi)
    let val = event.target;
    if(val.style.backgroundColor==""){
        val.style.backgroundColor = "rgba(0, 0, 0, 0.365)";
        val.style.color = "white";
        val.style.borderColor = "rgb(4, 118, 248)";
    }
    else{
        val.style.backgroundColor = "";
        val.style.color = "";
        val.style.borderColor = "";
    }
    indexsisi++;
  }


