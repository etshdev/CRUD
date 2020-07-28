let proudctNameInp =document.getElementById("proudctNameInp");
let proudctPriceInp=document.getElementById("proudctPriceInp");
let proudctcategoryInp = document.getElementById("proudctcategoryInp");
let proudctdescInp=document.getElementById("proudctdescInp");
let btnAddProudct=document.getElementById("btnAddProudct");
let searchProudct =document.getElementById("searchProudct");
let addSubmit=document.getElementById("addSubmit");



let proudctList;
if(localStorage.getItem("proudct")==null)
{
    proudctList=[];
}
else
{
    proudctList=JSON.parse(localStorage.getItem('proudct'));
    displayProudct();
};
function addProudct()
{
    if(proudctNameInp.value!="" && proudctPriceInp.value !="" && proudctcategoryInp.value !="" && proudctdescInp.value !="")
        {
            let proudct =
            {
                name:proudctNameInp.value,
                price:proudctPriceInp.value,
                category:proudctcategoryInp.value,
                desc:proudctdescInp.value
            
            }
            proudctList.push(proudct);
            localStorage.setItem("proudct",JSON.stringify(proudctList));
            displayProudct();
            clearForm();
            
        }
    else
    {
        alert("Fill Empty fields")
    }    
}
    
function displayProudct()
{
  let content=``;

  for(let i=0 ; i<proudctList.length;i++)
  {
      content+=` <tr>
      <td>`+proudctList[i].name+`</td>
      <td>`+proudctList[i].price+`</td>
      <td>`+proudctList[i].category+`</td>
      <td>`+proudctList[i].desc+`</td>
      <td> <button class="btn btn-success" onclick="updateProudct(`+i+`)"> Update </button> </td>
      <td> <button class="btn btn-danger" onclick="deleteProudct(`+i+`)" id="delete`+i+`"> Delete </button></td>
  </tr>
`
  }
  document.getElementById("rowResult").innerHTML=content;
};
function clearForm()
{
 proudctNameInp.value="";
 proudctPriceInp.value="" ;
 proudctcategoryInp.value="" ;
 proudctdescInp.value="" ;
};
function deleteProudct(index)
{
   
    proudctList.splice(index,1);
    localStorage.setItem("proudct",JSON.stringify(proudctList));
    displayProudct();


};

btnAddProudct.addEventListener("click",function()
{
    addProudct();
});

function search(term)
{
    let content=``;
    let Txt=``;
  for(let i=0;i<proudctList.length;i++)
  {
    if(  proudctList[i].name.includes(term)==true)
    {
        Txt=proudctList[i].name.replace(term,`<span style=" font-weight: bold ;color:blue">`+term+`</span>`)
        content+=`<tr>
        <td>`+Txt+`</td>
        <td>`+proudctList[i].price+`</td>
        <td>`+proudctList[i].category+`</td>
        <td>`+proudctList[i].desc+`</td>
        <td> <button class="btn btn-success" onclick="updateProudct(`+i+`)"> Update </button> </td>
        <td> <button class="btn btn-danger" onclick="deleteProudct(`+i+`)"  id="delete`+i+`"> Delete </button></td>
    </tr>`

    }
    
   
  }

  document.getElementById("rowResult").innerHTML=content;


};

searchProudct.addEventListener("keyup",function(){
    search(searchProudct.value);
    
});

function updateProudct(index)
{
    for(let i=0 ;i<proudctList.length;i++)
    {
        proudctNameInp.value=proudctList[index].name;
        proudctPriceInp.value=proudctList[index].price;
        proudctcategoryInp.value=proudctList[index].category;
        proudctdescInp.value=proudctList[index].desc;
        var del=document.getElementById(`delete`+index+``);
    }
    addSubmit.innerHTML=`<button class="btn btn-info" onclick="update(`+index+`)">Update</button>`
    
    del.style.display="none";
    
    
}

function update(index)
{
    for(let i=0 ;i<proudctList.length;i++)
    {
        proudctList[index].name=proudctNameInp.value,
        proudctList[index].price=proudctPriceInp.value,
        proudctList[index].category=proudctcategoryInp.value,
        proudctList[index].desc=proudctdescInp.value
    }
    localStorage.setItem("proudct",JSON.stringify(proudctList));
    clearForm();
    displayProudct();
    addSubmit.innerHTML=`<button class="btn btn-info " id="btnAddProudct">add Proudct</button>`
    
    
}

