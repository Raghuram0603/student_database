import {app} from "./config.js"

import {getDatabase,set,ref,get,child,remove,update} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

const db=getDatabase();
console.log(db)

var name=document.getElementById("name");
var rollno=document.getElementById("rollno");
var year=document.getElementById("year");
var branch=document.getElementById("branch");
var mob=document.getElementById("mobile");
var addbtn=document.getElementById("add");
addbtn.addEventListener("click",add);

var readbtn=document.getElementById("read");
readbtn.addEventListener("click",read);

var updatebtn=document.getElementById("update");
updatebtn.addEventListener("click",update1);

var deletebtn=document.getElementById("delete");
deletebtn.addEventListener("click",deleteFunc);

function add(){
    set(ref(db,"students/"+rollno.value),{name:name.value,rollno:rollno.value,year:year.value,branch:branch.value,mobile_no:mob.value});
}

function read(){
    var tab=document.getElementById("table1");
    tab.innerHTML='<tr><th>NAME</th><th>Roll_Number</th><th>YEAR</th><th>BRANCH</th><th>MOBILE_NUMBER</th></tr>'
    get(child(ref(db),"students")).then((snapshot)=>{
        let arr=Object.values(snapshot.val())
        arr.forEach((ele)=>{
            tab.innerHTML+='<tr><td>'+ele.name+'</td><td>'+ele.rollno+'</td><td>'+ele.year+'</td><td>'+ele.branch+'</td><td>'+ele.mobile_no+'</td></tr>'
        })
        
    })
}

function update1(){
    var b,m,n,r,y;
    var up_roll=prompt("Enter the roll number of student to update : ")
    var choice = prompt("Enter the field which you want to update : ")
    if(choice=="name"){
        var new_name=prompt("Enter name : ")
        update(ref(db,"students/"+up_roll),{name:new_name})
        alert("Name updated.")
    }
    else if(choice=="branch"){
        var new_branch=prompt("Enter branch : ")
        update(ref(db,"students/"+up_roll),{branch:new_branch})
        alert("Branch updated.")
    }
    else if(choice=="year"){
        var new_year=prompt("Enter year : ")
        update(ref(db,"students/"+up_roll),{year:new_year})
        alert("Year updated.")
    }
    else if(choice=="mobile"){
        var new_mob=prompt("Enter mobile number : ")
        update(ref(db,"students/"+up_roll),{mobile_no:new_mob})
        alert("Mobile number updated.")
    }
    

}
function deleteFunc(){
    var del_roll = prompt("Enter the roll number of student to delete : ")
    remove(ref(db,"students/"+del_roll));
    alert("Student details with roll number "+del_roll+" is deleted from database.")
}


