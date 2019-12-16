        $("#btnEnviar").click(function() {
            var cont = 0;
            if (!/[A-Za-zÀ-ú]+(\s[A-Za-zÀ-ú]+){1,}/g.test(document.getElementById("Nome").value)) {
                $("#Nome").addClass("invalid");
                $("#Nome").removeClass("valid");
                cont++;
            } else {
                $("#Nome").removeClass("invalid");
                $("#Nome").addClass("valid");
            }
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("Email").value)) {
                $("#Email").addClass("invalid");
                $("#Mensagem").removeClass("valid");
                cont++;
            } else if (document.getElementById("Email").value == "") {
                $("#Email").addClass("invalid");
                $("#Mensagem").removeClass("valid");
                cont++;
            } else {
                $("#Email").removeClass("invalid");
                $("#Email").addClass("valid");
            }
            if ($("#Mensagem").val() == "") {
                $("#Mensagem").removeClass("valid");
                $("#Mensagem").addClass("invalid");
            } else if ($("#Mensagem").val().length > 1000) {
                $("#Mensagem").removeClass("valid");
                $("#Mensagem").addClass("invalid");
            } else {
                $("#Mensagem").removeClass("invalid");
                $("#Mensagem").addClass("valid");
            }
            if (cont < 1) {
                $.ajax({
                    type: "POST",
                    url: "contato.php",
                    data: "txtNome=" + $("#Nome").val().trim() + "&txtEmail=" + $("#Email").val().trim() + "&txtMensagem=" + $("#Mensagem").val().trim(),
                    dataType: "text",
                    async: false,
                    success: function(resultado) {
                        if (resultado == false) {
                            $("#complete").html("Erro ao enviar mensagem!");
                            $("#complete").fadeIn();
                            $("#complete").css({
                                color: "red"
                            })
                        } else {
                            $("#complete").fadeIn();
                            $("#complete").html("Mensagem enviada com sucesso!");
                            $("#complete").css({
                                color: "green"
                            });
                            setTimeout(function() {
                                window.location.href = window.location.href;
                            }, 1000)
                        }
                    },
                });
            }
        })