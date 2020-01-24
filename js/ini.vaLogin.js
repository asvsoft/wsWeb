let xmenu = document.querySelector("#myDropdown");
lbUsr.textContent = JSdbk.lbUsr;
inht = "";

JSON.parse(JSdbk.jsRel).datos.forEach(regis => {
    inht += `<a href="javascript:ldCuso('${regis[2]}','${regis[1]}',0)">${regis[3]}</a>`;
});

xmenu.innerHTML = inht;

logoMenu.addEventListener('mouseenter', e => {
    xmenu.classList.toggle("show");
});

xmenu.addEventListener('mouseleave', e => {
    xmenu.classList.remove("show");
});