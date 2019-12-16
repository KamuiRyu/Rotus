<?php
require_once __DIR__ . '/../lib/TemplateLoader.php';
require_once __DIR__ . '/../lib/database.php';
class Login {
	private $templateLoader;
	public function __construct() {	
		session_start();
        if (!Database::conect()) {
            echo "ERRO!";
        }
		$this->templateLoader = new TemplateLoader ("../template/login.html" );

		if($this->Entrando()){
			if($this->Autenticar()){
				header('Location: ../index.php');
				Database::close();
				return;
			}
		}
		if($this->Logado()){
			header('Location: ../index.php');
			Database::close();
			return;
		}
	
		Database::close();

		$this->templateLoader->parse ( "login" );

		$this->templateLoader->out ( "login" );

	}
	private function Autenticar(){
		$senha = sha1(filter_var($_POST["txtSenha"],FILTER_SANITIZE_STRING));
		$senha = md5($senha);
		$sql = "SELECT usuID FROM usuarios WHERE usuEmail = '" . $_POST ["txtEmail"] . "' AND usuSenha = '" . $senha . "'";
		if (!Database::execute($sql)){
			return false;
			exit(0);
		}
		$resultado = Database::fetchAll();
		
		if (count($resultado) > 0) {
			$_SESSION ["id"] = $resultado[0]["usuID"];
			return true;
			exit(0);
		}
		return false;
	}
	private function Entrando() {
		if (isset($_POST["txtEmail"]) && isset($_POST["txtSenha"])){
			return true;
			exit(0);
		}
		return false;
	}
	private function Logado() {
		if (isset($_SESSION ["id"])){
			return true;
		}
		return false;
	}
}
new Login ();