        var leitorDeCSV = new FileReader();

        window.onload = function init() {
            leitorDeCSV.onload = leCSV;
        }

        function pegaCSV(inputFile) {
            var file = inputFile.files[0];
            leitorDeCSV.readAsText(file);
        }

        function leCSV(evt) {
            if (!/^(.(?!.*\.CSV$|.*\.csv))*$/g.test(document.getElementById("arquivoexcel").value)) {
                $("#erroImportacao").html();
                $("#Arquivo").removeClass("invalid");
                $("#Arquivo").after().addClass("valid");
                var fileArr = evt.target.result.split('\n');
                var strDiv = '<table class="responsive-table">';
                strDiv += '<thead>';
                for (var o = 0; o < 1; o++) {
                    strDiv += '<tr>';
                    var fileLine = fileArr[o].split(';');
                    for (var d = 0; d < fileLine.length; d++) {
                        strDiv += '<th>' + fileLine[d].trim() + '</th>';
                    }
                    strDiv += '</tr>';
                }
                strDiv += '</thead>';
                strDiv += '<tbody>';
                for (var i = 1; i < fileArr.length; i++) {
                    strDiv += '<tr>';
                    var fileLine = fileArr[i].split(';');
                    for (var j = 0; j < fileLine.length; j++) {
                        strDiv += '<td>' + fileLine[j].trim() + '</td>';
                    }
                    strDiv += '</tr>';
                }
                strDiv += '</tbody>';
                strDiv += '</table>';

                var CSVsaida = document.getElementById('CSVsaida');
                CSVsaida.innerHTML = strDiv;
            } else {
                $("#erroImportacao").html("ARQUIVO NÃO É SUPORTADO! UTILIZE APENAS .CSV");
                $("#Arquivo").after().addClass(" invalid");
                $("#arquivoexcel").removeClass("valid");
            }
        }
        $("#importandoExcel").submit(function() {
            var nCont = 0;
            if (/^(.(?!.*\.CSV$|.*\.csv))*$/g.test(document.getElementById("arquivoexcel").value)) {
                $("#erroImportacao").html("ARQUIVO NÃO É SUPORTADO! UTILIZE APENAS .CSV");
                $("#Arquivo").after().addClass(" invalid");
                $("#Arquivo").removeClass("valid");
                nCont++;
            }
            if (nCont < 1) {
                return true;
            } else {
                return false;
            }
        })
        $(document).ready(function() {
            $('ul.tabs').tabs();
            $('.collapsible').collapsible();
            $('.materialboxed').materialbox();
        });
        $('#alert_close').click(function() {
            $("#alert_box").fadeOut("slow", function() {});
        });


        $(document).ready(function() {
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
                max: "01/01/2002",
                closeOnSelect: true,
            });
        });
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
        $("#RM").blur(function() {
            if (!/^(\d){5,}$/.test(document.getElementById("RM").value) === true) {
                $("#erroRM").attr("data-tooltip", "O RM deve conter 5 números! Digite o RM do aluno");
                $("#erroRM").tooltip();
                $("#RM").addClass("invalid");
                $("#erroRM").after().removeClass(" hide");
                $("#ACRM").after().addClass("hide");
            } else {
                $("#erroRM").after().addClass(" hide");
                $("#RM").removeClass("invalid");
                $("#RM").addClass("valid");
                $("#ACRM").after().removeClass("hide");
            }
        });
        $("#numero").blur(function() {
                if (document.getElementById("numero").value == "") {
                    $("#numero").addClass("invalid");
                } else if (!/^[A-Za-z0-9]{1,5}$/.test(document.getElementById("numero").value)) {
                    $("#numero").addClass("invalid");
                } else {
                    $("#numero").removeClass("invalid");
                    $("#numero").addClass("valid");
                }
            }),
            $("#Sexo").blur(function() {
                if ($("#Sexo").val() == "") {
                    $("#Sexo").addClass("invalid");
                } else {
                    $("#Sexo").removeClass("invalid");
                    $("#Sexo").addClass("valid");
                }
            });
        $("#curso").blur(function() {
            if ($("#curso").val() == "") {
                $("#curso").addClass("invalid");
            } else {
                $("#curso").removeClass("invalid");
                $("#curso").addClass("valid");
            }
        })
        $("#periodo").blur(function() {
            if ($("#periodo").val() == "") {
                $("#periodo").addClass("invalid");
            } else {
                $("#periodo").removeClass("invalid");
                $("#periodo").addClass("valid");
            }
        })
        $("#modulo").blur(function() {
            if ($("#modulo").val() == "") {
                $("#modulo").addClass("invalid");
            } else {
                $("#modulo").removeClass("invalid");
                $("#modulo").addClass("valid");
            }
        })
        $("#complemento").blur(function() {
            if (document.getElementById("complemento").value.length > 1) {
                if (!/^[A-Za-zÀ-ú]{1,30}$/.test(document.getElementById("complemento").value)) {
                    $("#complemento").addClass("invalid");
                } else {
                    $("#complemento").removeClass("invalid");
                    $("#complemento").addClass("valid");
                }
            } else {
                $("#complemento").removeClass("invalid");
                $("#complemento").addClass("valid");
            }
        })
        $("#dtnasc").blur(function() {
            if ($("#dtnasc").val() == "") {
                $("#dtnasc").removeClass("invalid");
            } else {
                $("#dtnasc").removeClass("invalid");
                $("#dtnasc").addClass("valid");
            }
        })
        $("#RG").blur(function() {
            if ($("#RG").val().length >= 9) {
                if (!/^[0-9x-xX-X]{9,11}$/.test(document.getElementById("RG").value) === true) {
                    $("#erroRG").attr("data-tooltip", "RG inválido! Digite o RG do aluno. Obs: Não utilize pontos e traços");
                    $("#erroRG").tooltip();
                    $("#RG").addClass("invalid");
                    $("#erroRG").after().removeClass(" hide");
                    $("#ACRG").after().addClass("hide");
                } else {
                    $.ajax({
                        type: "POST",
                        url: 'cadastrar_aluno.php',
                        data: 'rg=' + $("#RG").val(),
                        dataType: 'text',
                        success: function(resultado) {
                            if (resultado == false) {
                                $("#erroRG").attr("data-tooltip", "RG já cadastrado!");
                                $("#erroRG").tooltip();
                                $("#RG").addClass("invalid");
                                $("#erroRG").after().removeClass(" hide");
                                $("#ACRG").after().addClass("hide");
                            } else {
                                $("#erroRG").after().addClass(" hide");
                                $("#RG").removeClass("invalid");
                                $("#RG").addClass("valid");
                                $("#ACRG").after().removeClass("hide");
                            }
                        }
                    });
                }
            } else if ($("#RG").val().length < 9) {
                $("#erroRG").attr("data-tooltip", "RG inválido! Digite o RG do aluno. Obs: Não utilize pontos e traços");
                $("#erroRG").tooltip();
                $("#RG").addClass("invalid");
                $("#erroRG").after().removeClass(" hide");
                $("#ACRG").after().addClass("hide");
            }
        });
        $("#CPF").blur(function() {
            if ($("#CPF").val().length < 11) {
                $("#erroCPF").attr("data-tooltip", "CPF deve ter no mínimo 11 caracteres");
                $("#erroCPF").tooltip();
                $("#CPF").addClass("invalid");
                $("#erroCPF").after().removeClass(" hide");
                $("#ACCPF").after().addClass("hide");
            } else if ($("#CPF").val().length >= 11) {
                if (!CPF.validate(document.getElementById('CPF').value) === true) {
                    $("#erroCPF").attr("data-tooltip", "CPF inválido! Digite o CPF verdadeiro do aluno");
                    $("#erroCPF").tooltip();
                    $("#CPF").addClass("invalid");
                    $("#erroCPF").after().removeClass(" hide");
                    $("#ACCPF").after().addClass("hide");
                    return false;
                } else {
                    $.ajax({
                        type: "POST",
                        url: "cadastrar_aluno.php",
                        data: "cpf=" + CPF.format(document.getElementById('CPF').value),
                        dataType: "text",
                        async: false,
                        success: function(resultado) {
                            if (resultado == false) {
                                $("#erroCPF").attr("data-tooltip", "CPF já está cadastrado!");
                                $("#erroCPF").tooltip();
                                $("#CPF").addClass("invalid");
                                $("#erroCPF").after().removeClass(" hide");
                                $("#ACCPF").after().addClass("hide");
                                return false;
                            } else {
                                $("#erroCPF").after().addClass(" hide");
                                $("#CPF").removeClass("invalid");
                                $("#CPF").addClass("valid");
                                $("#ACCPF").after().removeClass("hide");
                            }
                        },
                    })
                }
            }
        });
        $("#CEP").blur(function() {
            if (!/^(\d{5,5}-\d{3,3})|(\d{8,8})$/.test(document.getElementById("CEP").value)) {
                $("#erroCEP").attr("data-tooltip", "Formato de CEP incorreto!");
                $("#erroCEP").tooltip();
                $("#erroCEP").after().removeClass(" hide");
                $("#CEP").addClass("invalid");
                $("#ACCEP").after().addClass("hide");
            } else {
                $("#erroCEP").after().addClass(" hide");
                $("#CEP").removeClass("invalid");
                $("#CEP").addClass("valid");
                $("#ACCEP").after().removeClass("hide");
                $.ajax({
                    type: "GET",
                    url: "http://republicavirtual.com.br/web_cep.php",
                    data: "cep=" + $("#CEP").val() + "&formato=JSON",
                    dataType: "text",
                    async: false,
                    success: function(resultado) {
                        var obj = jQuery.parseJSON(resultado);
                        if (obj.resultado == false) {
                            $("#erroCEP").attr("data-tooltip", "CEP inválido!");
                            $("#erroCEP").tooltip();
                            $("#erroCEP").after().removeClass(" hide");
                            $("#CEP").addClass("invalid");
                            $("#ACCEP").after().addClass("hide");
                        } else {
                            $("#erroCEP").after().addClass(" hide");
                            $("#CEP").removeClass("invalid");
                            $("#CEP").addClass("valid");
                            $("#ACCEP").after().removeClass("hide");
                            $("#endereco").val(obj.tipo_logradouro + " " + obj.logradouro);
                            $("#bairro").val(obj.bairro);
                            $("#estado").val(obj.uf);
                            $("#cidade").val(obj.cidade);
                        }
                    }
                });
            }
        });
        $("#curso").change(function() {
            $("#periodo_modulo").html("");
            $.ajax({
                type: "POST",
                url: "cadastrar_aluno.php",
                data: "curso_id=" + $("#curso").val(),
                dataType: "text",
                async: false,
                success: function(resultado) {
                    $("#loadingCurso").after().removeClass(" hide");
                    setTimeout(function() {
                        $("#loadingCurso").after().addClass(" hide");
                        $("#periodo_modulo").html(resultado);
                        $('select').material_select();
                    }, 2000);
                }
            })
        });
        $("#formCDAluno").submit(function(event) {
            var nErro = 0;
            $("#erroCad").html("");
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
            }
            if (!/^(\d){5,}$/.test(document.getElementById("RM").value) === true) {
                $("#erroRM").attr("data-tooltip", "O RM deve conter 5 números! Digite o RM do aluno");
                $("#erroRM").tooltip();
                $("#RM").addClass("invalid");
                $("#erroRM").after().removeClass(" hide");
                $("#ACRM").after().addClass("hide");
                nErro++;
            } else {
                $("#erroRM").after().addClass(" hide");
                $("#RM").removeClass("invalid");
                $("#RM").addClass("valid");
                $("#ACRM").after().removeClass("hide");
            }
            if ($("#Sexo").val() == null) {
                $("#Sexo").addClass("invalid");
                nErro++;
            } else {
                $("#Sexo").removeClass("invalid");
                $("#Sexo").addClass("valid");
            }
            if ($("#RG").val().length >= 9) {
                if (!/^[0-9x-xX-X]{9,11}$/.test(document.getElementById("RG").value) === true) {
                    $("#erroRG").attr("data-tooltip", "RG inválido! Digite o RG do aluno. Obs: Não utilize pontos e traços");
                    $("#erroRG").tooltip();
                    $("#RG").addClass("invalid");
                    $("#erroRG").after().removeClass(" hide");
                    $("#ACRG").after().addClass("hide");
                } else {
                    $.ajax({
                        type: "POST",
                        url: 'cadastrar_aluno.php',
                        data: 'rg=' + $("#RG").val(),
                        dataType: 'text',
                        success: function(resultado) {
                            if (resultado == false) {
                                $("#erroRG").attr("data-tooltip", "RG já cadastrado!");
                                $("#erroRG").tooltip();
                                $("#RG").addClass("invalid");
                                $("#erroRG").after().removeClass(" hide");
                                $("#ACRG").after().addClass("hide");
                            } else {
                                $("#erroRG").after().addClass(" hide");
                                $("#RG").removeClass("invalid");
                                $("#RG").addClass("valid");
                                $("#ACRG").after().removeClass("hide");
                            }
                        }
                    });
                }
            } else if ($("#RG").val().length < 9) {
                $("#erroRG").attr("data-tooltip", "RG inválido! Digite o RG do aluno. Obs: Não utilize pontos e traços");
                $("#erroRG").tooltip();
                $("#RG").addClass("invalid");
                $("#erroRG").after().removeClass(" hide");
                $("#ACRG").after().addClass("hide");
            }
            if ($("#RGUF").val() == null) {
                nErro++;
            }
            if ($("#CPF").val().length < 11) {
                $("#erroCPF").attr("data-tooltip", "CPF deve ter no mínimo 11 caracteres");
                $("#erroCPF").tooltip();
                $("#CPF").addClass("invalid");
                $("#erroCPF").after().removeClass(" hide");
                $("#ACCPF").after().addClass("hide");
                nErro++;
            } else if ($("#CPF").val().length >= 11) {
                if (!CPF.validate(document.getElementById('CPF').value) === true) {
                    $("#erroCPF").attr("data-tooltip", "CPF inválido! Digite o CPF verdadeiro do aluno");
                    $("#erroCPF").tooltip();
                    $("#CPF").addClass("invalid");
                    $("#erroCPF").after().removeClass(" hide");
                    $("#ACCPF").after().addClass("hide");
                    nErro++;
                } else {
                    $.ajax({
                        type: "POST",
                        url: "cadastrar_aluno.php",
                        data: "cpf=" + CPF.format(document.getElementById('CPF').value),
                        dataType: "text",
                        async: false,
                        success: function(resultado) {
                            if (resultado == false) {
                                $("#erroCPF").attr("data-tooltip", "CPF já está cadastrado!");
                                $("#erroCPF").tooltip();
                                $("#CPF").addClass("invalid");
                                $("#erroCPF").after().removeClass(" hide");
                                $("#ACCPF").after().addClass("hide");
                                nErro++;
                            } else {
                                $("#erroCPF").after().addClass(" hide");
                                $("#CPF").removeClass("invalid");
                                $("#CPF").addClass("valid");
                                $("#ACCPF").after().removeClass("hide");
                                document.getElementById('CPF').value = CPF.format(document.getElementById('CPF').value);
                            }
                        },
                    })
                }
            }
            if ($("#tipoEndereco").val() == null) {
                nErro++;
            }
            if (!/^(\d{5,5}-\d{3,3})|(\d{8,8})$/.test(document.getElementById("CEP").value)) {
                $("#erroCEP").attr("data-tooltip", "Formato de CEP incorreto!");
                $("#erroCEP").tooltip();
                $("#erroCEP").after().removeClass(" hide");
                $("#CEP").addClass("invalid");
                $("#ACCEP").after().addClass("hide");
                nErro++;
            } else {
                $("#erroCEP").after().addClass(" hide");
                $("#CEP").removeClass("invalid");
                $("#CEP").addClass("valid");
                $("#ACCEP").after().removeClass("hide");
            }
            if ($("#curso").val() == null) {
                $("#curso").addClass("invalid");
                nErro++;
            } else {
                $("#curso").removeClass("invalid");
                $("#curso").addClass("valid");
            }
            if ($("#periodo").val() == null) {
                $("#periodo").addClass("invalid");
                nErro++;
            } else {
                $("#periodo").removeClass("invalid");
                $("#periodo").addClass("valid");
            }
            if ($("#modulo").val() == null) {
                $("#modulo").addClass("invalid");
                nErro++;
            } else {
                $("#modulo").removeClass("invalid");
                $("#modulo").addClass("valid");
            }
            if (document.getElementById("numero").value == null) {
                $("#numero").addClass("invalid");
                nErro++;
            } else if (!/^[A-Za-z0-9]{1,5}$/.test(document.getElementById("numero").value)) {
                $("#numero").addClass("invalid");
                nErro++;
            } else {
                $("#numero").removeClass("invalid");
                $("#numero").addClass("valid");
            }
            if (document.getElementById("complemento").value.length > 1) {
                if (!/^[A-Za-zÀ-ú]{1,30}$/.test(document.getElementById("complemento").value)) {
                    $("#complemento").addClass("invalid");
                    nErro++;
                } else {
                    $("#complemento").removeClass("invalid");
                    $("#complemento").addClass("valid");
                }
            } else {
                $("#complemento").removeClass("invalid");
                $("#complemento").addClass("valid");
            }
            if ($("#dtnasc").val() == "") {
                $("#dtnasc").removeClass("invalid");
                nErro++;
            } else {
                $("#dtnasc").removeClass("invalid");
                $("#dtnasc").addClass("valid");
            }
            if (nErro > 0) {
                var html = "<div id='alert_box' class='card red'><div class='card-content white-text'><p><i class='material-icons' style='position: relative;top: 5px;'>error</i>EDIÇÃO NÃO FOI CONCLUÍDA, ALGUNS CAMPOS PRECISAM SER VERIFICADOS, POR FAVOR, VERIFIQUE E CORRIJA-OS E TENTE NOVAMENTE!<br></p></div> <i class='material-icons' style='position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;' id='alert_close' onclick='closeAlert()'>close</i></div>";
                $("#erroCad").html(html);
                return false;
            } else {
                return true;
            }
        });