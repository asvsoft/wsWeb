selReg = null;
newDiv();
dvAct.style.display="block";
dvAct.className="divTable blueTable";
inht = "";
inht += '      <div class="divTableHeading" >';
inht += '        <div id="rngHead" class="divTableRow" ix=' + pgIdx +' ></div> ';
inht += '      </div>';
inht += '      <div id="tblBody" class="divTableBody" ix=' + pgIdx +'> </div>';
inht += '      <input type="hidden" shk name="cusop_org" value="' + JSdbk.cusop + '" id="cusop_org" ix=' + pgIdx +' >';
inht += '      <input type="hidden" shk name="cuso_org" value="' + JSdbk.cuso + '" id="cuso_org" ix=' + pgIdx +'  > ';
dvAct.innerHTML=inht;

//document.querySelector("#cusop_org").addEventListener("click", e => {
//    alert(e.target.value);
//});

carvar();

function carvar() {

///////////////// Menu /////////////////////////    
    let nsp= document.createElement("span");
    nsp.className="titu";
    nsp.style.top="45px";
    nsp.style.left="10px";
    nsp.style.display="none";
    nsp.id="sp2";
    //dvHead.appendChild(nsp);
    sMenu.appendChild(nsp);

    nsp= document.createElement("span");
    nsp.className="titu";
    nsp.style.top="45px";
    nsp.style.left="10px";
    nsp.style.display="none";
    nsp.id="sp1";
    //dvHead.appendChild(nsp);
    sMenu.appendChild(nsp);

    nsp= document.createElement("span");
    nsp.className="titu";
    nsp.style.top="45px";
    nsp.style.left="10px";
    nsp.style.display="block";
    nsp.id="sp0";
//    dvHead.appendChild(nsp);
    sMenu.appendChild(nsp);

    const iSel = document.createElement("i");
    const iUp = document.createElement("i");
    const iDn = document.createElement("i");
    const iFetch = document.createElement("i");
    let iDet = document.createElement("i");
    let cnt = 0;

    iSel.className = "far fa-arrow-alt-circle-right";
    iUp.className  = "far fa-arrow-alt-circle-up";
    iDn.className  = "far fa-arrow-alt-circle-down";

   
    iDet.className = "far fa-file";
    iFetch.className = "fas fa-angle-double-down";
    
    iSel.addEventListener("click", e => selReg.scrollIntoView());
    iUp.addEventListener("click", e => document.querySelector(".divTable").scrollIntoView());
    iDn.addEventListener("click", e => document.querySelector(".divTable").scrollIntoView(false));
    iFetch.addEventListener("click", e => ldCuso('ini', 'fetch', 0));
    iDet.addEventListener("click", e => detalle());

    iSel.setAttribute("title", "Registro Seleccionado");
    iUp.setAttribute("title", "Primer registro");
    iDn.setAttribute("title", "Ultimo registro");
    iFetch.setAttribute("title", "Mas registros");
    iDet.setAttribute("title", "Detalle");

    nsp.appendChild(iUp);
    nsp.appendChild(iDn);
    nsp.appendChild(iSel);
    nsp.appendChild(iDet);
    nsp.appendChild(iFetch);

    nsp.childNodes.forEach(h => {
        h.innerHTML = '&nbsp;&nbsp;';
        h.addEventListener("mouseenter", e => e.target.classList.toggle("fas"));
        h.addEventListener("mouseleave", e => e.target.classList.toggle("fas"));
    });


    iDet = document.createElement("i");
    iDet.className = "far fa-file";
    iDet.innerHTML = '&nbsp;&nbsp;';
    iDet.addEventListener("click", e => detalle());
    iDet.setAttribute("title", "Detalle 1");
    iDet.addEventListener("mouseenter", e => e.target.classList.toggle("fas"));
    iDet.addEventListener("mouseleave", e => e.target.classList.toggle("fas"));
    document.querySelector("#sp1").appendChild(iDet);

    iDet = document.createElement("i");
    iDet.className = "far fa-file";
    iDet.innerHTML = '&nbsp;&nbsp;';
    iDet.addEventListener("click", e => detalle());
    iDet.setAttribute("title", "Detalle 2");
    iDet.addEventListener("mouseenter", e => e.target.classList.toggle("fas"));
    iDet.addEventListener("mouseleave", e => e.target.classList.toggle("fas"));
    document.querySelector("#sp2").appendChild(iDet);




//////////////// Llenamos Datos ////////////////////    
    let fmt = JSON.parse("{}");
    let sty = JSON.parse("{}");

    if (JSdbk.fmt.includes("Format")) {
        fmt = JSON.parse(JSdbk.fmt)["Format"];
        document.querySelector("#cusop_org,[ix='"+pgIdx+"']").setAttribute("fmt", JSON.stringify(fmt));
    }

    if (JSdbk.fmt.includes("Style")) {
        sty = JSON.parse(JSdbk.fmt)["Style"];
        document.querySelector("#cusop_org,[ix='"+pgIdx+"']").setAttribute("sty", JSON.stringify(sty));
    }


    let elem = document.querySelector("#rngHead,[ix='"+pgIdx +"']");
    let nInp = null;
    let agrVal = campo => {
        nInp = document.createElement("input");
        nInp.setAttribute("name", campo);
        nInp.setAttribute("id", campo);
        nInp.setAttribute("shk", "");
        nInp.setAttribute("type", "hidden");
        nInp.setAttribute("ix", pgIdx);
        elem.appendChild(nInp);
    };

    agrDiv("divTableHead", "Num", elem);
    agrVal("Num");
    JSON.parse(JSdbk.lista).cols.forEach(col => {
        agrDiv("divTableHead", col, elem).addEventListener("click", e => {
            alert(e.target.innerHTML);
        });
        agrVal(col);
    });

    agrVal("_last");

    JSON.parse(JSdbk.lista).datos.forEach((regis, ix) => {
        elem = agrDiv("divTableRow", "", document.querySelector("#tblBody"));
        agrDiv("divTableCell", ix + 1 + cnt, elem);
        regis.forEach((cel, idx) => agrDiv("divTableCell", cel, elem, idx + 1).addEventListener('click', e => {
            selReg.childNodes.forEach(chNode => {
                chNode.classList.toggle("divSele");
            });

            selReg = e.target.parentNode;
            let rngHead = document.querySelectorAll("#rngHead input");
            selReg.childNodes.forEach((chNode, indx) => {
                chNode.classList.toggle("divSele");
                rngHead[indx].setAttribute("value", chNode.getAttribute("shkData"));
            });
        }));
    });

    rngHead = document.querySelectorAll("#rngHead input");
    selReg = document.querySelector("#tblBody").firstChild;
    selReg.childNodes.forEach((chNode, indx) => {
        chNode.classList.toggle("divSele");
        rngHead[indx].setAttribute("value", chNode.getAttribute("shkData"));
    });
    // Registramos el último registro recuperado (primero va el indice)
    document.querySelector("#_last").value = document.querySelector("#tblBody").lastChild.children[1].innerText;
};