    $("#btnNext").click(function() {
        var filtro = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if ($("#Email").val().trim() == "") {
            $("#formLogin").attr("onsubmit", "return false");
            $("#divError").after().removeClass(" hide");
            $(".error").html("Por favor, digite seu email!");
            $("#Email").addClass("invalid");
            return false;
        }
        if (!$("#Email").val().trim().match(filtro)) {
            $("#formLogin").attr("onsubmit", "return false");
            $("#divError").after().removeClass(" hide");
            $(".error").html("Isso não é um email válido");
            $("#Email").addClass("invalid");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "../class/validation.php",
            data: "email=" + $("#Email").val().trim() + "&req=dados",
            dataType: "text",
            async: false,
            success: function(resultado) {
                if (resultado == false) {
                    $("#formLogin").attr("onsubmit", "return false");
                    $("#btnNext").attr("type", "button");
                    $(".error").html("Isso não é um email válido");
                    $("#divError").after().removeClass(" hide");
                    $("#Email").addClass("invalid");
                    return false;
                } else {
                    var obj = jQuery.parseJSON(resultado);
                    $("#btnNext").after().addClass(" hide"),
                        $("#userNome").html(obj.nome),
                        $("#userEmail").html(obj.email),
                        $("#groupSenha").after().removeClass(" hide"),
                        $("#photo").attr("src", "../" + obj.foto),
                        $("#groupEmail").after().addClass(" hide"),
                        $("#btnEntrar").after().removeClass(" hide");
                    $("#formLogin").attr("onsubmit", "return");
                    $("#btnNext").attr("type", "button");
                    $("#btnEntrar").attr("type", "submit");
                    $("#Email").addClass("valid");
                    $("#formLogin").removeAttr("onsubmit");
                    $("#divError").after().addClass(" hide");
                    $("#Senha").after().removeClass("invalid");
                    $("#Senha").focus();
                    return true;
                }
            },
        });
    });
    $("#formLogin").submit(function(event) {
        var filtro = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if ($("#Email").val().trim() == "") {
            return false;
        }
        if ($("#Senha").val() == "") {
            $(".error").html("Por favor, digite sua senha!");
            $("#divError").after().removeClass(" hide");
            $("#Senha").addClass("invalid");
            return false;
        }
        if (!$("#Email").val().trim().match(filtro)) {
            return false;
        }
        $.ajax({
            type: "POST",
            url: "../class/validation.php",
            data: "email=" + $("#Email").val().trim() + "&senha=" + $("#Senha").val(),
            dataType: "text",
            async: false,
            success: function(resultado) {
                if (resultado == false) {
                    $(".error").html("Senha incorreta");
                    $("#divError").after().removeClass(" hide");
                    $("#Senha").addClass("invalid");
                    event.preventDefault();
                    return false;
                }
            },
        });
    });