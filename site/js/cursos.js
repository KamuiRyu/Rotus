        $(document).ready(function() {
            $('select').material_select();
            $('.modal').modal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '30%', // Ending
            });
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

        function closeAlert() {
            $("#alert_box").fadeOut("slow", function() {});
        }
        $("#tipoBusca").change(function(input) {
            if (input["currentTarget"].value == "0") {
                $("#Busca").css({
                    display: "none",
                })
                $("#BuscaCurso").css({
                    display: "none",
                })
                $("#periodo_modulo").css({
                    display: "none",
                })
            } else if (input["currentTarget"].value == "1") {
                $("#Busca").css({
                    display: "block",
                })
                $("#BuscaCurso").css({
                    display: "none",
                })
                $("#periodo_modulo").css({
                    display: "none",
                })
            } else if (input["currentTarget"].value == "2") {
                $("#Busca").css({
                    display: "block",
                })
                $("#BuscaCurso").css({
                    display: "none",
                })
                $("#periodo_modulo").css({
                    display: "none",
                })
            } else {
                $("#Busca").css({
                    display: "none",
                })
                $("#BuscaCurso").css({
                    display: "block",
                })
                $("#periodo_modulo").css({
                    display: "block",
                })
            }
        })
        $("#btnFiltrar").click(function() {
            if (!$("#tipoBusca").val() == "") {
                if ($("#tipoBusca").val() == "0") {
                    $("#buscaErro").html("");
                    $("#loadingAlunos").removeClass("hide");
                    $("#tabelaAlunos").css({
                        display: "none"
                    });
                    $.ajax({
                        type: "POST",
                        url: 'cursos.php',
                        data: 'semFiltro=0',
                        dataType: 'text',
                        success: function(resultado) {
                            if (resultado != "blank") {
                                var obj = jQuery.parseJSON(resultado),
                                    nCont = 0,
                                    objTam = obj.length,
                                    html = "";
                                while (nCont < objTam) {
                                    html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['curNome'] + "</td><td>" + obj[nCont]['modDesc'] + "</td><td>" + obj[nCont]['perDesc'] + "</td><td><a href='#' title='Visualizar' onclick='visualizarAluno(this)'" + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons blue-text'>visibility</i></a><a href='#' title='Editar' onclick='editarAluno(this)'" + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons black-text'>mode_edit</i></a><a href='#deletarAluno' onclick='deletarAluno(this)' title='Deletar' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons red-text'>delete</i></a></td>";
                                    nCont++;
                                }
                                $("#mostrarAlunos").html(html);
                                $("#loadingAlunos").after().addClass(" hide");
                                $("#tabelaAlunos").css({
                                    display: "table"
                                });
                            } else if (resultado == "") {
                                $("#mostrarAlunos").html("");
                                $("#loadingAlunos").after().addClass(" hide");
                                $("#tabelaAlunos").css({
                                    display: "table"
                                });
                                $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                            } else {
                                $("#mostrarAlunos").html("");
                                $("#loadingAlunos").after().addClass(" hide");
                                $("#tabelaAlunos").css({
                                    display: "table"
                                });
                                $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                            }
                        }
                    })
                } else if ($("#tipoBusca").val() == "1") {
                    if ($("#search").val() != "") {
                        $("#buscaErro").html("");
                        $("#loadingAlunos").removeClass("hide");
                        $("#tabelaAlunos").css({
                            display: "none"
                        });
                        $.ajax({
                            type: "POST",
                            url: 'cursos.php',
                            data: 'tipoBusca=' + $("#tipoBusca").val() + "&Busca=" + $("#search").val(),
                            dataType: 'text',
                            success: function(resultado) {
                                if (resultado != "blank") {
                                    var obj = jQuery.parseJSON(resultado),
                                        nCont = 0,
                                        objTam = obj.length,
                                        html = "";
                                    while (nCont < objTam) {
                                        html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['curNome'] + "</td><td>" + obj[nCont]['modDesc'] + "</td><td>" + obj[nCont]['perDesc'] + "</td><td><a href='#' title='Visualizar' onclick='visualizarAluno(this)' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons blue-text'>visibility</i></a><a href='#' title='Editar' onclick='editarAluno(this)'" + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons black-text'>mode_edit</i></a><a href='#deletarAluno' onclick='deletarAluno(this)' title='Deletar' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons red-text'>delete</i></a></td>";
                                        nCont++;
                                    }
                                    $("#mostrarAlunos").html(html);
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                } else if (resultado == "") {
                                    $("#mostrarAlunos").html("");
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                    $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                                } else {
                                    $("#mostrarAlunos").html("");
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                    $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                                }
                            }
                        })
                    }
                } else if ($("#tipoBusca").val() == "2") {
                    if ($("#search").val() != "") {
                        $("#buscaErro").html("");
                        $("#loadingAlunos").removeClass("hide");
                        $("#tabelaAlunos").css({
                            display: "none"
                        });
                        $.ajax({
                            type: "POST",
                            url: 'cursos.php',
                            data: 'tipoBusca=' + $("#tipoBusca").val() + "&Busca=" + $("#search").val(),
                            dataType: 'text',
                            success: function(resultado) {
                                if (resultado != "blank") {
                                    var obj = jQuery.parseJSON(resultado),
                                        nCont = 0,
                                        objTam = obj.length,
                                        html = "";
                                    while (nCont < objTam) {
                                        html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['curNome'] + "</td><td>" + obj[nCont]['modDesc'] + "</td><td>" + obj[nCont]['perDesc'] + "</td><td><a href='#' title='Visualizar' onclick='visualizarAluno(this)' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons blue-text'>visibility</i></a><a href='#' title='Editar' onclick='editarAluno(this)'" + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons black-text'>mode_edit</i></a><a href='#deletarAluno' onclick='deletarAluno(this)' title='Deletar' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons red-text'>delete</i></a></td>";
                                        nCont++;
                                    }
                                    $("#mostrarAlunos").html(html);
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                } else if (resultado == "") {
                                    $("#mostrarAlunos").html("");
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                    $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                                } else {
                                    $("#mostrarAlunos").html("");
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                    $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                                }
                            }
                        })
                    }
                } else if ($("#tipoBusca").val() == "3") {
                    if ($("#cursoNome").val() != "") {
                        $("#buscaErro").html("");
                        $("#loadingAlunos").removeClass("hide");
                        $("#tabelaAlunos").css({
                            display: "none"
                        });
                        $.ajax({
                            type: "POST",
                            url: 'cursos.php',
                            data: 'tipoBusca=' + $("#tipoBusca").val() + "&Curso=" + $("#cursoNome").val() + "&Periodo=" + $("#periodo").val() + "&Modulo=" + $("#modulo").val(),
                            dataType: 'text',
                            success: function(resultado) {
                                if (resultado != "blank") {
                                    var obj = jQuery.parseJSON(resultado),
                                        nCont = 0,
                                        objTam = obj.length,
                                        html = "";
                                    while (nCont < objTam) {
                                        html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['curNome'] + "</td><td>" + obj[nCont]['modDesc'] + "</td><td>" + obj[nCont]['perDesc'] + "</td><td><a href='#' title='Visualizar' onclick='visualizarAluno(this)' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons blue-text'>visibility</i></a><a href='#' title='Editar' onclick='editarAluno(this)'" + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons black-text'>mode_edit</i></a><a href='#deletarAluno' onclick='deletarAluno(this)' title='Deletar' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons red-text'>delete</i></a></td>";
                                        nCont++;
                                    }
                                    $("#mostrarAlunos").html(html);
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                } else if (resultado == "") {
                                    $("#mostrarAlunos").html("");
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                    $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                                } else {
                                    $("#mostrarAlunos").html("");
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                    $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                                }
                            }
                        })
                    }
                } else {
                    $("#buscaErro").html("");
                    $("#loadingAlunos").removeClass("hide");
                    $("#tabelaAlunos").css({
                        display: "none"
                    });
                    $.ajax({
                        type: "POST",
                        url: 'cursos.php',
                        data: 'semFiltro=0',
                        dataType: 'text',
                        success: function(resultado) {
                            if (resultado != "blank") {
                                var obj = jQuery.parseJSON(resultado),
                                    nCont = 0,
                                    objTam = obj.length,
                                    html = "";
                                while (nCont < objTam) {
                                    html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['curNome'] + "</td><td>" + obj[nCont]['modDesc'] + "</td><td>" + obj[nCont]['perDesc'] + "</td><td><a href='#' title='Visualizar' onclick='visualizarAluno(this)' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons blue-text'>visibility</i></a><a href='#' title='Editar' onclick='editarAluno(this)'" + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons black-text'>mode_edit</i></a><a href='#deletarAluno' onclick='deletarAluno(this)' title='Deletar' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons red-text'>delete</i></a></td>";
                                    nCont++;
                                }
                                $("#mostrarAlunos").html(html);
                                $("#loadingAlunos").after().addClass(" hide");
                                $("#tabelaAlunos").css({
                                    display: "table"
                                });
                            } else if (resultado == "") {
                                $("#mostrarAlunos").html("");
                                $("#loadingAlunos").after().addClass(" hide");
                                $("#tabelaAlunos").css({
                                    display: "table"
                                });
                                $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                            } else {
                                $("#mostrarAlunos").html("");
                                $("#loadingAlunos").after().addClass(" hide");
                                $("#tabelaAlunos").css({
                                    display: "table"
                                });
                                $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                            }
                        }
                    })
                }
            }
        })
        $("#tipoBuscaAtivo").change(function(input) {
            if (input["currentTarget"].value == "0") {
                $("#BuscaAtivo").css({
                    display: "none",
                })
                $("#BuscaCursoAtivo").css({
                    display: "none",
                })
            } else if (input["currentTarget"].value == "1") {
                $("#BuscaAtivo").css({
                    display: "block",
                })
                $("#BuscaCursoAtivo").css({
                    display: "none",
                })
            } else if (input["currentTarget"].value == "2") {
                $("#BuscaAtivo").css({
                    display: "block",
                })
                $("#BuscaCursoAtivo").css({
                    display: "none",
                })
            } else {
                $("#BuscaAtivo").css({
                    display: "none",
                })
                $("#BuscaCursoAtivo").css({
                    display: "block",
                })
            }
        })
        $("#btnFiltrarAtivo").click(function() {
            if (!$("#tipoBuscaAtivo").val() == "") {
                if ($("#tipoBuscaAtivo").val() == "0") {
                    $("#buscaErroAtivo").html("");
                    $("#loadingAlunosAtivos").removeClass("hide");
                    $("#tabelaAlunosAtivos").css({
                        display: "none"
                    });
                    $.ajax({
                        type: "POST",
                        url: 'cursos.php',
                        data: 'semFiltroAtivo=0',
                        dataType: 'text',
                        success: function(resultado) {
                            if (resultado != "blank") {
                                var obj = jQuery.parseJSON(resultado),
                                    nCont = 0,
                                    objTam = obj.length,
                                    html = "";
                                while (nCont < objTam) {
                                    html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['entrada'] + "</td><td>" + obj[nCont]['saida'] + "</td><td>" + obj[nCont]['curNome'] + "</td>";
                                    nCont++;
                                }
                                $("#mostrarAlunosAtivos").html(html);
                                $("#loadingAlunosAtivos").after().addClass(" hide");
                                $("#tabelaAlunosAtivos").css({
                                    display: "table"
                                });
                            } else if (resultado == "") {
                                $("#mostrarAlunosAtivos").html("");
                                $("#loadingAlunosAtivos").after().addClass(" hide");
                                $("#tabelaAlunosAtivos").css({
                                    display: "table"
                                });
                                $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                            } else {
                                $("#mostrarAlunosAtivos").html("");
                                $("#loadingAlunosAtivos").after().addClass(" hide");
                                $("#tabelaAlunosAtivos").css({
                                    display: "table"
                                });
                                $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                            }
                        }
                    })
                } else if ($("#tipoBuscaAtivo").val() == "1") {
                    if ($("#searchAtivo").val() != "") {
                        $("#buscaErroAtivo").html("");
                        $("#loadingAlunosAtivos").removeClass("hide");
                        $("#tabelaAlunosAtivos").css({
                            display: "none"
                        });
                        $.ajax({
                            type: "POST",
                            url: 'cursos.php',
                            data: 'tipoBuscaAtivo=' + $("#tipoBuscaAtivo").val() + "&BuscaAtivo=" + $("#searchAtivo").val(),
                            dataType: 'text',
                            success: function(resultado) {
                                if (resultado != "blank") {
                                    var obj = jQuery.parseJSON(resultado),
                                        nCont = 0,
                                        objTam = obj.length,
                                        html = "";
                                    while (nCont < objTam) {
                                        html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['entrada'] + "</td><td>" + obj[nCont]['saida'] + "</td><td>" + obj[nCont]['curNome'] + "</td>";
                                        nCont++;
                                    }
                                    $("#mostrarAlunosAtivos").html(html);
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                } else if (resultado == "") {
                                    $("#mostrarAlunosAtivos").html("");
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                    $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                                } else {
                                    $("#mostrarAlunosAtivos").html("");
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                    $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                                }
                            }
                        })
                    }
                } else if ($("#tipoBuscaAtivo").val() == "2") {
                    if ($("#searchAtivo").val() != "") {
                        $("#buscaErroAtivo").html("");
                        $("#loadingAlunosAtivos").removeClass("hide");
                        $("#tabelaAlunosAtivos").css({
                            display: "none"
                        });
                        $.ajax({
                            type: "POST",
                            url: 'cursos.php',
                            data: 'tipoBuscaAtivo=' + $("#tipoBuscaAtivo").val() + "&BuscaAtivo=" + $("#searchAtivo").val(),
                            dataType: 'text',
                            success: function(resultado) {
                                if (resultado != "blank") {
                                    var obj = jQuery.parseJSON(resultado),
                                        nCont = 0,
                                        objTam = obj.length,
                                        html = "";
                                    while (nCont < objTam) {
                                        html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['entrada'] + "</td><td>" + obj[nCont]['saida'] + "</td><td>" + obj[nCont]['curNome'] + "</td>";
                                        nCont++;
                                    }
                                    $("#mostrarAlunosAtivos").html(html);
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                } else if (resultado == "") {
                                    $("#mostrarAlunosAtivos").html("");
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                    $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                                } else {
                                    $("#mostrarAlunosAtivos").html("");
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                    $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                                }
                            }
                        })
                    }
                } else if ($("#tipoBuscaAtivo").val() == "3") {
                    if ($("#cursoNomeAtivo").val() != "") {
                        $("#buscaErroAtivo").html("");
                        $("#loadingAlunosAtivos").removeClass("hide");
                        $("#tabelaAlunosAtivos").css({
                            display: "none"
                        });
                        $.ajax({
                            type: "POST",
                            url: 'cursos.php',
                            data: 'tipoBuscaAtivo=' + $("#tipoBuscaAtivo").val() + "&CursoAtivo=" + $("#cursoNomeAtivo").val(),
                            dataType: 'text',
                            success: function(resultado) {
                                if (resultado != "blank") {
                                    var obj = jQuery.parseJSON(resultado),
                                        nCont = 0,
                                        objTam = obj.length,
                                        html = "";
                                    while (nCont < objTam) {
                                        html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['entrada'] + "</td><td>" + obj[nCont]['saida'] + "</td><td>" + obj[nCont]['curNome'] + "</td>";
                                        nCont++;
                                    }
                                    $("#mostrarAlunosAtivos").html(html);
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                } else if (resultado == "") {
                                    $("#mostrarAlunosAtivos").html("");
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                    $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                                } else {
                                    $("#mostrarAlunosAtivos").html("");
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                    $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                                }
                            }
                        })
                    }
                } else {
                    $("#buscaErroAtivo").html("");
                    $("#loadingAlunosAtivos").removeClass("hide");
                    $("#tabelaAlunosAtivos").css({
                        display: "none"
                    });
                    $.ajax({
                        type: "POST",
                        url: 'cursos.php',
                        data: 'semFiltroAtivo=0',
                        dataType: 'text',
                        success: function(resultado) {
                            if (resultado != "blank") {
                                var obj = jQuery.parseJSON(resultado),
                                    nCont = 0,
                                    objTam = obj.length,
                                    html = "";
                                while (nCont < objTam) {
                                    html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['entrada'] + "</td><td>" + obj[nCont]['saida'] + "</td><td>" + obj[nCont]['curNome'] + "</td>";
                                    nCont++;
                                }
                                $("#mostrarAlunosAtivos").html(html);
                                $("#loadingAlunosAtivos").after().addClass(" hide");
                                $("#tabelaAlunosAtivos").css({
                                    display: "table"
                                });
                            } else if (resultado == "") {
                                $("#mostrarAlunosAtivos").html("");
                                $("#loadingAlunosAtivos").after().addClass(" hide");
                                $("#tabelaAlunosAtivos").css({
                                    display: "table"
                                });
                                $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                            } else {
                                $("#mostrarAlunosAtivos").html("");
                                $("#loadingAlunosAtivos").after().addClass(" hide");
                                $("#tabelaAlunosAtivos").css({
                                    display: "table"
                                });
                                $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                            }
                        }
                    })
                }
            }
        })
        $("#cursoNome").change(function() {
            $("#periodo_modulo").html("");
            $("#loadingCursos").removeClass("hide");
            $.ajax({
                type: "POST",
                url: "cursos.php",
                data: "curso_id=" + $("#cursoNome").val(),
                dataType: "text",
                async: false,
                success: function(resultado) {
                    setTimeout(function() {
                        $("#loadingCursos").after().addClass(" hide");
                        $("#periodo_modulo").after().html(resultado);
                        $('select').material_select();
                    }, 2000);
                }
            });
        })

        function voltaPag() {
            $("#visualizaAluno").fadeOut();
            $("#visualizaAluno").css({
                display: "none"
            });
            $("#editarAluno").fadeOut();
            $("#editarAluno").css({
                display: "none"
            });
            $("#procuraAluno").fadeIn();
            $("#CEP").removeClass("invalid");
            $("#CEP").removeClass("valid");
            $("#erroCEP").after().addClass(" hide");
            $("#ACCEP").after().addClass("hide");
            $("#complemento").removeClass("invalid");
            $("#numero").removeClass("invalid");
            $("#complemento").removeClass("valid");
            $("#numero").removeClass("valid");
        }

        function visualizarAluno(value) {
            $("#procuraAluno").fadeOut();
            $("#loadingPags").removeClass("hide");
            setTimeout(function() {
                $("#visualizaAluno").fadeIn();
                $.ajax({
                    type: "POST",
                    url: "cursos.php",
                    data: "id=" + value.name,
                    dataType: "text",
                    async: false,
                    success: function(resultado) {
                        if (resultado != false) {
                            var obj = jQuery.parseJSON(resultado);
                            $("#viewFoto").attr("src", "");
                            $("#viewRM").val("");
                            $("#viewNome").val("");
                            $("#viewSexo").val("");
                            $("#viewDTNasc").val("");
                            $("#viewRG").val("");
                            $("#viewRGUF").val("");
                            $("#viewCPF").val("");
                            $("#viewCEP").val("");
                            $("#viewEndereco").val("");
                            $("#viewEstado").val("");
                            $("#viewCidade").val("");
                            $("#viewBairro").val("");
                            $("#viewCurso").val("");
                            $("#viewPeriodo").val("");
                            if (obj.foto == "") {
                                $("#viewFoto").attr("src", "../profiles/avatar.gif");
                            } else {
                                $("#viewFoto").attr("src", obj.foto);
                            }
                            $("#viewRM").val(obj.rm);
                            $("#viewNome").val(obj.nome);
                            $("#viewSexo").val(obj.sexo);
                            $("#viewDTNasc").val(obj.dtnasc);
                            $("#viewRG").val(obj.rg);
                            $("#viewRGUF").val(obj.rguf);
                            $("#viewCPF").val(obj.cpf);
                            $("#viewCEP").val(obj.cep);
                            $("#viewEndereco").val(obj.endereco);
                            $("#viewEstado").val(obj.estado);
                            $("#viewCidade").val(obj.cidade);
                            $("#viewBairro").val(obj.bairro);
                            $("#viewCurso").val(obj.curso + " " + obj.modulo + "MODULO");
                            $("#viewPeriodo").val(obj.periodo);
                            $("#loadingPags").after().addClass(" hide");
                        } else {
                            $("#loadingPags").after().addClass(" hide");
                        }
                    }
                });
            }, 450);
        }

        function editarAluno(value) {
            $("#procuraAluno").fadeOut();
            $("#loadingPags").removeClass("hide");
            setTimeout(function() {
                $("#editarAluno").fadeIn();
                $.ajax({
                    type: "POST",
                    url: "cursos.php",
                    data: "editaid=" + value.name,
                    dataType: "text",
                    async: false,
                    success: function(resultado) {
                        if (resultado != false) {
                            var obj = jQuery.parseJSON(resultado);
                            $("#btnEditar").attr("name", value.name);
                            $("#Nome").val("");
                            $("#RM").val("");
                            $("#Sexo").val("");
                            $("#RG").val("");
                            $("#RGUF").val("");
                            $("#CPF").val("");
                            $("#dtnasc").val("");
                            $('#tpEnd option').removeAttr('selected');
                            $("#CEP").val("");
                            $("#endereco").val("");
                            $("#numero").val("");
                            $("#bairro").val("");
                            $("#complemento").val("");
                            $("#cidade").val("");
                            $("#estado").val("");
                            var endereco = obj[0]["aluLogradouro"].split(", ");
                            $("#Nome").val(obj[0]["aluNome"]);
                            $("#RM").val(obj[0]["aluRM"]);
                            $("#Sexo").val($('option:contains("' + obj[0]["aluSexo"] + '")').val());
                            $("#RG").val(obj[0]["aluRG"]);
                            $("#RGUF").val($('option:contains("' + obj[0]["aluRGUF"] + '")').val());
                            $("#CPF").val(obj[0]["aluCPF"]);
                            $("#dtnasc").val(obj[0]["aluDTNasc"]);
                            $('#tpEnd option').each(function() {
                                if ($(this).val() == obj[0]["aluTipoEndereco"]) {
                                    $(this).prop("selected", true);
                                }
                            });
                            $("#CEP").val(obj[0]["aluCEP"]);
                            $("#endereco").val(endereco[0]);
                            $("#numero").val(endereco[1]);
                            $("#bairro").val(obj[0]["aluBairro"]);
                            $("#complemento").val(obj[0]["aluComplemento"]);
                            $("#cidade").val(obj[0]["aluCidade"]);
                            $("#estado").val(obj[0]["aluEstado"]);
                            $.ajax({
                                type: "POST",
                                url: "cursos.php",
                                data: "carregarCurso=0",
                                dataType: "text",
                                async: false,
                                success: function(resultado) {
                                    if (resultado != "" || resultado != false) {
                                        var array = jQuery.parseJSON(resultado),
                                            nCont = 0,
                                            objTam = array.length,
                                            html = "";
                                        while (nCont < objTam) {
                                            html += "<option value='" + array[nCont]['curID'] + "'>" + array[nCont]['curNome'] + "</option>";
                                            nCont++;
                                        }
                                        $("#CURSO").html(html);
                                    }
                                }
                            });
                            $('#CURSO option').each(function() {
                                if ($(this).val() == obj[0]["curID"]) {
                                    $(this).prop("selected", true);
                                }
                            });
                            $.ajax({
                                type: "POST",
                                url: "cursos.php",
                                data: "carregarCurso=1&id_curso=" + $("#CURSO").val(),
                                dataType: "text",
                                async: false,
                                success: function(resultado) {
                                    if (resultado != "" || resultado != false) {
                                        var arrayn = jQuery.parseJSON(resultado),
                                            nCont = 0,
                                            objTam = arrayn.length,
                                            html = "";
                                        while (nCont < objTam) {
                                            html += "<option value='" + arrayn[nCont]['modID'] + "'>" + arrayn[nCont]['modDesc'] + " MODULO</option>";
                                            nCont++;
                                        }
                                        $("#MODULO").html(html);
                                    }
                                }
                            });
                            $('#MODULO option').each(function() {
                                if ($(this).val() == obj[0]["modID"]) {
                                    $(this).prop("selected", true);
                                }
                            });
                            $.ajax({
                                type: "POST",
                                url: "cursos.php",
                                data: "carregarCurso=2&id_curso=" + $("#CURSO").val(),
                                dataType: "text",
                                async: false,
                                success: function(resultado) {
                                    if (resultado != "" || resultado != false) {
                                        var arraym = jQuery.parseJSON(resultado),
                                            nCont = 0,
                                            objTam = arraym.length,
                                            html = "";
                                        while (nCont < objTam) {
                                            html += "<option value='" + arraym[nCont]['perID'] + "'>" + arraym[nCont]['perDesc'] + "</option>";
                                            nCont++;
                                        }
                                        $("#PERIODO").html(html);
                                    }
                                }
                            });
                            $('#PERIODO option').each(function() {
                                if ($(this).val() == obj[0]["perID"]) {
                                    $(this).prop("selected", true);
                                }
                            });
                            $('select').material_select();
                            $("#loadingPags").after().addClass(" hide");
                        } else {
                            $("#loadingPags").after().addClass(" hide");
                        }
                    }
                });
            }, 500)
        }
        $("#CURSO").change(function() {
            $.ajax({
                type: "POST",
                url: "cursos.php",
                data: "carregarCurso=1&id_curso=" + $("#CURSO").val(),
                dataType: "text",
                async: false,
                success: function(resultado) {
                    if (resultado != "" || resultado != false) {
                        var arrayn = jQuery.parseJSON(resultado),
                            nCont = 0,
                            objTam = arrayn.length,
                            html = "";
                        while (nCont < objTam) {
                            html += "<option value='" + arrayn[nCont]['modID'] + "'>" + arrayn[nCont]['modDesc'] + " MODULO</option>";
                            nCont++;
                        }
                        $("#MODULO").html("");
                        $("#MODULO").html(html);
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "cursos.php",
                data: "carregarCurso=2&id_curso=" + $("#CURSO").val(),
                dataType: "text",
                async: false,
                success: function(resultado) {
                    if (resultado != "" || resultado != false) {
                        var arraym = jQuery.parseJSON(resultado),
                            nCont = 0,
                            objTam = arraym.length,
                            html = "";
                        while (nCont < objTam) {
                            html += "<option value='" + arraym[nCont]['perID'] + "'>" + arraym[nCont]['perDesc'] + "</option>";
                            nCont++;
                        }
                        $("#PERIODO").html("");
                        $("#PERIODO").html(html);
                    }
                }
            });
            $('select').material_select();
        })
        $("#CEP").blur(function() {
            if (!/^(\d{5,5}-\d{3,3})|(\d{8,8})$/.test(document.getElementById("CEP").value)) {
                $("#erroCEP").attr("data-tooltip", "Formato de CEP incorreto!");
                $("#erroCEP").tooltip();
                $("#erroCEP").after().addClass(" hide");
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
        $("#numero").blur(function() {
            if (document.getElementById("numero").value == "") {
                $("#numero").addClass("invalid");
            } else if (!/^[A-Za-z0-9]{0,5}$/.test(document.getElementById("numero").value)) {
                $("#numero").addClass("invalid");
            } else {
                $("#numero").removeClass("invalid");
                $("#numero").addClass("valid");
            }
        })

        function deletarAluno(value) {
            $('#deletarAluno').modal('open');
            $("#btnDeletarAluno").attr("name", "");
            $("#btnDeletarAluno").attr("name", value.name);
        }

        function btnEditar(value) {
            var nCont = 0;
            if (!/^(\d{5,5}-\d{3,3})|(\d{8,8})$/.test(document.getElementById("CEP").value)) {
                $("#erroCEP").attr("data-tooltip", "Formato de CEP incorreto!");
                $("#erroCEP").tooltip();
                $("#erroCEP").after().addClass(" hide");
                $("#CEP").addClass("invalid");
                $("#ACCEP").after().addClass("hide");
                nCont++;
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
            if (document.getElementById("numero").value == "") {
                $("#numero").addClass("invalid");
                nCont++;
            } else if (!/^[A-Za-z0-9]{0,5}$/.test(document.getElementById("numero").value)) {
                $("#numero").addClass("invalid");
                nCont++;
            } else {
                $("#numero").removeClass("invalid");
                $("#numero").addClass("valid");
            }
            if (document.getElementById("complemento").value.length > 1) {
                if (!/^[A-Za-zÀ-ú]{1,30}$/.test(document.getElementById("complemento").value)) {
                    $("#complemento").addClass("invalid");
                    nCont++;
                } else {
                    $("#complemento").removeClass("invalid");
                    $("#complemento").addClass("valid");
                }
            } else {
                $("#complemento").removeClass("invalid");
                $("#complemento").addClass("valid");
            }
            if (nCont > 0) {
                var html = "<div id='alert_box' class='card red'><div class='card-content white-text'><p><i class='material-icons' style='position: relative;top: 5px;'>error</i>EDIÇÃO NÃO FOI CONCLUÍDA, ALGUNS CAMPOS PRECISAM SER VERIFICADOS, POR FAVOR, VERIFIQUE E CORRIJA-OS E TENTE NOVAMENTE!<br></p></div> <i class='material-icons' style='position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;' id='alert_close' onclick='closeAlert()'>close</i></div>";
                $(".editErro").html("");
                $(".editErro").html(html);

            } else {
                $.ajax({
                    type: "POST",
                    url: "cursos.php",
                    data: "id_aluno=" + value.name + "&tipoEndereco=" + $("#tpEnd").val() + "&cep=" + $("#CEP").val() + "&endereco=" + $("#endereco").val() + "&numero=" + $("#numero").val() + "&bairro=" + $("#bairro").val() + "&complemento=" + $("#complemento").val() + "&cidade=" + $("#cidade").val() + "&estado=" + $("#estado").val() + "&curso=" + $("#CURSO").val() + "&modulo=" + $("#MODULO").val() + "&periodo=" + $("#PERIODO").val(),
                    dataType: "text",
                    async: false,
                    success: function(resultado) {
                        if (resultado == true) {
                            var html = "<div id='alert_box' class='card green'><div class='card-content white-text'><p><i class='material-icons' style='position: relative;top: 5px;'>check</i>EDIÇÃO FEITA COM SUCESSO!<br></p></div> <i class='material-icons' style='position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;' id='alert_close' onclick='closeAlert()'>close</i></div>";
                            $(".editErro").html("");
                            $(".editErro").html(html);
                            $("#buscaErro").html("");
                            $("#loadingAlunos").removeClass("hide");
                            $("#tabelaAlunos").css({
                                display: "none"
                            });
                            $.ajax({
                                    type: "POST",
                                    url: 'cursos.php',
                                    data: 'semFiltro=0',
                                    dataType: 'text',
                                    success: function(resultado) {
                                        if (resultado != "blank") {
                                            var obj = jQuery.parseJSON(resultado),
                                                nCont = 0,
                                                objTam = obj.length,
                                                html = "";
                                            while (nCont < objTam) {
                                                html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['curNome'] + "</td><td>" + obj[nCont]['modDesc'] + "</td><td>" + obj[nCont]['perDesc'] + "</td><td><a href='#' title='Visualizar' onclick='visualizarAluno(this)'" + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons blue-text'>visibility</i></a><a href='#'  " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons black-text'>mode_edit</i></a><a href='#deletarAluno' onclick='deletarAluno(this)' title='Deletar' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons red-text'>delete</i></a></td>";
                                                nCont++;
                                            }
                                            $("#mostrarAlunos").html(html);
                                            $("#loadingAlunos").after().addClass(" hide");
                                            $("#tabelaAlunos").css({
                                                display: "table"
                                            });
                                        } else if (resultado == "") {
                                            $("#mostrarAlunos").html("");
                                            $("#loadingAlunos").after().addClass(" hide");
                                            $("#tabelaAlunos").css({
                                                display: "table"
                                            });
                                            $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                                        } else {
                                            $("#mostrarAlunos").html("");
                                            $("#loadingAlunos").after().addClass(" hide");
                                            $("#tabelaAlunos").css({
                                                display: "table"
                                            });
                                            $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                                        }
                                    }
                                }),
                                setTimeout(function() {
                                    $("#alert_box").fadeOut("slow", function() {});
                                    $("#visualizaAluno").fadeOut();
                                    $("#visualizaAluno").css({
                                        display: "none"
                                    });
                                    $("#editarAluno").fadeOut();
                                    $("#editarAluno").css({
                                        display: "none"
                                    });
                                    $("#procuraAluno").fadeIn();
                                    $("#CEP").removeClass("invalid");
                                    $("#CEP").removeClass("valid");
                                    $("#erroCEP").after().addClass(" hide");
                                    $("#ACCEP").after().addClass("hide");
                                    $("#complemento").removeClass("invalid");
                                    $("#numero").removeClass("invalid");
                                    $("#complemento").removeClass("valid");
                                    $("#numero").removeClass("valid");
                                }, 2000);
                        } else {
                            var html = "<div id='alert_box' class='card red'><div class='card-content white-text'><p><i class='material-icons' style='position: relative;top: 5px;'>error</i>EDIÇÃO NÃO FOI CONCLUÍDA! VERIFIQUE AS INFORMAÇÕES!<br></p></div> <i class='material-icons' style='position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;' id='alert_close' onclick='closeAlert()'>close</i></div>";
                            $(".editErro").html("");
                            $(".editErro").html(html);

                        }
                    }
                })
            }
        }

        function btnDeletarAluno(value) {
            $.ajax({
                type: "POST",
                url: "cursos.php",
                data: "deleteid=" + value.name,
                dataType: "text",
                async: false,
                success: function(resultado) {
                    if (resultado != false) {
                        var html = "<div id='alert_box' class='card green'><div class='card-content white-text'><p><i class='material-icons' style='position: relative;top: 5px;'>check</i>ALUNO DELETADO COM SUCESSO!<br></p></div> <i class='material-icons' style='position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;' id='alert_close'>close</i></div>";
                        $("#completeMSG").css({
                            display: "block"
                        });
                        $("#completeMSG").html(html);
                        setTimeout(function() {
                            $("#completeMSG").fadeOut();
                        }, 2000);
                        $("#buscaErro").html("");
                        $("#loadingAlunos").removeClass("hide");
                        $("#tabelaAlunos").css({
                            display: "none"
                        });
                        $.ajax({
                            type: "POST",
                            url: 'cursos.php',
                            data: 'semFiltro=0',
                            dataType: 'text',
                            success: function(resultado) {
                                if (resultado != "blank") {
                                    var obj = jQuery.parseJSON(resultado),
                                        nCont = 0,
                                        objTam = obj.length,
                                        html = "";
                                    while (nCont < objTam) {
                                        html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['curNome'] + "</td><td>" + obj[nCont]['modDesc'] + "</td><td>" + obj[nCont]['perDesc'] + "</td><td><a href='#' title='Visualizar' onclick='visualizarAluno(this)' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons blue-text'>visibility</i></a><a href='#'  " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons black-text'>mode_edit</i></a><a href='#deletarAluno' onclick='deletarAluno(this)' title='Deletar' " + "name='" + obj[nCont]['aluID'] + "'><i class='material-icons red-text'>delete</i></a></td>";
                                        nCont++;
                                    }
                                    $("#mostrarAlunos").html(html);
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                } else {
                                    $("#mostrarAlunos").html("");
                                    $("#loadingAlunos").after().addClass(" hide");
                                    $("#tabelaAlunos").css({
                                        display: "table"
                                    });
                                    $("#buscaErro").html("NENHUM REGISTRO ENCONTRADO!");
                                }
                            }
                        })
                        $("#buscaErroAtivo").html("");
                        $("#loadingAlunosAtivos").removeClass("hide");
                        $("#tabelaAlunosAtivos").css({
                            display: "none"
                        });
                        $.ajax({
                            type: "POST",
                            url: 'cursos.php',
                            data: 'semFiltroAtivo=0',
                            dataType: 'text',
                            success: function(resultado) {
                                if (resultado != "blank") {
                                    var obj = jQuery.parseJSON(resultado),
                                        nCont = 0,
                                        objTam = obj.length,
                                        html = "";
                                    while (nCont < objTam) {
                                        html += "<tr><td>" + obj[nCont]['aluRM'] + "</td><td>" + obj[nCont]['aluNome'] + "</td><td>" + obj[nCont]['entrada'] + "</td><td>" + obj[nCont]['saida'] + "</td><td>" + obj[nCont]['curNome'] + "</td>";
                                        nCont++;
                                    }
                                    $("#mostrarAlunosAtivos").html(html);
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                } else {
                                    $("#mostrarAlunosAtivos").html("");
                                    $("#loadingAlunosAtivos").after().addClass(" hide");
                                    $("#tabelaAlunosAtivos").css({
                                        display: "table"
                                    });
                                    $("#buscaErroAtivo").html("NENHUM REGISTRO ENCONTRADO!");
                                }
                            }
                        })
                    } else {
                        var html = "<div id='alert_box' class='card red'><div class='card-content white-text'><p><i class='material-icons' style='position: relative;top: 5px;'>error</i>ERRO AO DELETAR O ALUNO<br></p></div> <i class='material-icons' style='position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;' id='alert_close'>close</i></div>";
                        $("#completeMSG").css({
                            display: "block"
                        });
                        $("#completeMSG").html(html);
                        setTimeout(function() {
                            $("#completeMSG").fadeOut();
                        }, 2000);
                    }
                }
            });
        }