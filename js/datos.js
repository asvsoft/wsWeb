var data = {
      //socket: "localhost:8080/wsSock/sock"
    socket: "savadyo.com:8082/wsSock/sock"
};

function addDiv() {
    alert("Agrega Div!");
}

function detalle() {    
    let totDv = document.querySelector("#totDv").value;
    let idxDv = document.querySelector("#idxDv").value;
    let hidDet= campo => {
        actDv="#dv"+idxDv;
        actSp="#sp"+idxDv;
        document.querySelector(actDv).style.display='none';    
        document.querySelector(actSp).style.display='none';     
    };

    hidDet();
    idxDv++;
    if (idxDv == totDv) idxDv = 0;
    hidDet();
    
    document.querySelector(actDv).style.display='block' ;
    document.querySelector(actSp).style.display='block' ;
    document.querySelector("#idxDv").value = idxDv ;
}

function newDiv() {
   pgIdx++ ;
   dvAct= document.createElement("div");
   dvAct.setAttribute("id" ,"dv"+pgIdx );
   dvCont.appendChild(dvAct);
}