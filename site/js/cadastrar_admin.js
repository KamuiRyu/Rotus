        $(document).ready(function() {
            $('.collapsible').collapsible();
            $('.materialboxed').materialbox();
            $('select').material_select();
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
                max: "01/01/2000",
                closeOnSelect: true,
            });
        });

        function closeAlert() {
            $("#alert_box").fadeOut("slow", function() {});
        }

        function mostraFoto() {
            if (/^.*\.(jpg|jpeg|gif|JPG|png|PNG)$/.test(document.getElementById("fotoperfil").value)) {
                var arquivo = new FileReader();
                if (document.all.fotoperfil.files[0]) {
                    arquivo.readAsDataURL(document.all.fotoperfil.files[0])
                }
                arquivo.onloadend = function() {
                    $("#previewIMG").attr("src", arquivo.result);
                    $("#fotoErro").html("");
                }
            } else {
                $("#previewIMG").attr("src", "../profiles/avatar.gif");
                $("#fotoperfil").val("");
                $("#Foto").val("");
                $("#fotoErro").html("Arquivo selecionado não é uma imagem!");
            }
        }
        $("#Nome").blur(function() {
            if (!/[A-Za-zÀ-ú]+(\s[A-Za-zÀ-ú]+){1,}/g.test(document.getElementById("Nome").value)) {
                $("#erroNome").attr("data-tooltip", "Formato de nome incorreto! Digite O nome completo utilizando apenas letras");
                $("#erroNome").tooltip();
                $("#Nome").addClass("invalid");
                $("#erroNome").after().removeClass(" hide");
                $("#ACNome").after().addClass("hide");
            } else {
                $("#erroNome").after().addClass(" hide");
                $("#Nome").removeClass("invalid");
                $("#Nome").addClass("valid");
                $("#ACNome").after().removeClass("hide");
                document.getElementById("Nome").value = document.getElementById("Nome").value.toUpperCase()
            }
        });
        $("#dtnasc").blur(function() {
            if ($("#dtnasc").val() == "") {
                $("#dtnasc").removeClass("invalid");
            } else {
                $("#dtnasc").removeClass("invalid");
                $("#dtnasc").addClass("valid");
            }
        });
        $("#Senha").blur(function() {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(document.getElementById("Senha").value)) {
                $("#erroSenha").attr("data-tooltip", "A senha deve conter no mínimo 4 caracteres,uma letra e um número!");
                $("#erroSenha").tooltip();
                $("#Senha").after().addClass("invalid");
                $("#erroSenha").after().removeClass(" hide");
                $("#ACSenha").after().addClass("hide");
            } else {
                $("#erroSenha").after().addClass(" hide");
                $("#Senha").after().removeClass("invalid");
                $("#Senha").after().addClass("valid");
                $("#ACSenha").after().removeClass("hide");
            }
        });
        $("#Email").blur(function() {
            if ($("#Email").val().trim() == "") {
                $("#erroEmail").attr("data-tooltip", "Por favor, digite o email!");
                $("#erroEmail").tooltip();
                $("#Email").after().addClass("invalid");
                $("#erroEmail").after().removeClass(" hide");
                $("#ACEmail").after().addClass("hide");
            } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("Email").value)) {
                $("#erroEmail").attr("data-tooltip", "Isso não é um email válido");
                $("#erroEmail").tooltip();
                $("#Email").after().addClass("invalid");
                $("#erroEmail").after().removeClass(" hide");
                $("#ACEmail").after().addClass("hide");
            } else {
                $.ajax({
                    type: "POST",
                    url: "cadastrar_admin.php",
                    data: "txtEmail=" + $("#Email").val().trim() + "&txtRequestEmail=1",
                    dataType: "text",
                    async: false,
                    success: function(resultado) {
                        if (resultado == false) {
                            $("#erroEmail").attr("data-tooltip", "Esse email já está cadastrado!");
                            $("#erroEmail").tooltip();
                            $("#Email").after().addClass("invalid");
                            $("#erroEmail").after().removeClass(" hide");
                            $("#ACEmail").after().addClass("hide");
                        } else {
                            $("#erroEmail").after().addClass(" hide");
                            $("#Email").after().removeClass("invalid");
                            $("#Email").after().addClass("valid");
                            $("#ACEmail").after().removeClass("hide");
                        }
                    },
                });
            }
        })
        $("#formCDAdm").submit(function() {
            var nErro = 0;
            if ($("#Email").val().trim() == "") {
                $("#erroEmail").attr("data-tooltip", "Por favor, digite o email!");
                $("#erroEmail").tooltip();
                $("#Email").after().addClass("invalid");
                $("#erroEmail").after().removeClass(" hide");
                $("#ACEmail").after().addClass("hide");
                nErro++;
            } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("Email").value)) {
                $("#erroEmail").attr("data-tooltip", "Isso não é um email válido");
                $("#erroEmail").tooltip();
                $("#Email").after().addClass("invalid");
                $("#erroEmail").after().removeClass(" hide");
                $("#ACEmail").after().addClass("hide");
                nErro++;
            } else {
                $.ajax({
                    type: "POST",
                    url: "cadastrar_admin.php",
                    data: "txtEmail=" + $("#Email").val().trim() + "&txtRequestEmail=1",
                    dataType: "text",
                    async: false,
                    success: function(resultado) {
                        if (resultado == false) {
                            $("#erroEmail").attr("data-tooltip", "Esse email já está cadastrado!");
                            $("#erroEmail").tooltip();
                            $("#Email").after().addClass("invalid");
                            $("#erroEmail").after().removeClass(" hide");
                            $("#ACEmail").after().addClass("hide");
                            nErro++;
                        } else {
                            $("#erroEmail").after().addClass(" hide");
                            $("#Email").after().removeClass("invalid");
                            $("#Email").after().addClass("valid");
                            $("#ACEmail").after().removeClass("hide");
                        }
                    },
                });
            }
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(document.getElementById("Senha").value)) {
                $("#erroSenha").attr("data-tooltip", "A senha deve conter no mínimo 4 caracteres,uma letra e um número!");
                $("#erroSenha").tooltip();
                $("#Senha").after().addClass("invalid");
                $("#erroSenha").after().removeClass(" hide");
                $("#ACSenha").after().addClass("hide");
                nErro++;
            } else {
                $("#erroSenha").after().addClass(" hide");
                $("#Senha").after().removeClass("invalid");
                $("#Senha").after().addClass("valid");
                $("#ACSenha").after().removeClass("hide");
            }
            if ($("#dtnasc").val() == "") {
                $("#dtnasc").addClass("valid");
                $("#dtnasc").removeClass("valid");
                nErro++;
            } else {
                $("#dtnasc").removeClass("invalid");
                $("#dtnasc").addClass("valid");
            }
            if (!/[A-Za-zÀ-ú]+(\s[A-Za-zÀ-ú]+){1,}/g.test(document.getElementById("Nome").value)) {
                $("#erroNome").attr("data-tooltip", "Formato de nome incorreto! Digite O nome completo utilizando apenas letras");
                $("#erroNome").tooltip();
                $("#Nome").addClass("invalid");
                $("#erroNome").after().removeClass(" hide");
                $("#ACNome").after().addClass("hide");
                nErro++;
            } else {
                $("#erroNome").after().addClass(" hide");
                $("#Nome").removeClass("invalid");
                $("#Nome").addClass("valid");
                $("#ACNome").after().removeClass("hide");
                document.getElementById("Nome").value = document.getElementById("Nome").value.toUpperCase()
            }
            if (/^.*\.(jpg|jpeg|gif|JPG|png|PNG)$/.test(document.getElementById("fotoperfil").value)) {} else {
                $("#previewIMG").attr("src", "../profiles/avatar.gif");
                $("#fotoperfil").val("");
                $("#Foto").val("");
                $("#fotoErro").html("Arquivo selecionado não é uma imagem!");
                nErro++;
            }
            if (nErro < 1) {
                $("#erroCad").html("");
            } else {
                var html = "<div id='alert_box' class='card red'><div class='card-content white-text'><p><i class='material-icons' style='position: relative;top: 5px;'>error</i>EDIÇÃO NÃO FOI CONCLUÍDA, ALGUNS CAMPOS PRECISAM SER VERIFICADOS, POR FAVOR, VERIFIQUE E CORRIJA-OS E TENTE NOVAMENTE!<br>DICA: VERIFIQUE SE SELECIONOU O SEXO E COLOCOU A DATA DE NASCIMENTO.</p></div> <i class='material-icons' style='position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;' id='alert_close' onclick='closeAlert()'>close</i></div>";
                $("#erroCad").html(html);
                return false;
            }
        })