myApp.onPageInit('index', function(page) {
    $$("#erroAll").css({ display: "none" });
    $$("#iErroCPF").css({ display: "none" });
    $$("#iErroRM").css({ display: "none" });
    $$("#txtFoto").css({
        display: "none"
    });
    myApp.showProgressbar("#startProgress", 0, "red");
    $$("#ulCancelar").css({ display: "none" });
    $$("#divBtnAvanca").attr("style", "display:block");
    $$("#divBtnCadastrar").attr("style", "display:none");
    $$("#iErroCPF").css({ display: "none" });
    $$("#erroCPF").css({ display: "none" });
    $$("#iErroEmail").css({ display: "none" });
    $$("#erroEmail").css({ display: "none" });
    $$("#iErroSenha").css({ display: "none" });
    $$("#erroSenha").css({ display: "none" });
    $$("#iErroConfSenha").css({ display: "none" });
    $$("#erroConfSenha").css({ display: "none" });
    $$("#txtRM").val("");
    $$("#txtEmail").val("");
    $$("#txtSenha").val("");
    $$("#txtConfSenha").val("");
    $$("#txtCPF").val("");
    $$("#txtAlunoID").val("");
    $$("#txtSrcFoto").val("");
    $$("#txtFoto").attr("src", "images/photo.png");
    $$("#iErroUser").css({ display: "none" });
    $$("#erroUser").css({ display: "none" });
    $$("#iErroPass").css({ display: "none" });
    $$("#erroPass").css({ display: "none" });
    $$("#txtUsername").val("");
    $$("#txtPass").val("");
    $$("#iErroRPEmail").css({ display: "block" });
    $$("#erroRPEmail").css({ display: "block" });
    $$("#iErroRPCode").css({ display: "block" });
    $$("#erroRPCode").css({ display: "block" });
    $$("#iErroRPSenha").css({ display: "block" });
    $$("#erroRPSenha").css({ display: "block" });
    $$("#iErroRPConfSenha").css({ display: "block" });
    $$("#erroRPConfSenha").css({ display: "block" });
    $$("#txtRPEmail").removeAttr("disabled");
    $$("#txtRPEmail").val("");
    $$("#txtRPCode").removeAttr("disabled");
    $$("#txtRPCode").val("");
    $$("#txtRPSenha").val("");
    $$("#txtRPConfSenha").val("");
    $$("#erroRPConfSenha").css({ display: "none" });
    $$("#erroRPSenha").css({ display: "none" });
    $$("#erroRPCode").css({ display: "none" });
    $$("#erroRPEmail").css({ display: "none" });
    $$("#iErroRPConfSenha").css({ display: "none" });
    $$("#iErroRPSenha").css({ display: "none" });
    $$("#iErroRPCode").css({ display: "none" });
    $$("#iErroRPEmail").css({ display: "none" });
    $$("#groupSenha").attr("style", "display:none");
    $$("#groupConfSenha").attr("style", "display:none");
    $$("#groupCode").attr("style", "display:none");
})
$$("#btnRegistroNext").click(function() {
    if ((/^(\d){5,}$/.test(document.getElementById("txtRM").value.trim()) === true && CPF.validate(document.getElementById('txtCPF').value.trim()) === true)) {
        var xhttp = new XMLHttpRequest(),
            dados = "txtRM=" + document.getElementById("txtRM").value.trim() + "&txtCPF=" + document.getElementById("txtCPF").value.trim() + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1";
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState > 3 && xhttp.status == 200) {
                if (xhttp.responseText == "") {
                    $$("#erroAll").html("RM E/OU CPF NÃO ESTÃO CADASTRADOS!");
                    $$("#erroAll").css({ display: "block" });
                } else if (xhttp.responseText == "existe") {
                    $$("#erroAll").html("ALUNO JÁ ESTÁ CADASTRADO");
                    $$("#erroAll").css({ display: "block" });
                } else if (xhttp.responseText == "excluido") {
                    $$("#erroAll").html("RM E/OU CPF NÃO ESTÃO CADASTRADOS!");
                    $$("#erroAll").css({ display: "block" });
                } else {
                    obj = JSON.parse(xhttp.responseText);
                    $$("#erroAll").css({ display: "none" });
                    $$("#iErroCPF").css({ display: "block" });
                    $$("#iErroCPF").html("check");
                    $$("#iErroCPF").css({ color: "#00c638" });
                    $$("#iErroRM").css({ display: "block" });
                    $$("#iErroRM").html("check");
                    $$("#iErroRM").css({ color: "#00c638" });
                    myApp.showPreloader('CARREGANDO...');
                    setTimeout(function() {
                        $$("#confDados").css({ display: "block" });
                        $$("#txtCPF").attr('disabled', 'disabled');
                        $$("#txtRM").attr('disabled', 'disabled');
                        $$("#txtAlunoID").val(obj.id);
                        $$("#txtNome").val(obj.nome);
                        $$("#txtDTNasc").val(obj.dtnasc);
                        $$("#txtSexo").val(obj.sexo);
                        $$("#txtCurso").val(obj.curso);
                        $$("#txtFoto").css({
                            display: "block"
                        });
                        $$("#ulCancelar").css({ display: "block" });
                        $$("#divBtnAvanca").attr("style", "display:none");
                        $$("#divBtnCadastrar").attr("style", "display:block");
                        myApp.hidePreloader();
                    }, 2000)
                }
            }
        };
        xhttp.open("POST", "http://www.rotussecurity.com.br/api/cadastro_aluno.php", false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(dados);
    } else {
        if (document.getElementById("txtRM").value.trim() == "") {
            $$("#iErroRM").html("close");
            $$("#iErroRM").css({ color: "#d82b2b" });
            $$("#iErroRM").css({ display: "block" });
            $$("#erroRM").css({ display: "block" });
            $$("#erroRM").html("DIGITE SEU RM!");
        } else if (!/^(\d){5,}$/.test(document.getElementById("txtRM").value.trim()) === true) {
            $$("#iErroRM").html("close");
            $$("#iErroRM").css({ color: "#d82b2b" });
            $$("#iErroRM").css({ display: "block" });
            $$("#erroRM").css({ display: "block" });
            $$("#erroRM").html("APENAS NÚMEROS, EXEMPLO DE RM(01234)");
        } else {
            $$("#iErroRM").css({ display: "block" });
            $$("#erroRM").css({ display: "none" });
            $$("#iErroRM").css({ color: "#00c638" });
            $$("#iErroRM").html("check");
        }
        if ($$("#txtCPF").val().trim().length < 11) {
            $$("#iErroCPF").html("close");
            $$("#iErroCPF").css({ color: "#d82b2b" });
            $$("#iErroCPF").css({ display: "block" });
            $$("#erroCPF").css({ display: "block" });
            $$("#erroCPF").html("CPF DEVE TER NO MÍNIMO 11 CARACTERS!");
        } else if ($$("#txtCPF").val().length >= 11) {
            if (!CPF.validate(document.getElementById('txtCPF').value.trim()) === true) {
                $$("#iErroCPF").html("close");
                $$("#iErroCPF").css({ color: "#d82b2b" });
                $$("#iErroCPF").css({ display: "block" });
                $$("#erroCPF").css({ display: "block" });
                $$("#erroCPF").html("CPF INVÁLIDO!");
            } else {
                $$("#iErroCPF").css({ display: "block" });
                $$("#iErroCPF").html("check");
                $$("#iErroCPF").css({ color: "#00c638" });
                $$("#erroCPF").css({ display: "none" });
            }
        }
    }
});
$$("#txtRM").blur(function() {
    if (document.getElementById("txtRM").value.trim() == "") {
        $$("#iErroRM").html("close");
        $$("#iErroRM").css({ color: "#d82b2b" });
        $$("#iErroRM").css({ display: "block" });
        $$("#erroRM").css({ display: "block" });
        $$("#erroRM").html("DIGITE SEU RM!");
    } else if (!/^(\d){5,}$/.test(document.getElementById("txtRM").value.trim()) === true) {
        $$("#iErroRM").html("close");
        $$("#iErroRM").css({ color: "#d82b2b" });
        $$("#iErroRM").css({ display: "block" });
        $$("#erroRM").css({ display: "block" });
        $$("#erroRM").html("APENAS NÚMEROS, EXEMPLO DE RM(01234)");
    } else {
        $$("#iErroRM").css({ display: "block" });
        $$("#erroRM").css({ display: "none" });
        $$("#iErroRM").css({ color: "#00c638" });
        $$("#iErroRM").html("check");
    }
});
$$("#txtCPF").blur(function() {
    if ($$("#txtCPF").val().trim().length < 11) {
        $$("#iErroCPF").html("close");
        $$("#iErroCPF").css({ color: "#d82b2b" });
        $$("#iErroCPF").css({ display: "block" });
        $$("#erroCPF").css({ display: "block" });
        $$("#erroCPF").html("CPF DEVE TER NO MÍNIMO 11 CARACTERS!");
    } else if ($$("#txtCPF").val().trim().length >= 11) {
        if (!CPF.validate(document.getElementById('txtCPF').value.trim()) === true) {
            $$("#iErroCPF").html("close");
            $$("#iErroCPF").css({ color: "#d82b2b" });
            $$("#iErroCPF").css({ display: "block" });
            $$("#erroCPF").css({ display: "block" });
            $$("#erroCPF").html("CPF INVÁLIDO!");
        } else {
            $$("#iErroCPF").css({ display: "block" });
            $$("#iErroCPF").html("check");
            $$("#iErroCPF").css({ color: "#00c638" });
            $$("#erroCPF").css({ display: "none" });
        }
    }
});
$$("#txtEmail").blur(function() {
    if ($$("#txtEmail").val().trim() == "") {
        $$("#iErroEmail").html("close");
        $$("#iErroEmail").css({ color: "#d82b2b" });
        $$("#iErroEmail").css({ display: "block" });
        $$("#erroEmail").css({ display: "block" });
        $$("#erroEmail").html("DIGITE O EMAIL QUE DESEJA UTILIZAR!");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("txtEmail").value.trim()) === true) {
        $$("#iErroEmail").html("close");
        $$("#iErroEmail").css({ color: "#d82b2b" });
        $$("#iErroEmail").css({ display: "block" });
        $$("#erroEmail").css({ display: "block" });
        $$("#erroEmail").html("EMAIL INVÁLIDO!");
    } else {
        var xhttp = new XMLHttpRequest(),
            dados = "Email=" + document.getElementById("txtEmail").value + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1";
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState > 3 && xhttp.status == 200) {
                if (xhttp.responseText == false) {
                    $$("#iErroEmail").html("close");
                    $$("#iErroEmail").css({ color: "#d82b2b" });
                    $$("#iErroEmail").css({ display: "block" });
                    $$("#erroEmail").css({ display: "block" });
                    $$("#erroEmail").html("ESSE EMAIL JÁ ESTÁ CADASTRADO!");
                } else {
                    $$("#iErroEmail").css({ display: "block" });
                    $$("#iErroEmail").html("check");
                    $$("#iErroEmail").css({ color: "#00c638" });
                    $$("#erroEmail").css({ display: "none" });
                }
            }
        };
        xhttp.open("POST", "http://www.rotussecurity.com.br/api/cadastro_aluno.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(dados);
    }
});
$$("#txtSenha").blur(function() {
    if ($$("#txtSenha").val().trim() == "") {
        $$("#iErroSenha").html("close");
        $$("#iErroSenha").css({ color: "#d82b2b" });
        $$("#iErroSenha").css({ display: "block" });
        $$("#erroSenha").css({ display: "block" });
        $$("#erroSenha").html("DIGITE A SENHA!");
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("txtSenha").value.trim()) === true) {
        $$("#iErroSenha").html("close");
        $$("#iErroSenha").css({ color: "#d82b2b" });
        $$("#iErroSenha").css({ display: "block" });
        $$("#erroSenha").css({ display: "block" });
        $$("#erroSenha").html("A SENHA DEVE CONTER NO MÍNIMO 8 CARACTERS, 1 LETRA E 1 NÚMERO!");
    } else {
        $$("#iErroSenha").css({ display: "block" });
        $$("#iErroSenha").html("check");
        $$("#iErroSenha").css({ color: "#00c638" });
        $$("#erroSenha").css({ display: "none" });
    }
});
$$("#txtConfSenha").blur(function() {
    if ($$("#txtConfSenha").val().trim() == "") {
        $$("#iErroConfSenha").html("close");
        $$("#iErroConfSenha").css({ color: "#d82b2b" });
        $$("#iErroConfSenha").css({ display: "block" });
        $$("#erroConfSenha").css({ display: "block" });
        $$("#erroConfSenha").html("REPITA A SENHA!");
    } else if ($$("#txtSenha").val() != $$("#txtConfSenha").val()) {
        $$("#iErroConfSenha").html("close");
        $$("#iErroConfSenha").css({ color: "#d82b2b" });
        $$("#iErroConfSenha").css({ display: "block" });
        $$("#erroConfSenha").css({ display: "block" });
        $$("#erroConfSenha").html("A SENHA DIGITADA NÃO COINCIDE COM A ANTERIOR");
    } else {
        $$("#iErroConfSenha").css({ display: "block" });
        $$("#iErroConfSenha").html("check");
        $$("#iErroConfSenha").css({ color: "#00c638" });
        $$("#erroConfSenha").css({ display: "none" });
    }
});
$$("#btnRegistroCancel").click(function() {
    setTimeout(function() {
        $$("#confDados").css({ display: "none" });
        $$("#iErroRM").css({ display: "none" });
        $$("#iErroCPF").css({ display: "none" });
        $$("#txtCPF").removeAttr('disabled', 'disabled');
        $$("#txtRM").removeAttr('disabled', 'disabled');
        $$("#txtEmail").val("");
        $$("#txtSenha").val("");
        $$("#txtConfSenha").val("");
        $$("#txtFoto").attr("src", "images/photo.png");
        $$("#txtFoto").css({
            display: "none"
        });
        $$("#txtAlunoID").val("");
        $$("#btnRegistrar").html("AVANÇAR");
        $$("#btnRegistrar").attr("id", "btnRegistroNext");
        $$("#ulCancelar").css({ display: "none" });
        $$("#divBtnAvanca").attr("style", "display:block");
        $$("#divBtnCadastrar").attr("style", "display:none");
        mainView.router.back();
    }, 0);
});
$$("#btnRegistrar").click(function() {
    var nCont = 0;
    if (document.getElementById("txtSrcFoto").value == "") {
        $$("#erroFoto").css({ display: "block" });
        $$("#erroFoto").html("POR FAVOR, SELECIONE UMA FOTO");
        nCont++;
    } else if (!/^.*\.(jpg|jpeg|JPG|)$/.test(document.getElementById("txtSrcFoto").value)) {
        $$("#erroFoto").css({ display: "block" });
        $$("#erroFoto").html("SELECIONE UMA FOTO NO FORMATO JPEG OU JPG");
        nCont++;
    } else {
        $$("#erroFoto").css({ display: "none" });
    }
    if ($$("#txtEmail").val().trim() == "") {
        $$("#iErroEmail").html("close");
        $$("#iErroEmail").css({ color: "#d82b2b" });
        $$("#iErroEmail").css({ display: "block" });
        $$("#erroEmail").css({ display: "block" });
        $$("#erroEmail").html("DIGITE O EMAIL QUE DESEJA UTILIZAR!");
        nCont++;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("txtEmail").value.trim()) == true) {
        $$("#iErroEmail").html("close");
        $$("#iErroEmail").css({ color: "#d82b2b" });
        $$("#iErroEmail").css({ display: "block" });
        $$("#erroEmail").css({ display: "block" });
        $$("#erroEmail").html("EMAIL INVÁLIDO!");
        nCont++;
    } else {
        var xhttp = new XMLHttpRequest(),
            dados = "Email=" + document.getElementById("txtEmail").value + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1";
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState > 3 && xhttp.status == 200) {
                if (xhttp.responseText == false) {
                    $$("#iErroEmail").html("close");
                    $$("#iErroEmail").css({ color: "#d82b2b" });
                    $$("#iErroEmail").css({ display: "block" });
                    $$("#erroEmail").css({ display: "block" });
                    $$("#erroEmail").html("ESSE EMAIL JÁ ESTÁ CADASTRADO!");
                    nCont++;
                } else {
                    $$("#iErroEmail").css({ display: "block" });
                    $$("#iErroEmail").html("check");
                    $$("#iErroEmail").css({ color: "#00c638" });
                    $$("#erroEmail").css({ display: "none" });
                }
            }
        };
        xhttp.open("POST", "http://www.rotussecurity.com.br/api/cadastro_aluno.php", false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(dados);
    }
    if ($$("#txtSenha").val().trim() == "") {
        $$("#iErroSenha").html("close");
        $$("#iErroSenha").css({ color: "#d82b2b" });
        $$("#iErroSenha").css({ display: "block" });
        $$("#erroSenha").css({ display: "block" });
        $$("#erroSenha").html("DIGITE A SENHA!");
        nCont++;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("txtSenha").value.trim()) === true) {
        $$("#iErroSenha").html("close");
        $$("#iErroSenha").css({ color: "#d82b2b" });
        $$("#iErroSenha").css({ display: "block" });
        $$("#erroSenha").css({ display: "block" });
        $$("#erroSenha").html("A SENHA DEVE CONTER NO MÍNIMO 8 CARACTERS, 1 LETRA E 1 NÚMERO!");
        nCont++;
    } else {
        $$("#iErroSenha").css({ display: "block" });
        $$("#iErroSenha").html("check");
        $$("#iErroSenha").css({ color: "#00c638" });
        $$("#erroSenha").css({ display: "none" });
    }
    if ($$("#txtConfSenha").val().trim() == "") {
        $$("#iErroConfSenha").html("close");
        $$("#iErroConfSenha").css({ color: "#d82b2b" });
        $$("#iErroConfSenha").css({ display: "block" });
        $$("#erroConfSenha").css({ display: "block" });
        $$("#erroConfSenha").html("REPITA A SENHA!");
        nCont++;
    } else if ($$("#txtSenha").val() != $$("#txtConfSenha").val()) {
        $$("#iErroConfSenha").html("close");
        $$("#iErroConfSenha").css({ color: "#d82b2b" });
        $$("#iErroConfSenha").css({ display: "block" });
        $$("#erroConfSenha").css({ display: "block" });
        $$("#erroConfSenha").html("A SENHA DIGITADA NÃO COINCIDE COM A ANTERIOR");
        nCont++;
    } else {
        $$("#iErroConfSenha").css({ display: "block" });
        $$("#iErroConfSenha").html("check");
        $$("#iErroConfSenha").css({ color: "#00c638" });
        $$("#erroConfSenha").css({ display: "none" });
    }
    if (document.getElementById("txtTermos").checked == false) {
        $$("#erroAll").css({ display: "block" });
        $$("#erroAll").html("VOCÊ PRECISA ACEITAR OS TERMOS DE USO PARA CONTINUAR!");
        nCont++;
    } else {
        $$("#erroAll").css({ display: "none" });
    }
    if (nCont < 1) {
        var xhttp = new XMLHttpRequest(),
            dados = "txtRM=" + $$("#txtRM").val().trim() + "&txtEmail=" + $$("#txtEmail").val().trim() + "&txtSenha=" + $$("#txtSenha").val().trim() + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1";
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState > 3 && xhttp.status == 200) {
                if (xhttp.responseText == "sucess") {
                    if (document.getElementById("txtSrcFoto").value != null) {
                        var options = new FileUploadOptions();
                        options.fileKey = "file";
                        options.fileName = document.getElementById("txtAlunoID").value;
                        options.mimeType = "image/jpg";
                        var ft = new FileTransfer();
                        ft.upload(document.getElementById("txtSrcFoto").value, "http://rotussecurity.com.br/api/cadastro_aluno.php?txtID=" + document.getElementById("txtAlunoID").value + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1", function(result) {
                            myApp.closeModal('#uploadInfo');
                            var j = JSON.stringify(result),
                                i = JSON.parse(j);
                            if (i.response == "sucess") {
                                myApp.alert('Cadastrado com Sucesso!');
                                $$("#confDados").css({ display: "none" });
                                $$("#iErroRM").css({ display: "none" });
                                $$("#iErroCPF").css({ display: "none" });
                                $$("#txtCPF").removeAttr('disabled', 'disabled');
                                $$("#txtRM").removeAttr('disabled', 'disabled');
                                $$("#txtRM").val("");
                                $$("#txtEmail").val("");
                                $$("#txtSenha").val("");
                                $$("#txtConfSenha").val("");
                                $$("#txtCPF").val("");
                                $$("#txtSrcFoto").val("");
                                $$("#txtFoto").attr("src", "");
                                $$("#txtFoto").css({ display: "none" });
                                $$("#btnRegistrar").html("AVANÇAR");
                                $$("#btnRegistrar").attr("id", "btnRegistroNext");
                                $$("#ulCancelar").css({ display: "none" });
                                $$("#divBtnAvanca").attr("style", "display:block");
                                $$("#divBtnCadastrar").attr("style", "display:none");
                                mainView.router.back();
                            } else {
                                myApp.alert('Erro ao cadastrar! Tente Novamente');
                                $$("#confDados").css({ display: "none" });
                                $$("#iErroRM").css({ display: "none" });
                                $$("#iErroCPF").css({ display: "none" });
                                $$("#txtCPF").removeAttr('disabled', 'disabled');
                                $$("#txtRM").removeAttr('disabled', 'disabled');
                                $$("#txtRM").val("");
                                $$("#txtEmail").val("");
                                $$("#txtSenha").val("");
                                $$("#txtConfSenha").val("");
                                $$("#txtCPF").val("");
                                $$("#txtSrcFoto").val("");
                                $$("#txtFoto").attr("src", "");
                                $$("#txtFoto").css({ display: "none" });
                                $$("#btnRegistrar").html("AVANÇAR");
                                $$("#btnRegistrar").attr("id", "btnRegistroNext");
                                $$("#ulCancelar").css({ display: "none" });
                                $$("#divBtnAvanca").attr("style", "display:block");
                                $$("#divBtnCadastrar").attr("style", "display:none");
                                mainView.router.back();
                            }
                        }, function(error) {
                            myApp.closeModal('#uploadInfo');
                            alert(JSON.stringify(result));
                        }, options);
                        ft.onprogress = function(progressEvent) {
                            myApp.showProgressbar("#startProgress", 0, "red");
                            myApp.pickerModal('#uploadInfo');
                            perc = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                            myApp.showProgressbar("#startProgress", perc, "red");
                        }
                    } else {

                    }
                } else {
                    myApp.alert('Erro ao cadastrar! Tente Novamente');
                    $$("#confDados").css({ display: "none" });
                    $$("#iErroRM").css({ display: "none" });
                    $$("#iErroCPF").css({ display: "none" });
                    $$("#txtCPF").removeAttr('disabled', 'disabled');
                    $$("#txtRM").removeAttr('disabled', 'disabled');
                    $$("#txtRM").val("");
                    $$("#txtEmail").val("");
                    $$("#txtSenha").val("");
                    $$("#txtConfSenha").val("");
                    $$("#txtCPF").val("");
                    $$("#txtFoto").css({ display: "none" });
                    $$("#btnRegistrar").html("AVANÇAR");
                    $$("#btnRegistrar").attr("id", "btnRegistroNext");
                    $$("#ulCancelar").css({ display: "none" });
                    $$("#divBtnAvanca").attr("style", "display:block");
                    $$("#divBtnCadastrar").attr("style", "display:none");
                    mainView.router.back();
                }
            }
        };
        xhttp.open("POST", "http://www.rotussecurity.com.br/api/cadastro_aluno.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(dados);
    } else {
        return false;
    }
});
$$("#txtUsername").blur(function() {
    if ($$("#txtUsername").val().trim() == "") {
        $$("#iErroUser").html("close");
        $$("#iErroUser").css({ color: "#d82b2b" });
        $$("#iErroUser").css({ display: "block" });
        $$("#erroUser").css({ display: "block" });
        $$("#erroUser").html("DIGITE SEU RM OU EMAIL!");
    } else if (/^(\d){5,}$/.test(document.getElementById("txtUsername").value.trim())) {
        var user = "rm";
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("txtUsername").value.trim())) {
        var user = "email";
    } else {
        //Erro
    }
    if (user == "rm") {
        if (!/^(\d){5,}$/.test(document.getElementById("txtUsername").value.trim()) === true) {
            $$("#iErroUser").html("close");
            $$("#iErroUser").css({ color: "#d82b2b" });
            $$("#iErroUser").css({ display: "block" });
            $$("#erroUser").css({ display: "block" });
            $$("#erroUser").html("RM OU EMAIL INVÁLIDO!");
        } else {
            $$("#iErroUser").css({ display: "block" });
            $$("#iErroUser").html("check");
            $$("#iErroUser").css({ color: "#00c638" });
            $$("#erroUser").css({ display: "none" });
        }
    } else if (user == "email") {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("txtUsername").value.trim()) === true) {
            $$("#iErroUser").html("close");
            $$("#iErroUser").css({ color: "#d82b2b" });
            $$("#iErroUser").css({ display: "block" });
            $$("#erroUser").css({ display: "block" });
            $$("#erroUser").html("RM OU EMAIL INVÁLIDO!");
        } else {
            $$("#iErroUser").css({ display: "block" });
            $$("#iErroUser").html("check");
            $$("#iErroUser").css({ color: "#00c638" });
            $$("#erroUser").css({ display: "none" });
        }
    } else {
        $$("#iErroUser").html("close");
        $$("#iErroUser").css({ color: "#d82b2b" });
        $$("#iErroUser").css({ display: "block" });
        $$("#erroUser").css({ display: "block" });
        $$("#erroUser").html("RM OU EMAIL INVÁLIDO!");
    }
});
$$("#txtPass").blur(function() {
    if ($$("#txtPass").val().trim() == "") {
        $$("#iErroPass").html("close");
        $$("#iErroPass").css({ color: "#d82b2b" });
        $$("#iErroPass").css({ display: "block" });
        $$("#erroPass").css({ display: "block" });
        $$("#erroPass").html("DIGITE SUA SENHA!");
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("txtPass").value.trim())) {
        $$("#iErroPass").html("close");
        $$("#iErroPass").css({ color: "#d82b2b" });
        $$("#iErroPass").css({ display: "block" });
        $$("#erroPass").css({ display: "block" });
        $$("#erroPass").html("SENHA INCORRETA!");
    } else {
        $$("#iErroPass").css({ display: "block" });
        $$("#iErroPass").html("check");
        $$("#iErroPass").css({ color: "#00c638" });
        $$("#erroPass").css({ display: "none" });
    }
});
$$("#btnEntrar").click(function() {
    var nCont = 0;
    if ($$("#txtUsername").val().trim() == "") {
        $$("#iErroUser").html("close");
        $$("#iErroUser").css({ color: "#d82b2b" });
        $$("#iErroUser").css({ display: "block" });
        $$("#erroUser").css({ display: "block" });
        $$("#erroUser").html("DIGITE SEU RM OU EMAIL!");
        nCont++;
    } else if (/^(\d){5,}$/.test(document.getElementById("txtUsername").value.trim())) {
        var user = "rm";
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("txtUsername").value.trim())) {
        var user = "email";
    } else {
        //Erro
    }
    if (user == "rm") {
        if (!/^(\d){5,}$/.test(document.getElementById("txtUsername").value.trim()) === true) {
            $$("#iErroUser").html("close");
            $$("#iErroUser").css({ color: "#d82b2b" });
            $$("#iErroUser").css({ display: "block" });
            $$("#erroUser").css({ display: "block" });
            $$("#erroUser").html("RM OU EMAIL INVÁLIDO!");
            nCont++;
        } else {
            $$("#iErroUser").css({ display: "block" });
            $$("#iErroUser").html("check");
            $$("#iErroUser").css({ color: "#00c638" });
            $$("#erroUser").css({ display: "none" });
        }
    } else if (user == "email") {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("txtUsername").value.trim()) === true) {
            $$("#iErroUser").html("close");
            $$("#iErroUser").css({ color: "#d82b2b" });
            $$("#iErroUser").css({ display: "block" });
            $$("#erroUser").css({ display: "block" });
            $$("#erroUser").html("RM OU EMAIL INVÁLIDO!");
            nCont++;
        } else {
            $$("#iErroUser").css({ display: "block" });
            $$("#iErroUser").html("check");
            $$("#iErroUser").css({ color: "#00c638" });
            $$("#erroUser").css({ display: "none" });
        }
    } else {
        $$("#iErroUser").html("close");
        $$("#iErroUser").css({ color: "#d82b2b" });
        $$("#iErroUser").css({ display: "block" });
        $$("#erroUser").css({ display: "block" });
        $$("#erroUser").html("RM OU EMAIL INVÁLIDO!");
        nCont++;
    }
    if ($$("#txtPass").val().trim() == "") {
        $$("#iErroPass").html("close");
        $$("#iErroPass").css({ color: "#d82b2b" });
        $$("#iErroPass").css({ display: "block" });
        $$("#erroPass").css({ display: "block" });
        $$("#erroPass").html("DIGITE SUA SENHA!");
        nCont++;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("txtPass").value.trim())) {
        $$("#iErroPass").html("close");
        $$("#iErroPass").css({ color: "#d82b2b" });
        $$("#iErroPass").css({ display: "block" });
        $$("#erroPass").css({ display: "block" });
        $$("#erroPass").html("SENHA INCORRETA!");
        nCont++;
    } else {
        $$("#iErroPass").css({ display: "block" });
        $$("#iErroPass").html("check");
        $$("#iErroPass").css({ color: "#00c638" });
        $$("#erroPass").css({ display: "none" });
    }
    if (nCont < 1) {
        var xhttp = new XMLHttpRequest(),
            username = $$("#txtUsername").val().trim(),
            pass = $$("#txtPass").val().trim(),
            dados = "txtUser=" + username + "&txtPass=" + pass + "&txtType=" + user + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1";
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState > 3 && xhttp.status == 200) {
                if (xhttp.responseText == "bloqueado") {
                    var resultado = xhttp.responseText;
                    myApp.prompt('Sua conta está bloqueada. Para desbloquear, informe o código de desbloqueio de conta.',
                        function(value) {
                            var xhttp = new XMLHttpRequest(),
                                username = $$("#txtUsername").val().trim(),
                                dados = "txtUser=" + username + "&txtType=" + user + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1" + "&txtCode=" + value;
                            xhttp.onreadystatechange = function() {
                                if (xhttp.readyState > 3 && xhttp.status == 200) {
                                    if (xhttp.responseText != false) {
                                        myApp.alert('Sua conta foi desbloqueada com sucesso. Você será redirecionado em alguns segundos', 'DESBLOQUEIO BEM SUCEDIDO!', function() {
                                            localStorage.setItem("logado", xhttp.responseText);
                                            myApp.showPreloader('CARREGANDO...');
                                            setTimeout(function() {
                                                myApp.hidePreloader();
                                                window.location.href = "home.html";
                                            }, 2000);
                                        });
                                    } else {
                                        myApp.alert('O código digitado não é válido. Por favor, tente novamente!', 'DESBLOQUEIO NÃO FOI CONCLUÍDO');
                                    }
                                }
                            };
                            xhttp.open("POST", "http://www.rotussecurity.com.br/api/logar_aluno.php", false);
                            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            xhttp.send(dados);
                        }
                    );

                } else if (xhttp.responseText == "excluido") {
                    $$("#erroLoginAll").css({
                        display: "block"
                    })
                    $$("#erroLoginAll").html("NÃO EXISTE USUARIO COM ESSAS INFORMAÇÕES!");
                } else if (xhttp.responseText != false) {
                    localStorage.setItem("logado", xhttp.responseText);
                    myApp.showPreloader('CARREGANDO...');
                    setTimeout(function() {
                        myApp.hidePreloader();
                        window.location.href = "home.html";
                    }, 2000)
                } else {
                    $$("#erroLoginAll").css({
                        display: "none"
                    })
                    $$("#iErroPass").html("close");
                    $$("#iErroPass").css({ color: "#d82b2b" });
                    $$("#iErroPass").css({ display: "block" });
                    $$("#erroPass").css({ display: "block" });
                    $$("#erroPass").html("SENHA INCORRETA!");
                }
            }
        };
        xhttp.open("POST", "http://www.rotussecurity.com.br/api/logar_aluno.php", false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(dados);
    }
});
$$("#txtRPEmail").blur(function() {
    if ($$("#txtRPEmail").val().trim() == "") {
        $$("#iErroRPEmail").html("close");
        $$("#iErroRPEmail").css({ color: "#d82b2b" });
        $$("#iErroRPEmail").css({ display: "block" });
        $$("#erroRPEmail").css({ display: "block" });
        $$("#erroRPEmail").html("DIGITE O EMAIL QUE DESEJA UTILIZAR!");
        $$("#erroRP").css({
            display: "none"
        })
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("txtRPEmail").value.trim()) === true) {
        $$("#iErroRPEmail").html("close");
        $$("#iErroRPEmail").css({ color: "#d82b2b" });
        $$("#iErroRPEmail").css({ display: "block" });
        $$("#erroRPEmail").css({ display: "block" });
        $$("#erroRPEmail").html("EMAIL INVÁLIDO!");
        $$("#erroRP").css({
            display: "none"
        })
    } else {
        $$("#iErroRPEmail").css({ display: "block" });
        $$("#iErroRPEmail").html("check");
        $$("#iErroRPEmail").css({ color: "#00c638" });
        $$("#erroRPEmail").css({ display: "none" });
        $$("#erroRP").css({
            display: "none"
        })
    }
});
$$("#txtRPCode").blur(function() {
    if ($$("#txtRPCode").val().trim() == "") {
        $$("#iErroRPCode").html("close");
        $$("#iErroRPCode").css({ color: "#d82b2b" });
        $$("#iErroRPCode").css({ display: "block" });
        $$("#erroRPCode").css({ display: "block" });
        $$("#erroRPCode").html("DIGITE O CÓDIGO RECEBIDO");
        $$("#erroRP").css({
            display: "none"
        })
    } else if (!/[a-zA-Z0-9]{10}/.test(document.getElementById("txtRPCode").value.trim()) === true) {
        $$("#iErroRPCode").html("close");
        $$("#iErroRPCode").css({ color: "#d82b2b" });
        $$("#iErroRPCode").css({ display: "block" });
        $$("#erroRPCode").css({ display: "block" });
        $$("#erroRPCode").html("CÓDIGO INVÁLIDO!");
        $$("#erroRP").css({
            display: "none"
        })
    } else {
        $$("#iErroRPCode").css({ display: "block" });
        $$("#iErroRPCode").html("check");
        $$("#iErroRPCode").css({ color: "#00c638" });
        $$("#erroRPCode").css({ display: "none" });
        $$("#erroRP").css({
            display: "none"
        })
    }
});
$$("#btnEnviar").click(function() {
    var nErro = 0;
    if ($$("#txtRPEmail").val().trim() == "") {
        $$("#iErroRPEmail").html("close");
        $$("#iErroRPEmail").css({ color: "#d82b2b" });
        $$("#iErroRPEmail").css({ display: "block" });
        $$("#erroRPEmail").css({ display: "block" });
        $$("#erroRPEmail").html("DIGITE O EMAIL QUE DESEJA UTILIZAR!");
        $$("#erroRP").css({
            display: "none"
        })
        nErro++;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("txtRPEmail").value.trim()) === true) {
        $$("#iErroRPEmail").html("close");
        $$("#iErroRPEmail").css({ color: "#d82b2b" });
        $$("#iErroRPEmail").css({ display: "block" });
        $$("#erroRPEmail").css({ display: "block" });
        $$("#erroRPEmail").html("EMAIL INVÁLIDO!");
        $$("#erroRP").css({
            display: "none"
        })
        nErro++;
    } else {
        $$("#iErroRPEmail").css({ display: "block" });
        $$("#iErroRPEmail").html("check");
        $$("#iErroRPEmail").css({ color: "#00c638" });
        $$("#erroRPEmail").css({ display: "none" });
        $$("#erroRP").css({
            display: "none"
        })
    }
    if (nErro < 1) {
        myApp.showPreloader('CARREGANDO...');
        var xhttp = new XMLHttpRequest(),
            email = $$("#txtRPEmail").val().trim(),
            dados = "txtEmail=" + email + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1";
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState > 3 && xhttp.status == 200) {
                if (xhttp.responseText == "enviado") {
                    $$("#btnConfirmarCode").css({
                        display: "block"
                    });
                    $$("#btnEnviar").css({
                        display: "none"
                    })
                    $$("#erroRP").css({
                        display: "block",
                        color: "#0ea803"
                    })
                    $$("#txtRPEmail").attr("disabled", "disabled");
                    $$("#groupCode").removeAttr("style");
                    $$("#erroRP").html("EMAIL ENVIADO COM SUCESSO!");
                    setTimeout(function() {
                        $$("#erroRP").css({
                            display: "none"
                        })
                    }, 2000)
                    myApp.hidePreloader();
                } else {
                    $$("#erroRP").css({
                        display: "block",
                        color: "#d82b2b"
                    })
                    $$("#erroRP").html("ERRO AO ENVIAR EMAIL. POR FAVOR, VERIFICA SEU EMAIL!.");
                    myApp.hidePreloader();
                }
            }
        };
        xhttp.open("POST", "http://www.rotussecurity.com.br/api/recuperar_senha.php", false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(dados);
    } else {
        return false;
    }
});
$$("#btnConfirmarCode").click(function() {
    if ($$("#txtRPCode").val().trim() == "") {
        $$("#iErroRPCode").html("close");
        $$("#iErroRPCode").css({ color: "#d82b2b" });
        $$("#iErroRPCode").css({ display: "block" });
        $$("#erroRPCode").css({ display: "block" });
        $$("#erroRPCode").html("DIGITE O CÓDIGO RECEBIDO");
        $$("#erroRP").css({
            display: "none"
        })
    } else if (!/[a-zA-Z0-9]{10}/.test(document.getElementById("txtRPCode").value.trim()) === true) {
        $$("#iErroRPCode").html("close");
        $$("#iErroRPCode").css({ color: "#d82b2b" });
        $$("#iErroRPCode").css({ display: "block" });
        $$("#erroRPCode").css({ display: "block" });
        $$("#erroRPCode").html("CÓDIGO INVÁLIDO!");
        $$("#erroRP").css({
            display: "none"
        })
    } else {
        myApp.showPreloader('CARREGANDO...');
        var xhttp = new XMLHttpRequest(),
            code = $$("#txtRPCode").val().trim(),
            email = $$("#txtRPEmail").val().trim(),
            dados = "txtCode=" + code + "&Email=" + email + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1";
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState > 3 && xhttp.status == 200) {
                if (xhttp.responseText == true) {
                    $$("#btnConfirmarCode").css({
                        display: "none"
                    });
                    $$("#btnEnviar").css({
                        display: "none"
                    })
                    $$("#btnRecuperar").css({
                        display: "block"
                    })
                    $$("#txtRPCode").attr("disabled", "disabled");
                    $$("#groupSenha").removeAttr("style");
                    $$("#groupConfSenha").removeAttr("style");
                    setTimeout(function() {
                        $$("#erroRP").css({
                            display: "none"
                        })
                    }, 2000)
                    myApp.hidePreloader();
                } else {
                    $$("#iErroRPCode").html("close");
                    $$("#iErroRPCode").css({ color: "#d82b2b" });
                    $$("#iErroRPCode").css({ display: "block" });
                    $$("#erroRPCode").css({ display: "block" });
                    $$("#erroRPCode").html("CÓDIGO INVÁLIDO!");
                    $$("#erroRP").css({
                        display: "none"
                    })
                    myApp.hidePreloader();
                }
            }
        };
        xhttp.open("POST", "http://www.rotussecurity.com.br/api/recuperar_senha.php", false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(dados)
    }
});
$$("#txtRPSenha").blur(function() {
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("txtRPSenha").value)) {
        $$("#iErroRPSenha").html("close");
        $$("#iErroRPSenha").css({ color: "#d82b2b" });
        $$("#iErroRPSenha").css({ display: "block" });
        $$("#erroRPSenha").css({ display: "block" });
        $$("#erroRPSenha").html("A SENHA DEVE CONTER NO MÍNIMO 8 CARACTERES, UMA LETRA E UM NÚMERO!");
        $$("#erroRP").css({
            display: "none"
        })
    } else {
        $$("#iErroRPSenha").css({ display: "block" });
        $$("#iErroRPSenha").html("check");
        $$("#iErroRPSenha").css({ color: "#00c638" });
        $$("#erroRPSenha").css({ display: "none" });
        $$("#erroRP").css({
            display: "none"
        })
    }
});
$$("#txtRPConfSenha").blur(function() {
    if (document.getElementById("txtRPSenha").value != document.getElementById("txtRPConfSenha").value) {
        $$("#iErroRPConfSenha").html("close");
        $$("#iErroRPConfSenha").css({ color: "#d82b2b" });
        $$("#iErroRPConfSenha").css({ display: "block" });
        $$("#erroRPConfSenha").css({ display: "block" });
        $$("#erroRPConfSenha").html("AS SENHAS NÃO COINCIDEM!");
        $$("#erroRP").css({
            display: "none"
        })
    } else if (document.getElementById("txtRPConfSenha").value == "") {
        $$("#iErroRPConfSenha").html("close");
        $$("#iErroRPConfSenha").css({ color: "#d82b2b" });
        $$("#iErroRPConfSenha").css({ display: "block" });
        $$("#erroRPConfSenha").css({ display: "block" });
        $$("#erroRPConfSenha").html("REPITA A SENHA!");
        $$("#erroRP").css({
            display: "none"
        })
    } else {
        $$("#iErroRPConfSenha").css({ display: "block" });
        $$("#iErroRPConfSenha").html("check");
        $$("#iErroRPConfSenha").css({ color: "#00c638" });
        $$("#erroRPConfSenha").css({ display: "none" });
        $$("#erroRP").css({
            display: "none"
        })
    }
});
$$("#btnRecuperarSenha").click(function() {
    var nErro = 0;
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("txtRPSenha").value)) {
        $$("#iErroRPSenha").html("close");
        $$("#iErroRPSenha").css({ color: "#d82b2b" });
        $$("#iErroRPSenha").css({ display: "block" });
        $$("#erroRPSenha").css({ display: "block" });
        $$("#erroRPSenha").html("A SENHA DEVE CONTER NO MÍNIMO 4 CARACTERES, UMA LETRA E UM NÚMERO!");
        $$("#erroRP").css({
            display: "none"
        });
        nErro++;
    } else {
        $$("#iErroRPSenha").css({ display: "block" });
        $$("#iErroRPSenha").html("check");
        $$("#iErroRPSenha").css({ color: "#00c638" });
        $$("#erroRPSenha").css({ display: "none" });
        $$("#erroRP").css({
            display: "none"
        });
    }
    if (document.getElementById("txtRPSenha").value != document.getElementById("txtRPConfSenha").value) {
        $$("#iErroRPConfSenha").html("close");
        $$("#iErroRPConfSenha").css({ color: "#d82b2b" });
        $$("#iErroRPConfSenha").css({ display: "block" });
        $$("#erroRPConfSenha").css({ display: "block" });
        $$("#erroRPConfSenha").html("AS SENHAS NÃO COINCIDEM!");
        $$("#erroRP").css({
            display: "none"
        });
        nErro++
    } else if (document.getElementById("txtRPConfSenha").value == "") {
        $$("#iErroRPConfSenha").html("close");
        $$("#iErroRPConfSenha").css({ color: "#d82b2b" });
        $$("#iErroRPConfSenha").css({ display: "block" });
        $$("#erroRPConfSenha").css({ display: "block" });
        $$("#erroRPConfSenha").html("REPITA A SENHA!");
        $$("#erroRP").css({
            display: "none"
        });
        nErro++
    } else {
        $$("#iErroRPConfSenha").css({ display: "block" });
        $$("#iErroRPConfSenha").html("check");
        $$("#iErroRPConfSenha").css({ color: "#00c638" });
        $$("#erroRPConfSenha").css({ display: "none" });
        $$("#erroRP").css({
            display: "none"
        })
    }
    if (nErro < 1) {
        myApp.showPreloader('CARREGANDO...');
        var xhttp = new XMLHttpRequest(),
            email = $$("#txtRPEmail").val().trim(),
            code = $$("#txtRPCode").val().trim(),
            senha = $$("#txtRPSenha").val().trim(),
            dados = "Email=" + email + "&Code=" + code + "&txtNovaSenha=" + senha + "&basic=cm90dXNzZWN1cml0eTp0Y2MxMjM1";
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState > 3 && xhttp.status == 200) {
                if (xhttp.responseText == true) {
                    $$("#btnConfirmarCode").css({
                        display: "none"
                    });
                    $$("#btnEnviar").css({
                        display: "none"
                    })
                    $$("#btnRecuperar").css({
                        display: "none"
                    })
                    $$("#erroRP").css({
                        display: "block",
                        color: "#0ea803"
                    })
                    $$("#erroRP").html("SENHA ALTERADA COM SUCESSO");
                    setTimeout(function() {
                        $$("#erroRP").css({
                            display: "none"
                        })
                        $$("#btnEnviar").css({
                            display: "block"
                        })
                        $$("#txtRPEmail").removeAttr("disabled");
                        $$("#txtRPEmail").val("");
                        $$("#txtRPCode").removeAttr("disabled");
                        $$("#txtRPCode").val("");
                        $$("#txtRPSenha").val("");
                        $$("#txtRPConfSenha").val("");
                        $$("#erroRPConfSenha").css({ display: "none" });
                        $$("#erroRPSenha").css({ display: "none" });
                        $$("#erroRPCode").css({ display: "none" });
                        $$("#erroRPEmail").css({ display: "none" });
                        $$("#iErroRPConfSenha").css({ display: "none" });
                        $$("#iErroRPSenha").css({ display: "none" });
                        $$("#iErroRPCode").css({ display: "none" });
                        $$("#iErroRPEmail").css({ display: "none" });
                        $$("#groupSenha").attr("style", "display:none");
                        $$("#groupConfSenha").attr("style", "display:none");
                        $$("#groupCode").attr("style", "display:none");
                        mainView.router.back();
                    }, 2000)
                    myApp.hidePreloader();
                } else {
                    $$("#erroRP").css({
                        display: "block",
                        color: "#d82b2b"
                    })
                    $$("#erroRP").html("ERRO AO ALTERAR A SENHA!");
                    myApp.hidePreloader();
                }
            }
        };
        xhttp.open("POST", "http://www.rotussecurity.com.br/api/recuperar_senha.php", false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(dados);
    } else {
        return false;
    }
});
$$("#btnEsqueceuSenha").click(function() {
    $$("#erroRP").css({
        display: "none"
    })
    $$("#btnEnviar").css({
        display: "block"
    })
    $$("#txtRPEmail").removeAttr("disabled");
    $$("#txtRPEmail").val("");
    $$("#txtRPCode").removeAttr("disabled");
    $$("#txtRPCode").val("");
    $$("#txtRPSenha").val("");
    $$("#txtRPConfSenha").val("");
    $$("#erroRPConfSenha").css({ display: "none" });
    $$("#erroRPSenha").css({ display: "none" });
    $$("#erroRPCode").css({ display: "none" });
    $$("#erroRPEmail").css({ display: "none" });
    $$("#iErroRPConfSenha").css({ display: "none" });
    $$("#iErroRPSenha").css({ display: "none" });
    $$("#iErroRPCode").css({ display: "none" });
    $$("#iErroRPEmail").css({ display: "none" });
    $$("#groupSenha").attr("style", "display:none");
    $$("#groupConfSenha").attr("style", "display:none");
    $$("#groupCode").attr("style", "display:none");
})

function getPhoto() {
    myApp.modal({
        title: '<label style="text-align:center;">Selecione o método</label>',
        text: '<div class="buttons-row" style="width:200px;margin:0 auto;">' +
            '<a style="width:100px;text-align:center;" onclick="tiraFoto()"><i class="material-icons" style="font-size:100px;color:black;">photo_camera</i><label style="text-align:center;position:relative;top:-15px;color:black;">Tirar Foto</label></a>' +
            '<a style="width:100px;text-align:center;" onclick="buscaFoto()"><i class="material-icons" style="font-size:100px;color:#2a61ba;">burst_mode</i><label style="text-align:center;position:relative;top:-15px;color:black;">Escolher Foto</label></a>' +
            '</div>',
        buttons: [{
            text: '<label id="ftCancela">Cancelar</label>',
            close: true
        }]
    })
}

function tiraFoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
    });
}

function buscaFoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
    });
}

function onSuccess(imageData) {
    myApp.showPreloader('CARREGANDO...');
    document.getElementById("ftCancela").click();
    setTimeout(function() {
        var image = document.getElementById('txtFoto');
        image.src = imageData;
        myApp.hidePreloader();
    }, 1000);
    document.getElementById("txtSrcFoto").value = imageData;
}

function onFail(message) {

}