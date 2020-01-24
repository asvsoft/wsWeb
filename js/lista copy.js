dvCont.innerHTML = "";


inht = "";
inht += '  <div id="dvGen" >';
inht += '    <div id="dv0" style="display:block" class="divTable blueTable">';
inht += '      <div class="divTableHeading" >';
inht += '        <div id="rngHead" class="divTableRow"></div> ';
inht += '      </div>';
inht += '      <div id="tblBody" class="divTableBody"></div>';
inht += '    </div>';
inht += '    <div id="dv1" style="display:none;"> <h1>El Uno</h1> </div>';
inht += '    <div id="dv2" style="display:none;"> <h1>El Dos</h1> </div>';
inht += '      <input type="hidden" shk name="cusop_org" value="' + JSdbk.cusop + '" id="cusop_org" >';
inht += '      <input type="hidden" shk name="cusoh_org" value="' + JSdbk.cusoh + '" id="cusoh_org"  > ';
inht += '      <input type="hidden" id="totDv" name="totDv" value=3  > ';
inht += '      <input type="hidden" id="idxDv" name="idxDv" value=0  > ';
inht += '  </div>'
//inht +="     <div id='pag1' >El div1</div>";

dvCont.innerHTML = inht;
selReg = null;
spMenu.innerHTML = "";
//console.log(JSdbk);

document.querySelector("#cusop_org").addEventListener("click", e => {
    alert(e.target.value);
});
carvar();

function carvar() {

    const iSel = document.createElement("i");
    const iUp = document.createElement("i");
    const iDn = document.createElement("i");
    const iFetch = document.createElement("i");
    const iDet = document.createElement("i");
    let cnt = 0;

    iSel.className = "far fa-hand-point-right";
    iUp.className = "far fa-hand-point-up";
    iDn.className = "far fa-hand-point-down";
    iDet.className = "far fa-file";
    iFetch.className = "far fa-arrow-alt-circle-down";

    iSel.addEventListener("click", e => selReg.scrollIntoView());
    iUp.addEventListener("click", e => document.querySelector(".divTable").scrollIntoView());
    iDn.addEventListener("click", e => document.querySelector(".divTable").scrollIntoView(false));
    iFetch.addEventListener("click", e => ldCuso('ini', 'fetch', 0));
    iDet.addEventListener("click", e => detalle(e));

    iSel.setAttribute("title", "Registro Seleccionado");
    iUp.setAttribute("title", "Primer registro");
    iDn.setAttribute("title", "Ultimo registro");
    iFetch.setAttribute("title", "Mas registros");
    iDet.setAttribute("title", "Detalle");



    spMenu.appendChild(iDn);
    spMenu.appendChild(iSel);
    spMenu.appendChild(iUp);
    spMenu.appendChild(iDet);
    spMenu.appendChild(iFetch);

    spMenu.childNodes.forEach(h => {
        h.innerHTML = '&nbsp;&nbsp;';
        h.addEventListener("mouseover", e => e.target.classList.toggle("fas"));
        h.addEventListener("mouseout", e => e.target.classList.toggle("fas"));
    });

    let fmt = JSON.parse("{}");
    let sty = JSON.parse("{}");

    if (JSdbk.fmt.includes("Format")) {
        fmt = JSON.parse(JSdbk.fmt)["Format"];
        document.querySelector("#cusop_org").setAttribute("fmt", JSON.stringify(fmt));
        //      fmt = JSON.parse(JSdbk.fmt)["Format"];
    }

    if (JSdbk.fmt.includes("Style")) {
        sty = JSON.parse(JSdbk.fmt)["Style"];
        document.querySelector("#cusop_org").setAttribute("sty", JSON.stringify(sty));
    }

    //    document.querySelector("#cusop_org").setAttribute("agrDiv", agrDiv);

    let elem = document.querySelector("#rngHead");
    let nInp = null;
    let agrVal = campo => {
        nInp = document.createElement("input");
        nInp.setAttribute("name", campo);
        nInp.setAttribute("id", campo);
        nInp.setAttribute("shk", "");
        nInp.setAttribute("type", "hidden");
        nInp.setAttribute("type", "hidden");
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