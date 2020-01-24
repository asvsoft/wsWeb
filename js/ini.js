const dvCont = document.querySelector("#content");
const dvHead = document.querySelector("#header");
const lbCuso = document.querySelector("#lbCuso");
const lbUsr = document.querySelector("#lbUsr");
const sMenu = document.querySelector("#sMenu");
let logoMenu = document.querySelector("#logoMenu");

const sockAddres = "ws://" + data.socket;
let gObj = new Object();
let JSdbk = JSON.parse("{}"); // JS del Back
let JSRel = JSON.parse("{}"); // Casos Relacionados
let usr = "";
let nomUsr = "";
let jsCont = null;
let inht = "";
let selReg = null;
let pgIdx = -1;
let dvAct = null;

console.log(sockAddres);

let fmtNum = (dv, tip, val) => {
    return val;
};

let fmtFecha = (dv, tip, val) => {
    return val;
};




ldCuso('ini', 'login', 0);


function ldCuso(cusop, cuso, platfrm, rol) {

    let strJ = "input[shk]";
    if (pgIdx != -1) {
        strJ += "[ix='" + pgIdx + "']";
    };

    let lista = document.querySelectorAll(strJ);
    strJ = "";
    lista.forEach(function (elem) {
        strJ += "\"" + elem.name + "\":\"" + elem.value + "\",";
    });

    strJ = "{" + strJ
        + "\"cusop\":\"" + cusop
        + "\",\"cuso\":\"" + cuso
        + "\",\"platf\":\"" + platfrm
        + "\",\"ss\":\"22\","
        + "\"rol\":\"-1\""
        + "}"
        ;

    let JSObj = JSON.parse(strJ);
    strJ = JSON.stringify(JSObj);
     

    let miWS = new WebSocket(sockAddres);


    miWS.addEventListener('error', function (event) {
        console.log('Error WebSocket: ', event );
     });
 
    // miWS.addEventListener('close', function (event) {
    //    console.log('Cerrando WebSocket: ', event);
    // });
 

    miWS.onopen = function () {
//                console.log("abriendo 1 ");
        miWS.send(strJ);
//                console.log("abriendo 2 ");
    };

    miWS.onmessage = function (evento) {
        //console.log(evento.data);

        JSdbk = JSON.parse(evento.data);            

        if (JSdbk.hasOwnProperty("excep")) {
            alert(JSdbk.excep);
            throw JSdbk.excep
        };

        lbCuso.textContent = JSdbk.lbCuso;

        console.log(JSdbk.nWIN);


        if (JSdbk.nWIN == 1) {
            dvCont.innerHTML = "";
            sMenu.innerHTML = "";
        };

        if (JSdbk.ldFrm !== 'x')
            //dvCont.innerHTML = "";
            fetch("html/" + JSdbk.ldFrm + ".html").then(function (response) {
                return response.text().then(function (text) {
                    //                lbCuso.textContent = JSdbk.lbCuso;
                    dvCont.innerHTML = text;
                });
            });

        if (JSdbk.ldJS !== 'x') {
            let jsDin = document.querySelector("#JSDin");
            if (jsDin) jsDin.remove();

            jsDin = document.createElement("script");
            jsDin.id = 'JSDin';
            jsDin.type = "text/javascript";
            jsDin.src = "js/" + JSdbk.ldJS + ".js";
            document.body.appendChild(jsDin);
        }

    };

    
    miWS.onclose = function () {
        console.log("cerrando");
    };

    miWS.onerror = function (event) {
        console.log(event.type," -- no pudo",event);
    };
    
}


function agrDiv(cName, valor, elm, idx) {
    let nDiv = document.createElement("div");
    nDiv.className = cName;
    nDiv.innerText = valor;
    let fmt = null;
    let sty = null;
    let dvr = document.querySelector("#cusop_org,[ix='" + pgIdx + "']");


    if (dvr.hasAttribute("fmt")) {
        fmt = dvr.getAttribute("fmt");
        fmt = JSON.parse(fmt);
    }
    if (dvr.hasAttribute("sty")) {
        sty = dvr.getAttribute("sty");
        sty = JSON.parse(sty);
    }

    if (idx) {
        if (fmt && fmt[idx]) {
            const s= eval(fmt[idx].replace('$valor', valor));
            nDiv.innerText = s;
        }
        if (sty && sty[idx]) {
            nDiv.setAttribute("style", sty[idx]);
        }
    }
    nDiv.setAttribute("shkData", valor);
    elm.appendChild(nDiv);
    return nDiv;
}
