cnt=  Number(document.querySelector("#tblBody").lastChild.children[0].innerText);
JSON.parse(JSdbk.lista).datos.forEach((regis, ix) => {
    elem = agrDiv("divTableRow" ,"" ,document.querySelector("#tblBody") );
    agrDiv("divTableCell" ,ix + 1 +cnt,elem);
    regis.forEach((cel, idx) => agrDiv("divTableCell", cel ,elem ,idx + 1).addEventListener('click', e => {
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

document.querySelector("#_last").value = document.querySelector("#tblBody").lastChild.children[1].innerText;
