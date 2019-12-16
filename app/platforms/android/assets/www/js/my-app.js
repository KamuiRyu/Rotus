// Initialize app
var myApp = new Framework7({
    modalTitle: 'Rotus Security',
    pushState: true,
    material: true,
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;


var mainView = myApp.addView('.view-main', {
    domCache: true,
});

// Handle Cordova Device Ready Event
function init() {
    document.addEventListener("deviceready", attCode, false)
    document.addEventListener("deviceready", onDR, false);
}

function onDR() {
    var timerCount = 0,
        logado = localStorage.getItem("logado");
    window.plugins.BackgroundJS.LockBackgroundTime(function() {}, function(msg) { console.log(msg); });
    setInterval(function() {
        console.log("Teste");
    }, 1000);
    if (logado != null) {
        window.plugin.notification.local.hasPermission(function(granted) {
            console.log('Permission has been granted: ' + granted);
        });
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate());
        tomorrow.setHours(5);
        tomorrow.setMinutes(0);
        tomorrow.setSeconds(0);
        var tomorrow_at_5_am = new Date(tomorrow);
        cordova.plugins.notification.local.schedule({
            id: 1,
            title: "Rotus Security",
            text: "Existe um novo código gerado, por favor, entre no app e atualize-o",
            icon: 'res://icon.png',
            smallIcon: 'res://icon.png',
            sound: 'res://platform_default',
            at: tomorrow_at_5_am,
            every: "day", // "minute", "hour", "week", "month", "year"
        });
    }
    document.addEventListener("pause", onPause, false);
    document.addEventListener("backbutton", backKeyDown, true);
}

function onPause() {
    var logado = localStorage.getItem("logado");
    if (logado != null) {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate());
        tomorrow.setHours(5);
        tomorrow.setMinutes(0);
        tomorrow.setSeconds(0);
        var tomorrow_at_5_am = new Date(tomorrow);
        window.plugin.notification.local.hasPermission(function(granted) {
            console.log('Permission has been granted: ' + granted);
        });
        cordova.plugins.notification.local.schedule({
            id: 1,
            title: "Novo Código",
            text: "Existe um novo código gerado, por favor, entre no app e atualize-o",
            at: tomorrow_at_5_am,
            every: "day", // "minute", "hour", "week", "month", "year"
            icon: "http://www.rotussecurity.com.br/images/logo.png",
        });
    }
}

function attCode() {
    var page = myApp.getCurrentView().activePage,
        logado = localStorage.getItem("logado"),
        user = JSON.parse(logado),
        code = localStorage.getItem("code");
    if (page.name == "index") {
        if (logado != null) {
            window.location.href = "home.html";
            $$("#index-main").css({ display: "none" });
        } else {
            $$("#index-main").css({ display: "block" });
        }
    }
    if (page.name == "home") {
        if (logado == null) {
            $$("#home-main").css({ display: "none" });
            window.location.href = "index.html";
        } else {
            $$("#home-main").css({ display: "block" });
            var xhttp = new XMLHttpRequest(),
                dados = "txtCode=" + code + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1" + "&txtID=" + user.id;
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState > 3 && xhttp.status == 200) {
                    if (xhttp.responseText != false) {
                        localStorage.setItem("code", xhttp.responseText);
                        getCode = localStorage.getItem("code");
                        document.getElementById("alunoQrCode").src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + getCode;
                    } else {

                    }
                }
            };
            xhttp.open("POST", "http://www.rotussecurity.com.br/api/home.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(dados);
        }
    } else {

    }
}

function backKeyDown(e) {
    var page = myApp.getCurrentView().activePage;
    e.preventDefault();
    if (page.name == "index") {
        myApp.confirm('Deseja mesmo sair do aplicativo?', 'SAIR DO APLICATIVO', function() {
            navigator.app.clearHistory();
            navigator.app.exitApp();
        });
    } else if (page.name == "home") {
        myApp.confirm('Deseja mesmo sair do aplicativo?', 'SAIR DO APLICATIVO', function() {
            navigator.app.clearHistory();
            navigator.app.exitApp();
        });
    } else {
        mainView.router.back();
    }
}
myApp.onPageInit('home', function(page) {
    myApp.showPreloader('CARREGANDO...');
    setTimeout(function() {
        var logado = localStorage.getItem("logado"),
            aluno = JSON.parse(logado);
        $$("#alunoFoto").attr("src", aluno.foto);
        $$("#alunoNome").html(aluno.nome);
        $$("#alunoRM").html(aluno.rm);
        $$("#alunoRG").html(aluno.rg);
        $$("#alunoCPF").html(aluno.cpf);
        $$("#alunoDTNasc").html(aluno.dtnasc);
        $$("#alunoEstado").html(aluno.estado);
        $$("#alunoCurso").html(aluno.curso);
        localStorage.setItem("code", aluno.code);
        var getCode = localStorage.getItem("code");
        document.getElementById("alunoQrCode").src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + getCode;
    }, 0);
    setTimeout(function() {
        myApp.hidePreloader();
    }, 1000)
}).trigger();

myApp.onPageInit('login', function(page) {})

myApp.onPageInit('register', function(page) {});