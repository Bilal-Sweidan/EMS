
let loginWindow = document.querySelector("#logInS")
let mainHeader = document.querySelector("#mainheader")
let projectsList = document.querySelector("#projectsection");
document.body.onload = function (){
    mainHeader.style.display = "none"
    loginWindow.style.display = 'block'
    projectsList.style.display = 'none'      
}


let eye = document.querySelector("#eye")
let password = document.querySelector('#password')
eye.onclick = function (){
    if (password.type === "password"){
        eye.src = "/static/close-eye.ico"
        password.setAttribute("type","text")
    }else{
        eye.src = "/static/open-eye.ico"
        password.setAttribute("type","password")
    }
}

let employee = document.querySelector('#employeeSection')
let project = document.querySelector("#project")

// single page application
// let projectsIn = document.querySelectorAll("#project")
// console.log(projectsIn)
// for(let k =0;k<projectsIn.length;k++){
//     console.log(projectsIn[k])
//     projectsIn[k].addEventListener("click",function(){
//         projectsList.style.display = 'none'
//         employee.style.display = 'block'
//         window.localStorage.project = this.innerText
//     }) 
//     // projectsIn[k].onclick = function (){
//     //     projectsList.style.display = 'none'
//     //     employee.style.display = 'block'
//     //     window.localStorage.project = projectsIn[k].innerText
//     // }
// }

// logo onclick :  return to the main window
let home = document.querySelector("#logo")
home.addEventListener("click",toHome)
function toHome(){
    if (projectsList.style.display == 'none' && employee.style.display == 'block'){
        employee.style.display = 'none'
        projectsList.style.display = 'block'
    }
}
// log in button
let login = document.querySelector("#logIn");
login.onclick = function (){
    loginWindow.style.display = 'block'
}

// start and end buttons 
let startB = document.querySelector("#startB");
let Stime = document.querySelector("#startedTime")
let endB = document.querySelector("#endB");
let Etime = document.querySelector("#finishingTime")

let tbodyE = document.querySelector("#tbodyE")
endB.disabled = true
startB.onclick = function (){
    if(Stime.innerHTML != ""){
        Stime.innerHTML = ""
        Etime.style.display = "none"
    }
    const d = new Date();
    Stime.innerHTML = `Started : ${d.toLocaleString().slice(10)}`
    Stime.style.padding = "2% 1%";
    let Id = ["nameE","projectName","started","finished","wHours","date","state"]
    let tr = document.createElement("tr");
    tbodyE.prepend(tr)
    for(let i =0;i<7;i++){
        let th = document.createElement("th")
        th.id = Id[i];
        tr.appendChild(th);
    }
    let thN = document.querySelector('#nameE')
    let thP = document.querySelector('#projectName')
    let thS = document.querySelector('#started')
    let thF = document.querySelector('#finished')
    let thH = document.querySelector('#wHours')
    let thD = document.querySelector('#date')
    let thSt = document.querySelector('#state')
    thN.innerHTML = window.localStorage.employee_Name;
    thP.innerHTML = window.localStorage.projectName;
    thSt.innerHTML = `active`
    thSt.style.color = "green"
    window.localStorage.startTime = `${d.toLocaleString().slice(10)}`
    thS.innerHTML = `${d.toLocaleString().slice(10)}`;
    thD.innerHTML = `${d.toLocaleString().slice(0,8)}`;
    startB.disabled = true
    endB.disabled = false
    document.querySelector("#logo").removeEventListener("click",toHome)
    // document.querySelector("#logout").events = null
    endB.onclick = function (){
        document.querySelector("#logo").addEventListener("click",toHome)
        Etime.style.display = ""
        startB.disabled = false
        endB.disabled = true
        const E = new Date();
        Etime.innerHTML = `Finished : ${E.toLocaleString().slice(10)}` ;
        Etime.style.padding = "2% 1%";
        thF.innerHTML = `${E.toLocaleString().slice(10)}`
        window.localStorage.finishingTime = `${E.toLocaleString().slice(10)}`
        thSt.innerHTML = `Not active`
        thSt.style.color = "red"
        thH.innerHTML = `${+(thF.innerHTML.slice(0,1)) - +(thS.innerHTML.slice(0,1))} : ${+(thF.innerHTML.slice(3,5)) - +(thS.innerHTML.slice(3,5))}`
        // send data API By fetch
        let sendData = {
            name : window.localStorage.employee_Name,
            Pname : window.localStorage.projectName,
            startT : window.localStorage.startTime,
            endT : window.localStorage.finishingTime,
            date : `${d.toLocaleString().slice(0,9)}`
        }
        fetch(`${window.origin}/resault`,{
            method : 'POST',
            body : JSON.stringify(sendData),
            Headers: {"content-type" : "application/json"},
            caches : "no-cache",
            Credential : "include"
        })
    }
}

