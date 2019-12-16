       $("#btnEnviar").click(function() {
           if ($("#Email").val().trim() == "") {
               $(".error").html("Por favor, digite seu email!");
               $("#divError").fadeIn();
               $("#Email").addClass("invalid");
               return false;
           }
           if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("Email").value)) {
               $(".error").html("Isso não é um email válido");
               $("#divError").fadeIn();
               $("#Email").addClass("invalid");
               return false;
           }
           $.ajax({
               type: "POST",
               url: "desativar_conta.php",
               data: "txtEmail=" + $("#Email").val().trim() + "&txtRequestEmail=1",
               dataType: "text",
               async: false,
               success: function(resultado) {
                   if (resultado == false) {
                       $(".error").html("Sua conta já está bloqueado ou o email digitado não é válido");
                       $("#divError").fadeIn();
                   } else {
                       $("#divError").fadeOut();
                       $("#Email").attr("disabled", "disabled");
                       $("#inputCode").fadeIn();
                       $("#btnEnviar").fadeOut();
                       $("#btnDesativar").fadeIn()
                   }
               },
           });
       });
       $("#btnDesativar").click(function() {
           if ($("#Code").val().trim() == "") {
               $(".error").html("Por favor, digite o código para recuperar sua conta!");
               $("#divError").after().removeClass(" hide");
               $("#Code").addClass("invalid");
               return false;
           }
           if (!/[a-zA-Z0-9]{15}/.test(document.getElementById("Code").value)) {
               $(".error").html("Código inválido!");
               $("#divError").after().removeClass(" hide");
               $("#Code").addClass("invalid");
               return false;
           }
           $.ajax({
               type: "POST",
               url: "desativar_conta.php",
               data: "txtEmail=" + $("#Email").val().trim() + "&txtCode=" + $("#Code").val().trim(),
               dataType: "text",
               async: false,
               success: function(resultado) {
                   if (resultado == false) {
                       $(".error").html("Código não existe!");
                       $("#divError").fadeIn();
                   } else {
                       $("#divError").fadeOut();
                       $("#inputEmail").fadeOut();
                       $("#inputCode").fadeOut();
                       $("#btnEnviar").fadeOut();
                       $("#btnDesativar").fadeOut();
                       $("#icon-complet").fadeIn();
                       $("#complete").fadeIn();
                       $("#complete").html("Conta bloqueada com sucesso! Na proxima vez que tentar entrar em nosso aplicativo, pediremos seu codigo de bloqueio para liberar sua conta. <br>OBS: guarde o código de bloqueio!");;
                   }
               },
           });
       });