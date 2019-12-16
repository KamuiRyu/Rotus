<?php
require_once __DIR__ . '/../lib/TemplateLoader.php';
require_once __DIR__ . '/../lib/database.php';
require_once __DIR__ . '/../class/navbar.php';
require_once __DIR__ . '/../class/validation.php';

class AlterarSenha{
    private $templateLoader;
    public function __construct(){
       	if (!Database::conect()) {
            echo "ERRO!";
        }
        session_start();

        $this->templateLoader = new TemplateLoader ( __DIR__ . "/../template/alterar_senha.html" );

        if(!Validation::Logado()){
            Database::close();
            header('Location: ../index.php');
            return;
        }

        if(isset($_POST["txtSenhaAtual"]) && isset($_POST["txtNovaSenha"]) && isset($_POST["txtConfNovaSenha"])){
            $senhaatual = filter_var($_POST["txtSenhaAtual"],FILTER_SANITIZE_STRING);
            $novasenha =  filter_var($_POST["txtNovaSenha"],FILTER_SANITIZE_STRING);
            $confnovasenha = filter_var($_POST["txtConfNovaSenha"],FILTER_SANITIZE_STRING);
            echo $this->AlterarSenha($senhaatual,$novasenha,$confnovasenha);
       }
       else{
            $navbar = NavBar::AutenticarUsuario();

            $this->templateLoader->assign ( "navbar" , $navbar);

            $foto = $this->InfoConta("foto");

            $this->templateLoader->assign ( "foto" , $foto);

            Database::close();

            $this->templateLoader->parse ( "alterar_senha" );

            $this->templateLoader->out ( "alterar_senha" );
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
        }
    }
    private function AlterarSenha($senhaatual,$novasenha,$confnovasenha){
        if($novasenha != $confnovasenha){
            return false;
        }
        $id = $_SESSION["id"];
        $senha = sha1(filter_var($senhaatual,FILTER_SANITIZE_STRING));
        $msenha = md5($senha);
        $newpass = sha1($novasenha);
        $newpass = md5($newpass);
        $sql = "SELECT usuSenha FROM usuarios WHERE usuID = $id";
		if(!Database::execute($sql)){
			return false;
		}    
        $resultado = Database::fetch();
        if($senha == ""){
            return false;
        }
        if($resultado["usuSenha"] != $msenha){
            return "incorreta";
        }
        if($novasenha != $confnovasenha){
            return false;
        }
        if($resultado["usuSenha"] == $newpass){
            return "antiga";
        }
        $query = "UPDATE usuarios SET usuSenha = '$newpass' WHERE usuID = $id";
		if(!Database::execute($query)){
			return false;
		}
        return true;
    }
}
new AlterarSenha ();