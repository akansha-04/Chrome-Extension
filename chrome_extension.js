const inputBtn=document.getElementById('input-btn')
let myLeads=[]
const inputEl=document.getElementById('input-el')
const ulEl=document.getElementById("ul-el")
const leads_from_ls=JSON.parse(localStorage.getItem("myLeads"))
const deleteBtn = document.getElementById('del-btn')

//falsey
// false 0 " " null undefined NaN

if(leads_from_ls){
    myLeads=leads_from_ls
    render()
}

const tabBtn = document.getElementById("tab-btn")
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // Grab url from current tab
            myLeads.push(tabs[0].url)
            // save myleads to local storage
            localStorage.setItem("myLeads",JSON.stringify(myLeads))
            render()
    })
    
})


inputBtn.addEventListener("click",function(){
    
    myLeads.push(inputEl.value)
    // save myleads to local storage
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render()
        
})

deleteBtn.addEventListener("dblclick",function(){
    myLeads=[]
    localStorage.clear()
    render()
})

function render(){
    let listItems=""
    for (let i=0;i<myLeads.length;i++){
        listItems += `
        <li>
            <a target='_blank' href='${myLeads[i]}'>
                ${myLeads[i]}
            </a>
        </li>
        `
    
    }
    ulEl.innerHTML=listItems
    inputEl.value="";

}
