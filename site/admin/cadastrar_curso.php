<?php
require_once __DIR__ . '/../lib/TemplateLoader.php';
require_once __DIR__ . '/../lib/database.php';
require_once __DIR__ . '/../class/navbar.php';
require_once __DIR__ . '/../class/validation.php';
class cadastrarCurso{
    public function __construct() {
        if (!Database::conect()) {
            echo "ERRO!";
        }
        session_start();

        $this->templateLoader = new TemplateLoader ( "../template/cadastrar_curso.html" );

        if(!Validation::Logado()){
            Database::close();
            header('Location: ../index.php');
            return;
        }
        if(isset($_POST["submit"])){
            $curso = filter_var($_POST["txtNome"],FILTER_SANITIZE_STRING);
            $modulos = filter_var($_POST["txtModulo"],FILTER_SANITIZE_NUMBER_INT);
            $periodo = filter_var($_POST["txtPeriodo"],FILTER_SANITIZE_NUMBER_INT);
            if($this->cadastraCurso($curso,$modulos,$periodo) == true){
                $alerta = '<div id="alert_box" class="card green">
                    <div class="card-content white-text">
                    <p><i class="material-icons" style="position: relative;top: 5px;">check</i> 
                    CADASTRO FEITO COM SUCESSO!</p>
                    </div> 
                    <i class="material-icons" style="position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;" id="alert_close" onclick="closeAlert()">close</i>
                    </div>';
            }else{
                $alerta = '<div id="alert_box" class="card red">
                <div class="card-content white-text">
                <p><i class="material-icons" style="position: relative;top: 5px;">errork</i> 
                ERRO AO CADASTRAR, VERIFIQUE AS INFORMAÇÕES E TENTE NOVAMENTE!<br></p>
                </div> 
                <i class="material-icons" style="position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;" id="alert_close" onclick="closeAlert()">close</i></div>';
            }
            $this->templateLoader->assign ( "alerta" , $alerta);
        }
        $navbar = NavBar::AutenticarUsuario();

        $this->carregaPeriodos();

        $this->carregaModulos();

        $this->carregaCursos();

        $this->templateLoader->assign ( "navbar" , $navbar);

        Database::close();

        $this->templateLoader->parse ( "cadastrar_curso.alerta" );

        $this->templateLoader->parse ( "cadastrar_curso" );

        $this->templateLoader->out ( "cadastrar_curso" );
    }
    public function carregaCursos(){
        $sql= "SELECT * FROM cursos";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        foreach($resultado as $linha){
            $this->templateLoader->assign ( "curNome" , $linha['curNome']);
            $this->templateLoader->parse ( "cadastrar_curso.cursos" );
        }
    }
    public function carregaModulos(){
        $sql = "SELECT * FROM modulo";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        foreach($resultado as $linha){
            $this->templateLoader->assign ( "modID" , $linha['modID']);
            $this->templateLoader->assign ( "modDesc" , $linha['modDesc']);
            $this->templateLoader->parse ( "cadastrar_curso.modulos" );
        }
    }
    public function carregaPeriodos(){
        $query = "SELECT * FROM periodo";
		if(!Database::execute($query)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        foreach($resultado as $linha){
            $this->templateLoader->assign ( "perID" , $linha['perID']);
            $this->templateLoader->assign ( "perDesc" , $linha['perDesc']);
            $this->templateLoader->parse ( "cadastrar_curso.periodos" );
        }
    }
    public function cadastraCurso($curso,$modulos,$periodo){
        $sql = "INSERT INTO cursos(curNome) VALUES('$curso')";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $select = "SELECT * FROM cursos WHERE curNome LIKE '%$curso%'";
		if(!Database::execute($select)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        $curso = $resultado[0]['curID'];
        $nCont = 1;
        while($nCont <= $modulos){
            $query = "INSERT INTO cursos_modulos(cursos_curID,modulo_modID,periodo_perID) VALUES('$curso','$nCont','$periodo')";
        	if(!Database::execute($query)){
			    return false;
			    exit(0);
		    }
            $nCont++; 
        }
        return true;
    }
}
new cadastrarCurso();