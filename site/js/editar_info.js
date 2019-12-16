$(document).ready(function() {
    $('select').material_select();
    $('.tooltipped').tooltip({
        delay: 50
    });
    if ($("#user-sexo").val() == "0") {
        $(".select-dropdown").val("Masculino");
    }
    if ($("#user-sexo").val() == "1") {
        $(".select-dropdown").val("Feminino");
    }
    $('.datepicker').pickadate({
        monthsFull: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        selectMonths: true,
        selectYears: true,
        clear: false,
        format: 'dd/mm/yyyy',
        close: "X",
        min: "01/01/1952",
        max: "01/01/2002",
        closeOnSelect: true,
    });
    $("#Nome").blur(function() {
        var nome = $('#Nome').val().trim();
        if (!/[A-Za-zÀ-ú]+(\s[A-Za-zÀ-ú]+){1,}/g.test(document.getElementById("Nome").value)) {
            $("#erroNome").attr("data-tooltip", "Formato de nome incorreto! Digite seu nome completo utilizando apenas letras");
            $("#erroNome").tooltip();
            $("#Nome").addClass("invalid");
            $("#erroNome").after().removeClass(" hide");
            $("#ACNome").after().addClass("hide")
        } else {
            $("#erroNome").after().addClass(" hide");
            $("#Nome").removeClass("invalid");
            $("#Nome").addClass("valid");
            $("#ACNome").after().removeClass("hide")
        }
    });
    $("#CEP").blur(function() {
        var cep = $('#CEP').val().trim();
        if (cep.length != 8) {
            $("#erroCEP").attr("data-tooltip", "CEP deve conter 9 digitos!");
            $("#erroCEP").tooltip();
            $("#CEP").after().addClass("invalid");
            $("#erroCEP").after().removeClass(" hide");
            $("#ACCEP").after().addClass("hide")
        } else if (!/^[0-9]{8}$/.test(document.getElementById("CEP").value)) {
            $("#erroCEP").attr("data-tooltip", "CEP inválido!");
            $("#erroCEP").tooltip();
            $("#CEP").after().addClass("invalid");
            $("#erroCEP").after().removeClass(" hide");
            $("#ACCEP").after().addClass("hide")
        } else {
            $("#erroCEP").after().addClass(" hide");
            $("#CEP").after().removeClass("invalid");
            $("#CEP").after().addClass("valid");
            $("#ACCEP").after().removeClass("hide")
        }
    });
    $("#Telefone").blur(function() {
        var telefone = $('#Telefone').val().trim();
        if (telefone.length < 14 || telefone.length > 15) {
            $("#erroTelefone").attr("data-tooltip", "Celular ou telefone é inválido!");
            $("#erroTelefone").tooltip();
            $("#Telefone").after().addClass("invalid");
            $("#erroTelefone").after().removeClass(" hide");
            $("#ACTelefone").after().addClass("hide")
        } else if (!/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/.test(document.getElementById("Telefone").value)) {
            $("#erroTelefone").attr("data-tooltip", "Formato de celular ou telefone não é válido! Use o formato (DD) 91234-5678");
            $("#erroTelefone").tooltip();
            $("#Telefone").after().addClass("invalid");
            $("#erroTelefone").after().removeClass(" hide");
            $("#ACTelefone").after().addClass("hide")
        } else {
            $("#erroTelefone").after().addClass(" hide");
            $("#Telefone").after().removeClass("invalid");
            $("#Telefone").after().addClass("valid");
            $("#ACTelefone").after().removeClass("hide")
        }
    })
    $("#formEditar").submit(function(event) {
        var nome = $('#Nome').val().trim(),
            cep = $('#CEP').val().trim(),
            dtnasc = $('#DTNasc').val().trim(),
            telefone = $('#Telefone').val().trim(),
            sexo = $('#Sexo').val().trim(),
            senha = $('#ConfSenha').val().trim();
        if (!/[A-Za-zÀ-ú]+(\s[A-Za-zÀ-ú]+){1,}/g.test(document.getElementById("Nome").value)) {
            $("#erroNome").attr("data-tooltip", "Formato de nome incorreto! Digite seu nome completo utilizando apenas letras");
            $("#erroNome").tooltip();
            $("#Nome").addClass("invalid");
            $("#erroNome").after().removeClass(" hide");
            $("#ACNome").after().addClass("hide");
            $("#Nome").focus();
            event.preventDefault();
        } else {
            $("#erroNome").after().addClass(" hide");
            $("#Nome").removeClass("invalid");
            $("#Nome").addClass("valid");
            $("#ACNome").after().removeClass("hide")
            event.preventDefault();
        }
        if (cep.length != 8) {
            $("#erroCEP").attr("data-tooltip", "CEP deve conter 9 digitos!");
            $("#erroCEP").tooltip();
            $("#CEP").after().addClass("invalid");
            $("#erroCEP").after().removeClass(" hide");
            $("#ACCEP").after().addClass("hide");
            $("#CEP").focus();
            event.preventDefault();
        } else if (!/^[0-9]{8}$/.test(document.getElementById("CEP").value)) {
            $("#erroCEP").attr("data-tooltip", "CEP inválido!");
            $("#erroCEP").tooltip();
            $("#CEP").after().addClass("invalid");
            $("#erroCEP").after().removeClass(" hide");
            $("#ACCEP").after().addClass("hide");
            $("#CEP").focus();
            event.preventDefault();
        } else {
            $("#erroCEP").after().addClass(" hide");
            $("#CEP").after().removeClass("invalid");
            $("#CEP").after().addClass("valid");
            $("#ACCEP").after().removeClass("hide")
            event.preventDefault();
        }
        if (telefone.length < 14 || telefone.length > 15) {
            $("#erroTelefone").attr("data-tooltip", "Celular ou telefone é inválido!");
            $("#erroTelefone").tooltip();
            $("#Telefone").after().addClass("invalid");
            $("#erroTelefone").after().removeClass(" hide");
            $("#ACTelefone").after().addClass("hide")
            event.preventDefault();
        } else if (!/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/.test(document.getElementById("Telefone").value)) {
            $("#erroTelefone").attr("data-tooltip", "Formato de celular ou telefone não é válido! Use o formato (DD) 91234-5678");
            $("#erroTelefone").tooltip();
            $("#Telefone").after().addClass("invalid");
            $("#erroTelefone").after().removeClass(" hide");
            $("#ACTelefone").after().addClass("hide");
            $("#Telefone").focus();
            event.preventDefault();
        } else {
            $("#erroTelefone").after().addClass(" hide");
            $("#Telefone").after().removeClass("invalid");
            $("#Telefone").after().addClass("valid");
            $("#ACTelefone").after().removeClass("hide")
            event.preventDefault();
        }
        $.ajax({
            type: "POST",
            url: "editar_info.php",
            data: "txtNome=" + nome + "&txtCEP=" + cep + "&txtDTNasc=" + dtnasc + "&txtTelefone=" + telefone + "&txtSexo=" + sexo + "&txtConfSenha=" + senha,
            dataType: "text",
            async: false,
            success: function(resultado) {
                if (resultado == "Senha incorreta!") {
                    $("#erroSenha").attr("data-tooltip", "A senha digitada é incorreta, por favor digite sua senha!");
                    $("#erroSenha").tooltip();
                    $("#ConfSenha").addClass("invalid");
                    $("#erroSenha").after().removeClass(" hide");
                    event.preventDefault();
                } else {
                    alert("Alterações feitas com sucesso!");
                    event.preventDefault();
                }
            },
        });
    });
});