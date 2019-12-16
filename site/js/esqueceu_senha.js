$(document).ready(function() {
    $("#btnEsqNext").click(function() {
        if ($("#Email").val().trim() == "") {
            $(".error").html("Por favor, digite seu email!");
            $("#divError").after().removeClass(" hide");
            $("#Email").addClass("invalid");
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("Email").value)) {
            $(".error").html("Isso não é um email válido");
            $("#divError").after().removeClass(" hide");
            $("#Email").addClass("invalid");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "esqueceu_senha.php",
            data: "txtEmail=" + $("#Email").val().trim() + "&txtRequestEmail=1",
            dataType: "text",
            async: false,
            success: function(resultado) {
                if (resultado == false) {
                    $(".error").html("Isso não é um email válido");
                    $("#divError").after().removeClass(" hide");
                } else {
                    $(".password-recovery").html("Um código foi enviado para seu email, insira ele aqui embaixo para redefinir sua senha!");
                    $("#divError").addClass(" hide");
                    $(".groupEmail").fadeOut();
                    $(".groupCode").fadeIn();
                    $("#btnEsqNext").fadeOut();
                    $("#btnConfirmarSenha").fadeIn();
                }
            },
        });
    });
    $("#btnConfirmarSenha").click(function() {
        if ($("#Code").val().trim() == "") {
            $(".error").html("Por favor, digite o código para recuperar sua conta!");
            $("#divError").after().removeClass(" hide");
            $("#Code").addClass("invalid");
            return false;
        }
        if (!/[a-zA-Z0-9]{10}/.test(document.getElementById("Code").value)) {
            $(".error").html("Código inválido!");
            $("#divError").after().removeClass(" hide");
            $("#Code").addClass("invalid");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "esqueceu_senha.php",
            data: "Email=" + $("#Email").val().trim() + "&txtCode=" + $("#Code").val().trim() + "&txtRequestCode=2",
            dataType: "text",
            async: false,
            success: function(resultado) {
                if (resultado == false) {
                    $(".error").html("Código não existe!");
                    $("#divError").after().removeClass(" hide");
                } else {
                    $(".password-recovery").html("Digite uma nova senha para podemos concluir a recuperação!");
                    $("#divError").addClass(" hide");
                    $(".groupCode").fadeOut();
                    $("#btnEsqNext").fadeOut();
                    $("#btnConfirmarSenha").fadeOut();
                    $(".groupConfSenha").fadeIn();
                    $(".groupSenha").fadeIn();
                    $("#btnRecuperarSenha").fadeIn();
                }
            },
        });
    })
    $("#btnRecuperarSenha").click(function() {
        var novasenha = $("#newPass").val().trim(),
            confnovasenha = $("#confNewPass").val().trim();
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(novasenha)) {
            $(".error").html("A senha deve conter no mínimo 4 caracteres,uma letra e um número!");
            $("#divError").after().removeClass(" hide");
            return false;
        } else if (confnovasenha != novasenha) {
            $(".error").html("As senhas não coincidem! Confirme sua senha");
            $("#divError").after().removeClass(" hide");
            return false;
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(confnovasenha)) {
            $(".error").html("A senha deve conter no mínimo 4 caracteres,uma letra e um número!");
            $("#divError").after().removeClass(" hide");
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "esqueceu_senha.php",
                data: "txtEmail=" + $("#Email").val().trim() + "&txtCode=" + $("#Code").val().trim() + "&txtNovaSenha=" + $("#newPass").val(),
                dataType: "text",
                async: false,
                success: function(resultado) {
                    if (resultado == false) {
                        $(".error").html("Erro ao recuperar senha");
                        $("#divError").after().removeClass(" hide");
                    } else {
                        $(".password-recovery").html("Senha Recuperada com Sucesso!<br>Você será redirecionado em 5 segundos");
                        $("#icon-complet").removeClass("hide");
                        $("#divError").addClass(" hide");
                        $(".groupCode").fadeOut();
                        $("#btnEsqNext").fadeOut();
                        $("#btnConfirmarSenha").fadeOut();
                        $(".groupConfSenha").fadeOut();
                        $(".groupSenha").fadeOut();
                        $("#btnRecuperarSenha").fadeOut();
                        setTimeout(function() {
                            window.location.href = "http://rotussecurity.com.br/admin";
                        }, 5000);
                    }
                },
            });
        }
    })
});