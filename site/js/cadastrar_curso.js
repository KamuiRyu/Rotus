       $(document).ready(function() {
           $('.collapsible').collapsible();
           $('.materialboxed').materialbox();
           $('select').material_select();
       });

       function closeAlert() {
           $("#alert_box").fadeOut("slow", function() {});
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
           }
       });
       $("#formCDCurso").submit(function() {
           var nErro = 0;
           if ($("#Modulo").val() == "") {
               $("#Modulo").addClass("valid");
               $("#Modulo").removeClass("valid");
               nErro++;
           } else {
               $("#Modulo").removeClass("invalid");
               $("#Modulo").addClass("valid");
           }
           if ($("#Periodo").val() == "") {
               $("#Periodo").addClass("valid");
               $("#Periodo").removeClass("valid");
               nErro++;
           } else {
               $("#Periodo").removeClass("invalid");
               $("#Periodo").addClass("valid");
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
           }
           if (nErro < 1) {
               $("#erroCad").html("");
           } else {
               var html = "<div id='alert_box' class='card red'><div class='card-content white-text'><p><i class='material-icons' style='position: relative;top: 5px;'>error</i>EDIÇÃO NÃO FOI CONCLUÍDA, ALGUNS CAMPOS PRECISAM SER VERIFICADOS, POR FAVOR, VERIFIQUE E CORRIJA-OS E TENTE NOVAMENTE!<br>DICA: VERIFIQUE SE SELECIONOU O MODULO E PERIODO.</p></div> <i class='material-icons' style='position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;' id='alert_close' onclick='closeAlert()'>close</i></div>";
               $("#erroCad").html(html);
               return false;
           }
       })