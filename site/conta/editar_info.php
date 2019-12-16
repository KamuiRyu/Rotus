<?php
require_once __DIR__ . '/../lib/TemplateLoader.php';
require_once __DIR__ . '/../lib/database.php';
require_once __DIR__ . '/../class/navbar.php';
require_once __DIR__ . '/../class/validation.php';

class EditarInfo {
	private $templateLoader;
	public function __construct() {	
       	if (!Database::conect()) {
            echo "ERRO!";
        }
		session_start();

		$this->templateLoader = new TemplateLoader ( __DIR__ . "/../template/editar_info.html" );

		if(!Validation::Logado()){
            header('Location: ../index.php');
            Database::close();
            return;
        }

		if(isset($_POST["txtNome"]) && isset($_POST["txtCEP"]) && isset($_POST["txtTelefone"]) && isset($_POST["txtSexo"]) && isset($_POST["txtConfSenha"])){
			$nome = filter_var($_POST["txtNome"],FILTER_SANITIZE_STRING);
			$cep = filter_var($_POST["txtCEP"],FILTER_SANITIZE_STRING);
			$telefone = filter_var($_POST["txtTelefone"],FILTER_SANITIZE_STRING);
			$sexo = filter_var($_POST["txtSexo"],FILTER_VALIDATE_INT);
			$senha = filter_var($_POST["txtConfSenha"],FILTER_SANITIZE_STRING);
			echo $this->EditarInfo($nome,$cep,$telefone,$sexo,$senha);
			Database::close();
		}
		else{
			$navbar = NavBar::AutenticarUsuario();

			$foto = $this->InfoConta("foto");

			$nome = $this->InfoConta("nome");

			$email = $this->InfoConta("email");

			$acesso = $this->InfoConta("acesso");

			$cep = $this->InfoConta("cep");

			$dtnasc = $this->InfoConta("dtnasc");

			$telefone = $this->InfoConta("telefone");

			$sexo = $this->InfoConta("sexo");
			
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

			$this->templateLoader->parse ( "editar_info" );
			
			$this->templateLoader->out ( "editar_info" );
		}
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
	private function EditarInfo($nome,$CEP,$telefone,$sexo,$senha){
		$id = $_SESSION["id"];
		$senha = sha1 (filter_var($senha,FILTER_SANITIZE_STRING));
		$msenha = md5($senha);
		$sql = "SELECT usuNome,usuCEP,usuTelefone,usuSexo,usuSenha FROM usuarios WHERE usuID = $id";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
		$resultado = Database::fetch();
		if($senha == ""){
			return false;
			exit(0);
		}
		if($resultado["usuSenha"] == $msenha){
			$query = "UPDATE usuarios SET ";
			if($resultado["usuNome"] == $nome && $resultado["usuCEP"] == $CEP && $resultado["usuTelefone"] == $telefone && $resultado["usuSexo"] == $sexo && $resultado["usuSenha"] == $msenha){
				return true;
				exit(0);
			}
			if($resultado["usuNome"] != $nome && $nome != ""){
				$query .= "usuNome = '$nome'" ;	
			}
			if($resultado["usuNome"] == $nome){
				$querynome = $resultado['usuNome'];
				$query .= "usuNome = '$querynome'" ;	
			}
			if($resultado["usuCEP"] != $CEP && $CEP != ""){
				$query .= ",usuCEP = '$CEP'";	
			}
			if($resultado["usuTelefone"] != $telefone && $telefone != ""){
				$query .= ",usuTelefone = '$telefone'";
			}
			if($resultado["usuSexo"] != $sexo && $sexo != ""){
				$query .= ",usuSexo = '$sexo'";
			}
			$query .= " WHERE usuID = '$id'";
			if(!Database::execute($query)){
				return false;
				exit(0);
			}
			return true;
			exit(0);
		}
		return "Senha incorreta!";
	}
}
new EditarInfo ();