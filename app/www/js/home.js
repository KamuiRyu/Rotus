$$("#confSair").click(function() {
    myApp.confirm('Tem certeza que deseja sair de sua conta?', "Deslogar", function() {
        localStorage.removeItem("logado");
        localStorage.setItem("code", null);
        window.location.href = "index.html";
    });
})
$$("#QrCode").click(function() {
    var xhttp = new XMLHttpRequest(),
        logado = localStorage.getItem("logado"),
        user = JSON.parse(logado),
        code = localStorage.getItem("code"),
        dados = "txtCode=" + code + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1" + "&txtID=" + user.id;
    myApp.showPreloader("CARREGANDO...");
    setTimeout(function() {
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState > 3 && xhttp.status == 200) {
                if (xhttp.responseText != false) {
                    localStorage.setItem("code", xhttp.responseText);
                    getCode = localStorage.getItem("code");
                    document.getElementById("alunoQrCode").src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + xhttp.responseText;
                } else {

                }
            }
        };
        xhttp.open("POST", "http://www.rotussecurity.com.br/api/home.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(dados);
        myApp.hidePreloader();
    }, 2000);
});