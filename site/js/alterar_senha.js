$("#NovaSenha").blur(function() {
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(document.getElementById("NovaSenha").value)) {
        $("#erroNovaSenha").attr("data-tooltip", "A senha deve conter no mínimo 4 caracteres,uma letra e um número!");
        $("#erroNovaSenha").tooltip();
        $("#NovaSenha").after().addClass("invalid");
        $("#erroNovaSenha").after().removeClass(" hide");
        $("#ACNovaSenha").after().addClass("hide");
    } else {
        $("#erroNovaSenha").after().addClass(" hide");
        $("#NovaSenha").after().removeClass("invalid");
        $("#NovaSenha").after().addClass("valid");
        $("#ACNovaSenha").after().removeClass("hide");
    }
});
$("#ConfNovaSenha").blur(function() {
    if (document.getElementById("ConfNovaSenha").value != $("#NovaSenha").val()) {
        $("#erroConfNovaSenha").attr("data-tooltip", "As senhas não coincidem! Confirme sua senha");
        $("#erroConfNovaSenha").tooltip();
        $("#ConfNovaSenha").after().addClass("invalid");
        $("#erroConfNovaSenha").after().removeClass(" hide");
        $("#ACConfNovaSenha").after().addClass("hide");
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(document.getElementById("ConfNovaSenha").value)) {
        $("#erroConfNovaSenha").attr("data-tooltip", "A senha deve conter no mínimo 4 caracteres,uma letra e um número!");
        $("#erroConfNovaSenha").tooltip();
        $("#ConfNovaSenha").after().addClass("invalid");
        $("#erroConfNovaSenha").after().removeClass(" hide");
        $("#ACConfNovaSenha").after().addClass("hide");
    } else {
        $("#erroConfNovaSenha").after().addClass(" hide");
        $("#ConfNovaSenha").after().removeClass("invalid");
        $("#ConfNovaSenha").after().addClass("valid");
        $("#ACConfNovaSenha").after().removeClass("hide");
    }
});
$("#formAlterar").submit(function(event) {
    var senhaatual = $("#SenhaAtual").val().trim(),
        novasenha = $("#NovaSenha").val().trim(),
        confnovasenha = $("#ConfNovaSenha").val().trim();
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(novasenha)) {
        $("#erroNovaSenha").attr("data-tooltip", "A senha deve conter no mínimo 4 caracteres,uma letra e um número!");
        $("#erroNovaSenha").tooltip();
        $("#NovaSenha").after().addClass("invalid");
        $("#erroNovaSenha").after().removeClass(" hide");
        $("#ACNovaSenha").after().addClass("hide");
        event.preventDefault();
    } else {
        $("#erroNovaSenha").after().addClass(" hide");
        $("#NovaSenha").after().removeClass("invalid");
        $("#NovaSenha").after().addClass("valid");
        $("#ACNovaSenha").after().removeClass("hide");
        event.preventDefault();
    }
    if (confnovasenha != novasenha) {
        $("#erroConfNovaSenha").attr("data-tooltip", "As senhas não coincidem! Confirme sua senha");
        $("#erroConfNovaSenha").tooltip();
        $("#ConfNovaSenha").after().addClass("invalid");
        $("#erroConfNovaSenha").after().removeClass(" hide");
        $("#ACConfNovaSenha").after().addClass("hide");
        event.preventDefault();
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(confnovasenha)) {
        $("#erroConfNovaSenha").attr("data-tooltip", "A senha deve conter no mínimo 4 caracteres,uma letra e um número!");
        $("#erroConfNovaSenha").tooltip();
        $("#ConfNovaSenha").after().addClass("invalid");
        $("#erroConfNovaSenha").after().removeClass(" hide");
        $("#ACConfNovaSenha").after().addClass("hide");
        event.preventDefault();
    } else {
        $("#erroConfNovaSenha").after().addClass(" hide");
        $("#ConfNovaSenha").after().removeClass("invalid");
        $("#ConfNovaSenha").after().addClass("valid");
        $("#ACConfNovaSenha").after().removeClass("hide");
        event.preventDefault();
    }
    $.ajax({
        type: "POST",
        url: "alterar_senha.php",
        data: "txtSenhaAtual=" + $("#SenhaAtual").val() + "&txtNovaSenha=" + $("#NovaSenha").val() + "&txtConfNovaSenha=" + $("#ConfNovaSenha").val(),
        dataType: "text",
        async: false,
        success: function(resultado) {
            if (resultado == "incorreta") {
                $("#erroSenhaAtual").attr("data-tooltip", "A senha digitada é incorreta, por favor digite sua senha!");
                $("#erroSenhaAtual").tooltip();
                $("#SenhaAtual").addClass("invalid");
                $("#erroSenhaAtual").after().removeClass(" hide");
                event.preventDefault();
            } else if (resultado == "antiga") {
                $("#erroNovaSenha").attr("data-tooltip", "Sua nova senha não pode ser igual a atual!");
                $("#erroNovaSenha").tooltip();
                $("#NovaSenha").addClass("invalid");
                $("#erroNovaSenha").after().removeClass(" hide");
                event.preventDefault();
            } else {
                alert("Senha alterada com sucesso!");
                event.preventDefault();
                window.location.href = "index.php";
            }
        }
    })
})