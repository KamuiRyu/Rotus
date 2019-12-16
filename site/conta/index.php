<?php
require_once __DIR__ . '/../lib/TemplateLoader.php';
require_once __DIR__ . '/../lib/database.php';
require_once __DIR__ . '/../class/navbar.php';
require_once __DIR__ . '/../class/validation.php';

class IndexConta {
	private $templateLoader;
	public function __construct() {	
       	if (!Database::conect()) {
            echo "ERRO!";
        }
		session_start();

		$this->templateLoader = new TemplateLoader ( __DIR__ . "/../template/conta.html" );

		if(!Validation::Logado()){
            header('Location: ../index.php');
            Database::close();
            return;
        }

		$navbar = NavBar::AutenticarUsuario();

		$foto = $this->InfoConta("foto");

		$nome = $this->InfoConta("nome");

		$email = $this->InfoConta("email");

        $acesso = $this->InfoConta("acesso");

        $cep = $this->InfoConta("cep");

        $dtnasc = $this->InfoConta("dtnasc");

        $telefone = $this->InfoConta("telefone");

        if($this->InfoConta("sexo") == 0){
			$sexo = "Masculino";
		}
		else{
			$sexo = "Feminino";
		}
		
		$this->templateLoader->assign ( "foto" , $foto);

		$this->templateLoader->assign ( "nome" , $nome);

		$this->templateLoader->assign ( "email" , $email);

        $this->templateLoader->assign ( "acesso" , $acesso);

        $this->templateLoader->assign ( "cep" , $cep);

        $this->templateLoader->assign ( "dtnasc" , $dtnasc);

        $this->templateLoader->assign ( "telefone" , $telefone);

        $this->templateLoader->assign ( "sexo" , $sexo);

		$this->templateLoader->assign ( "navbar" , $navbar);

		Database::close();

		$this->templateLoader->parse ( "conta" );
		
		$this->templateLoader->out ( "conta" );
	}
	private function InfoConta($request){
		if(isset($_SESSION["id"])){
			$id = $_SESSION["id"];
			if($request == "foto"){
				$sql = "SELECT usuFoto FROM usuarios WHERE usuID = $id";
				if(!Database::execute($sql)){
					return false;
					exit(0);
				}
				$resultado = Database::fetch();
				return "../".$resultado["usuFoto"];
			}
			if($request == "nome"){
				$sql = "SELECT usuNome FROM usuarios WHERE usuID = $id";
				if(!Database::execute($sql)){
					return false;
					exit(0);
				}
				$resultado = Database::fetch();
				return $resultado["usuNome"];
			}
			if($request == "email"){
				$sql = "SELECT usuEmail FROM usuarios WHERE usuID = $id";
				if(!Database::execute($sql)){
					return false;
					exit(0);
				}
				$resultado = Database::fetch();
				return $resultado["usuEmail"];
			}
			if($request == "acesso"){
				$sql = "SELECT usuAcesso FROM usuarios WHERE usuID = $id";
				if(!Database::execute($sql)){
					return false;
					exit(0);
				}
				$resultado = Database::fetch();
				if($resultado["usuAcesso"] == 1){
                    return "Administrador";
                }
			}
			if($request == "cep"){
				$sql = "SELECT usuCEP FROM usuarios WHERE usuID = $id";
				if(!Database::execute($sql)){
					return false;
					exit(0);
				}
				$resultado = Database::fetch();
				return $resultado["usuCEP"];
			}
			if($request == "dtnasc"){
				$sql = "SELECT usuDTNasc FROM usuarios WHERE usuID = $id";
				if(!Database::execute($sql)){
					return false;
					exit(0);
				}
				$resultado = Database::fetch();
				return date('d/m/Y',  strtotime($resultado["usuDTNasc"]));
			}
			if($request == "telefone"){
				$sql = "SELECT usuTelefone FROM usuarios WHERE usuID = $id";
				if(!Database::execute($sql)){
					return false;
					exit(0);
				}
				$resultado = Database::fetch();
				return $resultado["usuTelefone"];
			}
			if($request == "sexo"){
				$sql = "SELECT usuSexo FROM usuarios WHERE usuID = $id";
				if(!Database::execute($sql)){
					return false;
					exit(0);
				}
				$resultado = Database::fetch();
				return $resultado["usuSexo"];
			}
		}
	}
}
new IndexConta ();