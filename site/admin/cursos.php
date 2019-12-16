<?php
require_once __DIR__ . '/../lib/TemplateLoader.php';
require_once __DIR__ . '/../lib/database.php';
require_once __DIR__ . '/../class/navbar.php';
require_once __DIR__ . '/../class/validation.php';

class Cursos{
    private $templateLoader;
    public function __construct() {
        if (!Database::conect()) {
            echo "ERRO!";
        }

        session_start();

        $this->templateLoader = new TemplateLoader ( "../template/cursos.html" );

        if(!Validation::Logado()){
            Database::close();
            header('Location: ../index.php');
            return;
        }
        if(isset($_POST["curso_id"])){
            $id = filter_var(preg_replace("([^0-9])","",$_POST["curso_id"]));
            echo $this->carregaPeriodos($id);
            echo $this->carregaModulos($id);
            Database::close();
        }
        else if(isset($_POST["id"])){
            $id = filter_var(preg_replace("([^0-9])","",$_POST["id"]));
            echo $this->buscaInfo($id);
            Database::close();
        }
        else if(isset($_POST["tipoBusca"])){
            $tipoBusca = filter_var(preg_replace("([^0-9])","",$_POST["tipoBusca"]));
            if($tipoBusca == "3"){
                $curso = filter_var(preg_replace("([^0-9])","",$_POST["Curso"]));
                $modulo = filter_var(preg_replace("([^0-9])","",$_POST["Modulo"]));
                $periodo = filter_var(preg_replace("([^0-9])","",$_POST["Periodo"]));
                if($curso == ""){
                    $curso = '0';
                }
                if($periodo == ""){
                    $periodo = '0';
                }
                if($modulo == ""){
                    $modulo = '0';
                }
                if($_POST["Modulo"] == "" && $_POST["Curso"] == "" && $_POST["Periodo"] == ""){
                    echo "blank";
                    exit(0);
                }
                $array = array($curso,$modulo,$periodo);
                echo $this->carregarAlunos($tipoBusca,$array);
                Database::close();
            }else{
                echo $this->carregarAlunos($tipoBusca,$_POST["Busca"]);
                Database::close();
            }
        }else if(isset($_POST["semFiltro"])){
            echo $this->buscaAlunosNoFiltro();
            Database::close();
        }else if(isset($_POST["deleteid"])){
            $id = filter_var(preg_replace("([^0-9])","",$_POST["deleteid"]));
            echo $this->deletarAluno($id);
        }else if(isset($_POST["tipoBuscaAtivo"])){
            $tipoBuscaAtivo = filter_var(preg_replace("([^0-9])","",$_POST["tipoBuscaAtivo"]));
            if($tipoBuscaAtivo == "3"){
                $curso = filter_var($_POST["CursoAtivo"],FILTER_SANITIZE_STRING);
                if($_POST["CursoAtivo"] == ""){
                    $curso = 0;
                }
                echo $this->carregarAlunosAtivo($tipoBuscaAtivo,$curso);
                Database::close();
            }else{
                echo $this->carregarAlunosAtivo($tipoBuscaAtivo,$_POST["BuscaAtivo"]);
                Database::close();
            }
        }else if(isset($_POST["semFiltroAtivo"])){
            echo $this->buscaAlunosNoFiltroAtivo();
            Database::close();
        }else if(isset($_POST["editaid"])){
            $id = filter_var(preg_replace("([^0-9])","",$_POST["editaid"]));
            echo $this->buscaEdita($id);
            Database::close();
        }else if(isset($_POST["carregarCurso"])){
            if($_POST["carregarCurso"] == "0"){
                echo $this->carregaCursosEditar();
                Database::close();
            }
            if($_POST["carregarCurso"] == "1"){
                $id = filter_var(preg_replace("([^0-9])","",$_POST["id_curso"]));
                echo $this->carregaModuloEditar($id);
                Database::close();
            }
            if($_POST["carregarCurso"] == "2"){
                $id = filter_var(preg_replace("([^0-9])","",$_POST["id_curso"]));
                echo $this->carregaPeriodoEditar($id);
                Database::close();
            }
        }else if($_POST["id_aluno"]){
            $id = filter_var(preg_replace("([^0-9])","",$_POST["id_aluno"]));
            $cep = filter_var(preg_replace("(^([0-9]{2})\.?([0-9]{3})-?([0-9]{3})$)","$1$2-$3",$_POST["cep"]));
            $tipo_endereco = filter_var($_POST["tipoEndereco"],FILTER_SANITIZE_NUMBER_INT);
            if($_POST["complemento"] != ""){
                $complemento = filter_var($_POST["complemento"],FILTER_SANITIZE_STRING);
            }
            else{
                $complemento = "";
            }
            $numero = filter_var($_POST["numero"],FILTER_SANITIZE_STRING);
            $logradouro = filter_var($_POST["endereco"],FILTER_SANITIZE_STRING);
            $endereco = $logradouro.", ".$numero;
            $bairro = filter_var($_POST["bairro"],FILTER_SANITIZE_STRING);
            $estado = filter_var(preg_replace("(^(\D){2,2}$/g)","",$_POST["estado"]));
            $cidade = filter_var($_POST["cidade"],FILTER_SANITIZE_STRING);
            $curso = filter_var($_POST["curso"],FILTER_SANITIZE_NUMBER_INT);
            $modulo = filter_var($_POST["modulo"],FILTER_SANITIZE_NUMBER_INT);
            $periodo = filter_var($_POST["periodo"],FILTER_SANITIZE_NUMBER_INT);
            echo $this->editarAluno($id,$cep,$tipo_endereco,$endereco,$complemento,$bairro,$estado,$cidade,$curso,$modulo,$periodo);
        }
        else{

            echo $this->buscaAlunos();

            echo $this->buscaAlunosAtivos();

            $navbar = NavBar::AutenticarUsuario();

            echo $this->carregaCursos();

            $this->templateLoader->assign ( "navbar" , $navbar);

            Database::close();

            $this->templateLoader->parse ( "cursos" );
                
            $this->templateLoader->out ( "cursos" );
        }
    }
    public function editarAluno($id,$cep,$tipo_endereco,$endereco,$complemento,$bairro,$estado,$cidade,$curso,$modulo,$periodo){
        $sql = "SELECT * FROM `alunos` WHERE aluID='$id'";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
		$resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            $query = "UPDATE alunos SET ";
            if($resultado[0]["aluTipoEndereco"] != $tipo_endereco){
                $query .= "aluTipoEndereco = '$tipo_endereco',";
            }
            if($resultado[0]["aluCEP"] != $cep){
                $query .= "aluCEP = '$cep',";
            }
            if($resultado[0]["aluLogradouro"] != $endereco){
                $query .= "aluLogradouro = '$endereco',";
            }
            if($resultado[0]["aluBairro"] != $bairro){
                $query .= "aluBairro = '$bairro',";
            }
            if($resultado[0]["aluComplemento"] != $complemento){
                $query .= "aluComplemento = '$complemento',";
            }
            if($resultado[0]["aluCidade"] != $cidade){
                $query .= "aluCidade = '$cidade',";
            }
            if($resultado[0]["aluEstado"] != $estado){
                $query .= "aluEstado = '$estado',";
            }
            $buscaCurso = "SELECT idcurso_modulo FROM `cursos_modulos` WHERE cursos_curID='$curso' AND modulo_modID='$modulo' AND periodo_perID='$periodo';";
            if(!Database::execute($buscaCurso)){
                return false;
                exit(0);
            }
            $result = Database::fetchAll();
            if(count($result[0]) > 0){
                $id_curso = $result[0]["idcurso_modulo"];
                $query .= "aluCurso = '$id_curso',";
            }else{
                return false;
                exit(0);
            }
            $update = substr($query,0, $size-1);
            $update .= " WHERE aluID = '$id'";
            if(!Database::execute($update)){
                return false;
                exit(0);
            }
            return true;
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
    public function buscaAlunos(){
        $sql = "SELECT aluRM,aluNome,curNome,modDesc,perDesc,aluID FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID INNER JOIN modulo ON modulo_modID = modID INNER JOIN periodo ON periodo_perID = perID WHERE aluExcluido = '0' ORDER BY aluNome ASC LIMIT 0,30";
        if(!Database::execute($sql)){
			return false;
			exit(0);
        }
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            foreach ($resultado as $linha) {
                $this->templateLoader->assign ( "alunoNome" , $linha['aluNome']);
                $this->templateLoader->assign ( "alunoRM" , $linha['aluRM']);
                $this->templateLoader->assign ( "alunoCurso" , $linha['curNome']);
                $this->templateLoader->assign ( "alunoModulo" , $linha['modDesc']);
                $this->templateLoader->assign ( "alunoPeriodo" , $linha['perDesc']);
                $this->templateLoader->assign ( "alunoID" , $linha['aluID']);
                $this->templateLoader->parse ( "cursos.mostrarAlunos" );
            }
        }
        else{
            $this->templateLoader->assign ( "alunoErro" , "NENHUM REGISTRO ENCONTRADO!");
        }
    }
    public function buscaInfo($id){
        $sql = "SELECT aluID,aluRM,aluNome,aluSexo,aluDTNasc,aluRG,aluRGUF,aluCPF,aluCEP,aluLogradouro,aluEstado,aluCidade,aluBairro,aluFoto,curNome,modDesc,perDesc FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID INNER JOIN modulo ON modulo_modID = modID INNER JOIN periodo ON periodo_perID = perID WHERE aluID = '$id' AND aluExcluido = '0'";
        if(!Database::execute($sql)){
            return false;
            exit(0);
        }
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            if($linha["aluSexo"] == 0){
                $sexo = "Masculino";
            }
            else{
                $sexo = "Feminino";
            }
            $dtnasc = implode("/",array_reverse(explode("-",$resultado[0]['aluDTNasc'])));
            $json = '{"id":"'.$resultado[0]['aluID'].'","rm":"'.$resultado[0]['aluRM'].'","nome":"'.$resultado[0]['aluNome'].'","sexo":"'.$sexo.'","dtnasc":"'.$dtnasc.'","rg":"'.$resultado[0]['aluRG'].'","rguf":"'.$resultado[0]['aluRGUF'].'","cpf":"'.$resultado[0]['aluCPF'].'","cep":"'.$resultado[0]['aluCEP'].'","endereco":"'.$resultado[0]['aluLogradouro'].'","estado":"'.$resultado[0]['aluEstado'].'","cidade":"'.$resultado[0]['aluCidade'].'","bairro":"'.$resultado[0]['aluBairro'].'","foto":"'.$resultado[0]['aluFoto'].'","curso":"'.$resultado[0]['curNome'].'","modulo":"'.$resultado[0]['modDesc'].'","periodo":"'.$resultado[0]['perDesc'].'"}';
            return $json;
        }
        else{
            return false;
        }
    }
    public function carregarAlunos($tipoBusca,$Busca){
        if($tipoBusca == "1"){
            $dados = filter_var(preg_replace("([^0-9])","",$Busca));
            $sql = "SELECT aluRM,aluNome,DATE_FORMAT(aluDTNasc,'%d/%m/%Y') AS aluDTNasc,curNome,modDesc,perDesc,aluID FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID INNER JOIN modulo ON modulo_modID = modID INNER JOIN periodo ON periodo_perID = perID WHERE aluRM = '$dados' AND aluExcluido = '0' ORDER BY aluNome ASC";
            if(!Database::execute($sql)){
                return false;
                exit(0);
            } 
            $resultado = Database::fetchAll();
            if(count($resultado[0]) > 0){
                $json = json_encode($resultado);
                return $json;
            }
            else{
                return "blank";
            }
        }
        else if($tipoBusca == "2"){
            $nome = filter_var($Busca,FILTER_SANITIZE_STRING);
            $sql = "SELECT aluRM,aluNome,DATE_FORMAT(aluDTNasc,'%d/%m/%Y') AS aluDTNasc,curNome,modDesc,perDesc,aluID FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID INNER JOIN modulo ON modulo_modID = modID INNER JOIN periodo ON periodo_perID = perID WHERE aluNome LIKE '%$nome%' AND aluExcluido = '0' ORDER BY aluNome ASC";
            if(!Database::execute($sql)){
                return false;
                exit(0);
            } 
            $resultado = Database::fetchAll();
            if(count($resultado[0]) > 0){
                $json = json_encode($resultado);
                return $json;
            }
            else{
                return "blank";
            }
        }
        else if($tipoBusca == "3"){
            $sql = "SELECT aluRM,aluNome,DATE_FORMAT(aluDTNasc,'%d/%m/%Y') AS aluDTNasc,curNome,modDesc,perDesc,aluID FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID INNER JOIN modulo ON modulo_modID = modID INNER JOIN periodo ON periodo_perID = perID WHERE aluExcluido = '0'";
            if($Busca[0] != '0'){
                $sql .= "AND curID = '$Busca[0]'";
            }
            if($Busca[1] != '0'){
                 $sql .= "AND modID = '$Busca[1]'";
            }
            if($Busca[2] != '0'){
                $sql .= "AND perID = '$Busca[2]'";
            }
            $sql .= " ORDER BY aluNome ASC";
            if(!Database::execute($sql)){
                return false;
                exit(0);
            }
            $resultado = Database::fetchAll();
            if(count($resultado[0]) > 0){
                $json = json_encode($resultado);
                return $json;
            }
            else{
                return "blank";
            }
        }
    }
    public function buscaEdita($id){
        $sql = "SELECT aluID,aluRM,aluNome,aluSexo,DATE_FORMAT(aluDTNasc,'%d/%m/%Y') AS aluDTNasc,aluRG,aluRGUF,aluCPF,aluCEP,aluTipoEndereco,aluLogradouro,aluComplemento,aluEstado,aluCidade,aluBairro,aluFoto,curNome,modDesc,perDesc,curID,modID,perID FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID INNER JOIN modulo ON modulo_modID = modID INNER JOIN periodo ON periodo_perID = perID WHERE aluExcluido = '0' AND aluID = '$id'";
        if(!Database::execute($sql)){
            return false;
            exit(0);
        }
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            $json = json_encode($resultado);
            return $json;
        }
        else{
            return false;
        }
    }
    public function buscaAlunosNoFiltro(){
        $sql = "SELECT aluRM,aluNome,curNome,modDesc,perDesc,aluID FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID INNER JOIN modulo ON modulo_modID = modID INNER JOIN periodo ON periodo_perID = perID WHERE aluExcluido = '0' ORDER BY aluNome ASC LIMIT 0,30";
        if(!Database::execute($sql)){
			return false;
			exit(0);
        }
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            $json = json_encode($resultado);
            return $json;
        }else{
           return "blank";
        }
    }
    public function carregarAlunosAtivo($tipoBuscaAtivo,$BuscaAtivo){
        if($tipoBuscaAtivo == "1"){
            $dados = filter_var(preg_replace("([^0-9])","",$BuscaAtivo));
            $sql = "SELECT aluRM,aluNome,DATE_FORMAT(aluEntrada,'%m/%d/%Y %H:%i:%s') AS entrada,DATE_FORMAT(aluSaida,'%m/%d/%Y %H:%i:%s') AS saida,curNome FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID WHERE aluEntrada IS NOT NULL AND aluExcluido = '0' AND aluRM = '$dados' ORDER BY aluNome ASC LIMIT 0,30";
            if(!Database::execute($sql)){
                return false;
                exit(0);
            } 
            $resultado = Database::fetchAll();
            if(count($resultado[0]) > 0){
                $json = json_encode($resultado);
                return $json;
            }
            else{
                return "blank";
            }
        }
        else if($tipoBuscaAtivo == "2"){
            $nome = filter_var($BuscaAtivo,FILTER_SANITIZE_STRING);
            $sql = "SELECT aluRM,aluNome,DATE_FORMAT(aluEntrada,'%m/%d/%Y %H:%i:%s') AS entrada,DATE_FORMAT(aluSaida,'%m/%d/%Y %H:%i:%s') AS saida,curNome FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID WHERE aluEntrada IS NOT NULL AND aluExcluido = '0' AND aluNome LIKE '%$nome%' ORDER BY aluNome ASC LIMIT 0,30";
            if(!Database::execute($sql)){
                return false;
                exit(0);
            } 
            $resultado = Database::fetchAll();
            if(count($resultado[0]) > 0){
                $json = json_encode($resultado);
                return $json;
            }
            else{
                return "blank";
            }
        }
        else{
            $sql = "SELECT aluRM,aluNome,DATE_FORMAT(aluEntrada,'%m/%d/%Y %H:%i:%s') AS entrada,DATE_FORMAT(aluSaida,'%m/%d/%Y %H:%i:%s') AS saida,curNome FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID WHERE aluEntrada IS NOT NULL AND aluExcluido = '0'";
            if($BuscaAtivo != '0'){
                $sql .= " AND curID = '$BuscaAtivo',";
            }
            $query = substr($sql,0, $size-1);
            $query .= " ORDER BY aluNome ASC";
            if(!Database::execute($query)){
                return false;
                exit(0);
            }
            $resultado = Database::fetchAll();
            if(count($resultado[0]) > 0){
                $json = json_encode($resultado);
                return $json;
            }
            else{
                return "blank";
            }
        }
    }
    public function buscaAlunosNoFiltroAtivo(){
        $sql = "SELECT aluRM,aluNome,DATE_FORMAT(aluEntrada,'%m/%d/%Y %H:%i:%s') AS entrada,DATE_FORMAT(aluSaida,'%m/%d/%Y %H:%i:%s') AS saida,curNome FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID WHERE aluEntrada IS NOT NULL AND aluExcluido = '0' ORDER BY aluNome ASC LIMIT 0,30";
        if(!Database::execute($sql)){
			return false;
			exit(0);
        }
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            $json = json_encode($resultado);
            return $json;
        }else{
           return "blank";
        }
    }
    public function deletarAluno($id){
        $sql = "UPDATE alunos SET aluExcluido = '1' WHERE aluID = '$id'";
        if(!Database::execute($sql)){
			return false;
			exit(0);
        }
        return true;
    }
    public function buscaAlunosAtivos(){
        $sql = "SELECT aluRM,aluNome,DATE_FORMAT(aluEntrada,'%m/%d/%Y %H:%i:%s') AS entrada,DATE_FORMAT(aluSaida,'%m/%d/%Y %H:%i:%s') AS saida,curNome FROM `alunos` INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID WHERE aluEntrada IS NOT NULL AND aluBloqueio = '0' ORDER BY aluNome ASC LIMIT 0,30";
        if(!Database::execute($sql)){
			return false;
			exit(0);
        }
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            foreach ($resultado as $linha) {
                $this->templateLoader->assign ( "alunoATVRM" , $linha['aluRM']);
                $this->templateLoader->assign ( "alunoATVNome" , $linha['aluNome']);
                $this->templateLoader->assign ( "alunoATVEntrada" , $linha['entrada']);
                $this->templateLoader->assign ( "alunoATVSaida" , $linha['saida']);
                $this->templateLoader->assign ( "alunoATVCurso" , $linha['curNome']);
                $this->templateLoader->parse ( "cursos.mostrarAlunosAtivos" );
            }
        }
        else{
            $this->templateLoader->assign ( "alunoATVErro" , "NENHUM REGISTRO ENCONTRADO!");
        }
    }
    public function carregaCursosEditar(){
        $sql= "SELECT DISTINCT curNome, curID FROM cursos_modulos INNER JOIN cursos ON curID = cursos_curID";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            $json = json_encode($resultado);
            return $json;
        }
        else{
            return false;
        }
    }
    public function carregaModuloEditar($id){
        $sql = "SELECT DISTINCT modDesc, modID FROM cursos_modulos INNER JOIN modulo ON modID = modulo_modID WHERE cursos_curID = '$id'";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            $json = json_encode($resultado);
            return $json;
        }
        else{
            return false;
        }
    }
    public function carregaPeriodoEditar($id){
        $sql = "SELECT DISTINCT perDesc,perID FROM cursos_modulos INNER JOIN periodo ON perID = periodo_perID INNER JOIN cursos ON curID = cursos_curID WHERE cursos_curID = '$id'";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            $json = json_encode($resultado);
            return $json;
        }
        else{
            return false;
        }
    }
}
new Cursos();