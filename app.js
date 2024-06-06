let BASE_URL="https://latest.currency-api.pages.dev/v1/currencies";
let btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const dropdowns=document.querySelectorAll(".dropdown select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
for(currcode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText= currcode;
    newOption.value=currcode;
    if(select.name==="from" && currcode==="USD"){
        newOption.selected="selected";
    }else if(select.name === "to" && currcode==="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);
}
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  })
}

const updateFlag=(element)=>{
  let currcode=element.value;
  let countrycode= countryList[currcode];
  let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  let img= element.parentElement.querySelector("img");
  img.src= newSrc;
};

btn.addEventListener("click",async(evt)=>{
  evt.preventDefault();
  let amount=document.querySelector(".amount input");
  let amtval=amount.value;
  if(amtval <=0){
    amtval=1;
    amount.value="1";
  }
  console.log(fromCurr.value.toLowerCase());
  console.log(toCurr.value);
  const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  try{
  let response =await fetch(url);
  let data=await response.json();
  let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount=rate*amtval;
  msg.innerText=`${amtval } ${fromCurr.value } = ${finalAmount } ${toCurr.value}  `
}
  catch(e){
    let response="url declined";
    console.log(e);
  };  
});