// log out button
let logOut = document.querySelector("#logout")
logOut.onclick = function (){
        admin.style.display = "none"
        projectsList.style.display = 'none'
        employee.style.display = 'none'
        loginWindow.style.display = 'block'
        mainHeader.style.display = "none"
        // document.querySelector("#mainheader").style.display = "none"
}

// temporary 
let loginForm = document.querySelector('#loginForm')
let admin = document.querySelector("#admin")
let classes = document.querySelector("#class")

let tableP = document.querySelector("#tableP")
let tableA = document.querySelector("#tableA")

let add = document.querySelector("#adminFooter")

let addWindowE = document.querySelector("#addS")
let addwindowP = document.querySelector("#addSP")
let x = true
database = true
database_Observe = true
loginForm.onsubmit = function (){
    // admin account
    fetch("/static/js/account.json")
    .then(response => response.json())
    .then(data => chackAccount(data));
    let counterFA = 0
    function chackAccount(data){
        const oneA = data[0]
        let numberAccount = Object.keys(oneA).length
        for(const key in oneA){
            if (document.querySelector("#username").value === oneA[`user${counterFA+1}`].username && document.querySelector('#password').value === oneA[`user${counterFA+1}`].password && oneA[`user${counterFA+1}`].power === "Admin"){
                if(database == true){
                    // account API (GET) ======>>>>>> 
                    fetch("/static/js/account.json")
                    .then(response => response.json())
                    .then(data => showInfo(data));
                    function showInfo(data){
                        let tableBA = document.querySelector('#tbodyA')
                        const oneA = data[0]
                        let id = 1
                        for(account in oneA ){
                            let tr = document.createElement("tr")
                            tableBA.prepend(tr);
                            let A = oneA[`user${id}`]
                            let th = document.createElement("th")
                            tr.appendChild(th)
                            th.innerHTML = id
    
                            let idFth = ["employee","usernameT","passwordT","powerT"]
                            let c = 0
                            for(const key in A ) {
                                let th = document.createElement("th")
                                th.innerHTML = `${A[key]}`;
                                tr.appendChild(th)
                                th.id = idFth[c]
                                c = c + 1
                            }         
                            id =id + 1
                            // delet data and edit it
                            let controlPanal = document.createElement("th")
                            controlPanal.id = `controlPanal`
                            tr.appendChild(controlPanal)
                            let deletA = document.createElement("button")
                            deletA.id = "deletA"
                            deletA.innerHTML = `Delet`
                            controlPanal.appendChild(deletA)
                            // let editA = document.createElement("button")
                            // editA.id = "editA"
                            // editA.innerHTML = `Edit`
                            // controlPanal.appendChild(editA)
                        }
                    } 
                    // report API (GET) ======>>>>>>
                    fetch("/static/js/works.json")
                    .then(response => response.json())
                    .then(data => showReport(data));
                    function showReport(data){
                        let tableBE = document.querySelector('#tbodyE')
                        const oneA = data[0]
                        let id = 1
                        for(account in oneA ){
                            let tr = document.createElement("tr")
                            tableBE.prepend(tr);
                            let A = oneA[`work${id}`]
                            let Id = ["nameE","project_Name","started_Time","finished_Time","workHoure"]
                            let c = 0
                            for(const key in A ) {
                                if(c == 4){
                                    let th = document.createElement("th")
                                    th.innerHTML = `${+(A['endT'].slice(0,1)) - +(A['startT'].slice(0,1))} : ${+(A['endT'].slice(3,5)) - +(A['startT'].slice(3,5))}`;
                                    tr.appendChild(th)
                                    th.id = Id[c];    
                                    let th2 = document.createElement("th")
                                    th2.innerHTML = `${A['date']}`;
                                    tr.appendChild(th2)
                                    // th2.id = 'date';    
                                }else{
                                    let th = document.createElement("th")
                                    th.innerHTML = `${A[key]}`;
                                    tr.appendChild(th)
                                    th.id = Id[c];    
                                }
                                c = c + 1
                            }         
                            let th = document.createElement("th")
                            th.innerHTML = `Not Active`;
                            th.style.color = "red"
                            tr.appendChild(th)
                            th.id = "state";
                            id = id + 1
                        }
                    }
                    // projects API (GET) ======>>>>>>
                    fetch("/static/js/projects.json")
                    .then(response => response.json())
                    .then(data => showProjects(data));
                    function showProjects(data){
                        let tableBE = document.querySelector('#tbodyP')
                        const oneA = data[0]
                        let id = 1
                        for(account in oneA ){
                            let tr = document.createElement("tr")
                            tableBE.prepend(tr);
                            let A = oneA[`project${id}`]
                            let Id = ["projectName","date","descriptions"]
                            let c = 0
                            for(const key in A ) {
                                let th = document.createElement("th")
                                th.innerHTML = `${A[key]}`;
                                tr.appendChild(th)
                                th.id = Id[c];    
                                c = c + 1
                            }         
                            id = id + 1
                            let controlPanal = document.createElement("th")
                            controlPanal.id = `controlPanal`
                            tr.appendChild(controlPanal)
                            let deletP = document.createElement("button")
                            deletP.id = "deletP"
                            deletP.innerHTML = `Delet`
                            controlPanal.appendChild(deletP)

                        }
                    }
                    database = false
                }
                //  END APIS FOR ACCOUNTS & PROJECTS & REPORTS
                document.querySelector("#addBP").onclick = function (){
                    const d = new Date();
                    let thList = [document.querySelector("#Pname").value,d.toLocaleString().slice(0,9),document.querySelector("#description").value]
                    let Id = ["projectName","date","descriptions"]
                    let tableBP = document.querySelector('#tbodyP')
                    let tr = document.createElement("tr")
                    tableBP.prepend(tr);
                    for(let i =0 ;i<3;i++){
                        let th = document.createElement("th")
                        th.innerHTML = `${thList[i]}`;
                        tr.appendChild(th)
                        th.id = Id[i];       
                    }
                    let controlPanal = document.createElement("th")
                    controlPanal.id = `controlPanal`
                    tr.appendChild(controlPanal)
                    let deletP = document.createElement("button")
                    deletP.id = "deletP"
                    deletP.innerHTML = `Delet`
                    controlPanal.appendChild(deletP)
                    // END => Projects API
                }
                
                document.querySelector("#logIn").style.display = "none"
                admin.style.display = "block"
                projectsList.style.display = 'none'
                employee.style.display = 'none'
                loginWindow.style.display = 'none' 
                add.style.display = "none"
                mainHeader.style.display = ''
                let tableE = document.querySelector("#tableE")
                if(document.querySelector("#E") == null){
                    tableA.style.display = `none`
                    tableP.style.display = `none`
                    let nav = document.querySelector("#headerNav")
                    let idFa = ["E","A","P"]
                    for (let i =0;i<3;i++){
                        let a = document.createElement("a");
                        a.id = idFa[i]
                        nav.prepend(a)
                    }
                    /////////////////////////////////////// delet All works Data
                    if (document.querySelector("#deleteAllData") == null){
                        let deleteAllData = document.createElement("button")
                        deleteAllData.id = "deleteAllData"
                        deleteAllData.innerHTML = "clear All data"
                        document.querySelector("#worksForm").prepend(deleteAllData)
                    }
                    deleteAllData.addEventListener("click",function(){
                        let works_name = document.querySelectorAll("#nameE")
                        if (confirm(`Are you sure ? \n ""You definitely know that is this data will delete for ever""\n Please submit your opinion`) == true){
                            for(let w=0;w<works_name.length;w++){
                            let delet_works = {
                                works_name_delete : `${works_name[w].innerHTML}`
                            }
                            fetch(`${window.origin}/delet_all_works`,{
                                    method : 'POST',
                                    body : JSON.stringify(delet_works),
                                    Headers: {"content-type" : "application/json"},
                                    caches : "no-cache",
                                    Credential : "include"
                                })
                            }
                            document.querySelector("#tbodyE").innerHTML = null
                        }
                    })


                    let EA = document.querySelector("#E")
                    let AA = document.querySelector("#A")
                    let PA = document.querySelector("#P")
                    EA.innerHTML = `Employees`
                    AA.innerHTML = `Accounts`
                    PA.innerHTML = `Projects`
                    EA.style.color = "brown"
                    PA.style.color = "white"
                    AA.style.color = "white"
                    EA.onclick = function (){
                        tableE.style.display = "";
                        classes.innerHTML = "The employees"
                        tableA.style.display = `none`
                        tableP.style.display = `none`
                        add.style.display = "none"
                        EA.style.color = "brown"
                        PA.style.color = "white"
                        AA.style.color = "white"
                        document.querySelector("#deleteAllData").style.display = ""
                    }
                    PA.onclick = function (){
                        classes.innerHTML = "The projects" 
                        tableE.style.display = 'none'
                        tableA.style.display = `none`
                        tableP.style.display = ``
                        add.style.display = ""
                        document.querySelector("#deleteAllData").style.display = "none"

                        EA.style.color = "white"
                        PA.style.color = "brown"
                        AA.style.color = "white"
                        add.onclick = function (){
                            addwindowP.style.display = 'block'

                            addwindowP.onsubmit = function (){
                                let divP = document.createElement("div")
                                divP.id = "project"
                                let titleP = document.createElement("h1")
                                divP.appendChild(titleP)
                                titleP.innerHTML = document.querySelector("#Pname").value
                                projectsList.appendChild(divP)
                                
                                // Projects API (POST)
                                const d = new Date();
                                let sendDataP = {
                                    projectName : `${document.querySelector("#Pname").value}`,
                                    date : `${d.toLocaleString().slice(0,9)}`,
                                    description : `${document.querySelector("#description").value}`
                                }
                                fetch(`${window.origin}/projects`,{
                                    method : 'POST',
                                    body : JSON.stringify(sendDataP),
                                    Headers: {"content-type" : "application/json"},
                                    caches : "no-cache",
                                    Credential : "include"
                                })
                                // END => Projects API
                                addwindowP.style.display = 'none'

                            }
                            document.querySelector("#hideWindowP").onclick = function (){
                                addwindowP.style.display = 'none'
                            }
                        }
                        ///////////////////////////////////////////////////// delet Project
                        let delet_button = document.querySelectorAll("#deletP")
                        let project_name = document.querySelectorAll("#projectName")
                        for(let c =0;c<delet_button.length;c++){
                            delet_button[c].addEventListener("click",function(){
                                console.log(project_name[c].innerHTML)
                                project_name[c].parentNode.remove()
                                let delet_project = {
                                    project_name_delet : `${project_name[c].innerHTML}`
                                }
                                fetch(`${window.origin}/delet_project`,{
                                    method : 'POST',
                                    body : JSON.stringify(delet_project),
                                    Headers: {"content-type" : "application/json"},
                                    caches : "no-cache",
                                    Credential : "include"
                                })
                            }) 
                        }
                    }
                    AA.onclick = function (){
                        classes.innerHTML = "The Accounts"
                        tableE.style.display = 'none' 
                        tableP.style.display = `none`
                        tableA.style.display = ``
                        add.style.display = ""
                        document.querySelector("#deleteAllData").style.display = "none"

                        EA.style.color = "white"
                        PA.style.color = "white"
                        AA.style.color = "brown"
                        add.onclick = function (){
                            addWindowE.style.display = 'block'

                            document.querySelector("#loginFormA").onsubmit = function (){
                                // Projects API (POST)
                                const d = new Date();
                                let sendDataP = {
                                    employeeName : `${document.querySelector("#Ename").value}`,
                                    username : `${document.querySelector("#usernameA").value}`,
                                    password : `${document.querySelector("#passwordA").value}`,
                                    power : `${document.querySelector("#powerS").value}`
                                }
                                fetch(`${window.origin}/account`,{
                                    method : 'POST',
                                    body : JSON.stringify(sendDataP),
                                    Headers: {"content-type" : "application/json"},
                                    caches : "no-cache",
                                    Credential : "include"
                                })
                                // END => account API
                                let id = 0
                                let tableBA = document.querySelector('#tbodyA')
                                let tr = document.createElement("tr")
                                tableBA.prepend(tr);
                                let th = document.createElement("th")
                                tr.appendChild(th)
                                th.innerHTML = id
                                let idFth = ["employee","usernameT","passwordT","powerT"]

                                let inner = [document.querySelector("#Ename").value,document.querySelector("#usernameA").value,document.querySelector("#passwordA").value,document.querySelector("#powerS").value]
                                for(let i =0 ;i<4;i++) {
                                    let th = document.createElement("th")
                                    th.innerHTML = `${inner[i]}`;
                                    tr.appendChild(th)
                                    th.id = idFth[i]  
                                }         
                                id =id + 1
                                // delet data and edit it
                                let controlPanal = document.createElement("th")
                                controlPanal.id = `controlPanal`
                                tr.appendChild(controlPanal)
                                let deletA = document.createElement("button")
                                deletA.id = "deletA"
                                deletA.innerHTML = `Delet`
                                controlPanal.appendChild(deletA)
                                
                                document.querySelector("#Ename").value = ""
                                document.querySelector("#usernameA").value = ""
                                document.querySelector("#passwordA").value = ""
                                // hide the window after submit
                                addWindowE.style.display = 'none'

                            }
                            document.querySelector("#hideWindowA").onclick = function (){
                                addWindowE.style.display = 'none'
                            }
                        }
                        /////////////////////////////////////// delet account
                        let delet_button_account = document.querySelectorAll("#deletA")
                        let account_name = document.querySelectorAll("#employee")
                        for(let s =0;s<delet_button_account.length;s++){
                            delet_button_account[s].addEventListener("click",function(){
                                console.log(account_name[s].innerHTML)
                                account_name[s].parentNode.remove()
                                let delet_account = {
                                    account_name_delet : `${account_name[s].innerHTML}`
                                }
                                fetch(`${window.origin}/delet_account`,{
                                    method : 'POST',
                                    body : JSON.stringify(delet_account),
                                    Headers: {"content-type" : "application/json"},
                                    caches : "no-cache",
                                    Credential : "include"
                                })
                            }) 
                        }
                    }
                        
                }
                
                break
            }else if (document.querySelector("#username").value === oneA[`user${counterFA+1}`].username && document.querySelector('#password').value === oneA[`user${counterFA+1}`].password && oneA[`user${counterFA+1}`].power === "Employee"){
                window.localStorage.employee_Name = oneA[`user${counterFA+1}`].employeeName
                employee.style.display = 'none'
                projectsList.style.display = 'block'
                mainHeader.style.display = ""
                loginWindow.style.display = "none"
                if(document.querySelector("#A") != null){

                    document.querySelector("#A").remove()
                    document.querySelector("#P").remove()
                    document.querySelector("#E").remove()
                }
                document.querySelector("#logIn").style.display = "none"
                // projects API (GET) ======>>>>>>
                fetch("/static/js/projects.json")
                .then(response => response.json())
                .then(data => showProjects(data));
                function showProjects(data){
                    if(x == true){
                        const oneA = data[0]
                        let id = 1
                        for(account in oneA ){
                            let A = oneA[`project${id}`]
                            // addition to projects section 
                            let divFprojects = document.createElement("div")
                            let h1 = document.createElement("h1")
                            projectsList.appendChild(divFprojects)
                            divFprojects.appendChild(h1)
                            divFprojects.id = "project"
                            h1.innerHTML = A['projectName']   
                            id = id + 1
                        }
                        x = false
                    }
                    // single page application
                    let projectsIn = document.querySelectorAll("#project")
                    for(let k =0;k<projectsIn.length;k++){
                        projectsIn[k].addEventListener("click",function(){
                            projectsList.style.display = 'none'
                            employee.style.display = 'block'
                            window.localStorage.projectName = projectsIn[k].innerText
                        }) 
                    }
                }
                break
            }
            else{
                counterFA +=1
                if(counterFA == numberAccount){
                    alert("Incorrect username or password ")
                }
            }
        }
    }
}
