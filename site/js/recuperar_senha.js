$(document).ready(function(){
    $("#formRecuperarSenha").submit(function(event){
        if($("#NovaSenha").val() != $("#confNovaSenha").val()){
            $("#divError").removeClass("hide");
            $(".error").html("As senhas não coincedem!");
            $("#NovaSenha").addClass("invalid");
            $("#confNovaSenha").addClass("invalid");
            event.preventDefault();
            return false;
        }
        $.ajax({
            type: "POST",
            url: "recuperar_senha.php",
            data: "txtNovaSenha="+$("#NovaSenha").val()+"&txtID="+$("#txtID").val()+"&txtEmail="+$("#txtEmail").val()+"&txtKey="+$("#txtKey").val(),
            dataType: "text",
            async: false,
            success: function(resultado){
                alert(resultado);
                if(resultado == "ERRO"){
                    $("#divError").removeClass("hide");
                    $(".error").html("Erro ao alterar a senha!");
                    $("#NovaSenha").addClass("invalid");
                    $("#confNovaSenha").addClass("invalid");
                    event.preventDefault();
                    return false;
                }
                else{
                    $("#divError").removeClass("hide");
                    $(".password-recovery").addClass("hide");
                    $(".error").removeClass("red-text");
                    $(".error").addClass("black-text")
                    $(".error").html("Senha alterada com sucesso! Você será redirecionado em 5 segundos");
                    $("#icon-complet").removeClass("hide");
                    $("#groupNovaSenha").addClass("hide");
                    $("#groupConfNovaSenha").addClass("hide");
                    $("#btnAlterarSenha").after().addClass(" hide");
                    setTimeout(function(){
                        window.location.href = "http://rotussecurity.com.br/admin/login.php";
                    },5000),
                    event.preventDefault();
                }
            },
        }); 
    });
});