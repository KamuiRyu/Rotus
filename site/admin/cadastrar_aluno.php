<?php
require_once __DIR__ . '/../lib/TemplateLoader.php';
require_once __DIR__ . '/../lib/database.php';
require_once __DIR__ . '/../class/navbar.php';
require_once __DIR__ . '/../class/validation.php';

class CadastrarAluno{
    private $templateLoader;
    public function __construct() {
        if (!Database::conect()) {
            echo "ERRO!";
        }
        session_start();

        $this->templateLoader = new TemplateLoader ( "../template/cadastrar_aluno.html" );

        if(!Validation::Logado()){
            Database::close();
            header('Location: ../index.php');
            return;
        }
        if(isset($_POST["submit"])){
            if($_POST["txtRM"] != "" && $_POST["txtNome"] != "" && $_POST["txtSexo"] != "" && $_POST["txtDTNasc"] != "" && $_POST["txtRG"] != "" && $_POST["txtRGUF"] != "" && $_POST["txtCPF"] != "" && $_POST["txtCEP"] != "" && $_POST["txtTipoEndereco"] != "" && $_POST["txtNumero"] != "" && $_POST["txtLogradouro"] != "" && $_POST["txtBairro"] != "" && $_POST["txtEstado"] != "" && $_POST["txtCidade"] != "" && $_POST["txtCurso"] != "" && $_POST["txtModulo"] != "" && $_POST["txtPeriodo"]){
                $rm = filter_var(preg_replace("([^0-9])","",$_POST["txtRM"]));
                $nome = filter_var($_POST["txtNome"],FILTER_SANITIZE_STRING);
                $sexo = filter_var($_POST["txtSexo"],FILTER_SANITIZE_NUMBER_INT);
                $data = filter_var(preg_replace("([^0-9/])","",$_POST["txtDTNasc"]));
                $dtnasc = implode("-",array_reverse(explode("/",$data)));
                $rg = filter_var($_POST["txtRG"],FILTER_SANITIZE_NUMBER_INT);
                $rguf = filter_var(preg_replace("(^(\D){2,2}$/g)","",$_POST["txtRGUF"]));
                $cpf = filter_var(preg_replace("(([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2}))","$1.$2.$3-$4",$_POST["txtCPF"]));
                $cep = filter_var(preg_replace("(^([0-9]{2})\.?([0-9]{3})-?([0-9]{3})$)","$1$2-$3",$_POST["txtCEP"]));
                $tipo_endereco = filter_var($_POST["txtTipoEndereco"],FILTER_SANITIZE_NUMBER_INT);
                if($_POST["txtComplemento"] != ""){
                    $complemento = filter_var($_POST["txtComplemento"],FILTER_SANITIZE_STRING);
                }
                else{
                    $complemento = "";
                }
                $numero = filter_var($_POST["txtNumero"],FILTER_SANITIZE_STRING);
                $logradouro = filter_var($_POST["txtLogradouro"],FILTER_SANITIZE_STRING);
                $endereco = $logradouro.", ".$numero;
                $bairro = filter_var($_POST["txtBairro"],FILTER_SANITIZE_STRING);
                $estado = filter_var(preg_replace("(^(\D){2,2}$/g)","",$_POST["txtEstado"]));
                $cidade = filter_var($_POST["txtCidade"],FILTER_SANITIZE_STRING);
                $curso = filter_var($_POST["txtCurso"],FILTER_SANITIZE_NUMBER_INT);
                $modulo = filter_var($_POST["txtModulo"],FILTER_SANITIZE_NUMBER_INT);
                $periodo = filter_var($_POST["txtPeriodo"],FILTER_SANITIZE_NUMBER_INT);
                $id = $this->cadastrar($rm,$nome,$sexo,$dtnasc,$rg,$rguf,$cpf,$cep,$tipo_endereco,$endereco,$complemento,$bairro,$estado,$cidade,$curso,$modulo,$periodo);
                if($id == true){
                        $alerta = '<div id="alert_box" class="card green">
                                    <div class="card-content white-text">
                                        <p><i class="material-icons" style="position: relative;top: 5px;">check</i> 
                                        CADASTRO FEITO COM SUCESSO!</p>
                                    </div> 
                                    <i class="material-icons" style="position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;" id="alert_close">close</i>
                                </div>';
                }else{
                        $alerta = '<div id="alert_box" class="card red">
                           <div class="card-content white-text">
                           <p><i class="material-icons" style="position: relative;top: 5px;">errork</i> 
                            ERRO AO CADASTRAR, VERIFIQUE AS INFORMAÇÕES E TENTE NOVAMENTE!<br></p>
                            </div> 
                             <i class="material-icons" style="position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;" id="alert_close">close</i>
                            </div>';      
                }
            }
        }
        $this->templateLoader->assign ( "alerta" , $alerta);
        $this->templateLoader->parse ( "cadastrar_aluno.alerta" );
        if(isset($_POST["curso_id"])){
            echo $this->carregaPeriodos($_POST["curso_id"]);
            echo $this->carregaModulos($_POST["curso_id"]);
            Database::close();
        }
        else if(isset($_POST["cpf"])){
            $cpf = filter_var($_POST["cpf"], FILTER_SANITIZE_STRING);
            echo $this->verificarCPF($cpf);
            Database::close();
        }
        else if(isset($_POST['rg'])){
            $rg = filter_var($_POST["rg"], FILTER_SANITIZE_STRING);
            echo $this->verificarRG($rg);
            Database::close();
        }else if(isset($_POST["excel"])){
            $file = $_FILES['arquivoexcel'];
            echo $this->importarExcel($file);
        }
        else{
            echo $this->carregaCursos();

            echo $this->mostrarCursos();

            $navbar = NavBar::AutenticarUsuario();

            $this->templateLoader->assign ( "navbar" , $navbar);

            Database::close();

            $this->templateLoader->parse ( "cadastrar_aluno" );

            $this->templateLoader->out ( "cadastrar_aluno" );
        }
    }
    public function mostrarCursos(){
        $sql = "SELECT DISTINCT curNome, modDesc,perDesc,idcurso_modulo FROM cursos_modulos INNER JOIN cursos ON curID = cursos_curID INNER JOIN modulo ON modID = modulo_modID INNER JOIN periodo ON perID = periodo_perID ORDER BY idcurso_modulo ASC";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado) > 0){
            foreach ($resultado as $linha) {
                $this->templateLoader->assign ( "curNome" , $linha['curNome']);
                $this->templateLoader->assign ( "perDesc" , $linha['perDesc']);
                $this->templateLoader->assign ( "modDesc" , $linha['modDesc']);
                $this->templateLoader->assign ( "ID" , $linha['idcurso_modulo']);
                $this->templateLoader->parse ( "cadastrar_aluno.mostrar_cursos" );
            }
        }
    }
    public function carregaCursos(){
        $sql= "SELECT DISTINCT curNome, curID FROM cursos_modulos INNER JOIN cursos ON curID = cursos_curID";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        $cursos = "<option value='' selected disabled>Selecione o curso</option>";
        foreach($resultado as $linhas){
            $cursos .= "<option value='".$linhas['curID']."'>".$linhas['curNome']."</option>";
        }
        $this->templateLoader->assign ( "cursos" , $cursos);
    }
    public function carregaPeriodos($curso_id){
        $sql = "SELECT DISTINCT perDesc,curID,perID FROM cursos_modulos INNER JOIN periodo ON perID = periodo_perID INNER JOIN cursos ON curID = cursos_curID WHERE cursos_curID = '$curso_id'";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        $periodos = "<div class='input-field col s12 m6 l6'><select name='txtPeriodo' id='periodo' readonly ><option value='' selected disabled>Selecione o periodo</option>";
        foreach($resultado as $linhas){
            $periodos .= "<option value='".$linhas["perID"]."'>".$linhas["perDesc"]."</option>";
        }
        $periodos .= "</select><label>Periodo</label></div>";
        return $periodos;
    }
    public function carregaModulos($curso_id){
        $sql = "SELECT DISTINCT modDesc, modID FROM cursos_modulos INNER JOIN modulo ON modID = modulo_modID WHERE cursos_curID = '$curso_id'";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        $modulos = "<div class='input-field col s12 m6 l6'><select name='txtModulo' id='modulo' readonly><option value='' selected disabled>Selecione o modulo</option>";
        foreach($resultado as $linhas){
            $modulos .= "<option value='".$linhas["modID"]."'>".$linhas["modDesc"]." MODULO</option>";
        }
        $modulos .= "</select><label>Modulo</label>";
        return $modulos;
    }
    public function verificarCPF($cpf){
        $sql = "SELECT * FROM alunos WHERE aluCPF = '$cpf'";
		if (!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if (count($resultado) > 0) {
            return false;
            exit(0);
        }
		return true;
    }
    public function verificarRG($rg){
        $sql = "SELECT * FROM alunos WHERE aluRG = '$rg'";
		if (!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if (count($resultado) > 0) {
            return false;
            exit(0);
        }
		return true;
    }

    public function cadastrar($RM,$Nome,$Sexo,$DTNASC,$RG,$RGUF,$CPF,$CEP,$TipoEndereco,$Logradouro,$Complemento,$Bairro,$Estado,$Cidade,$Curso,$Modulo,$Periodo){
        // Fazer validação de dados;
        $sql = "SELECT curID , modID, perID, idcurso_modulo FROM cursos_modulos INNER JOIN modulo ON modulo_modID = modID INNER JOIN cursos ON cursos_curID = curID INNER JOIN periodo ON periodo_perID = perID WHERE curID = '$Curso' AND modID = '$Modulo' AND perID = '$Periodo'";
		if (!Database::execute($sql)){
			return "ERRO!";
			exit(0);
		}
        $pesCurso = Database::fetch();
        $curso_id = $pesCurso["idcurso_modulo"];
        $insert = "INSERT INTO alunos (aluRM, aluNome, aluSexo, aluDTNasc, aluRG, aluRGUF, aluCPF, aluCEP, aluTipoEndereco, aluLogradouro, aluComplemento,aluEstado, aluCidade, aluBairro, aluCurso) VALUES ('$RM','$Nome','$Sexo','$DTNASC','$RG','$RGUF','$CPF','$CEP','$TipoEndereco','$Logradouro','$Complemento','$Estado','$Cidade','$Bairro','$curso_id');";
		if (!Database::execute($insert)){
			return false;
			exit(0);
		}
        return true;
    }
    public function importarExcel($file){
        $dados = "";
        $handle = fopen($file['tmp_name'], "r");
        $flag = true;
        $sql = "";
        while ($valores = fgetcsv($handle, 2048, ";")) {
            if($flag) { $flag = false; continue; }
            $sql = "INSERT INTO alunos(aluRM,aluNome,aluSexo,aluDTNasc,aluRG,aluRGUF,aluCPF,aluCEP,aluTipoEndereco,aluLogradouro,aluComplemento,aluEstado,aluCidade,aluBairro,aluCurso) VALUES('$valores[0]','".strtoupper($valores[1])."','$valores[2]','$valores[3]','$valores[4]','$valores[5]','$valores[6]','$valores[7]','1','$valores[8]','$valores[9]','$valores[10]','$valores[11]','$valores[12]','$valores[13]')";
            if (!Database::execute($sql)){
			    return "ERRO!";
			    exit(0);
            }
        }
        return $true;
    }
}
new CadastrarAluno();