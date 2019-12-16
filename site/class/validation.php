<?php
require_once __DIR__ . '/../lib/database.php';

class Validation{
    public function __construct(){
        session_start();
        if (!Database::conect()) {
            echo "ERRO!";
        }
           if(isset($_POST["email"]) && isset($_POST["req"]) == "dados"){
            echo $this->retornaDados($_POST['email']);
            return;
            exit(0);
        }
        if(isset($_POST["email"]) && isset($_POST["senha"])){
            echo $this->verificaSenha($_POST["email"],$_POST["senha"]);
            exit(0);
        }
        if(isset($_POST["email"]) && isset($_POST["req"]) == "vefemail"){
            return $this->verificaSeExisteEmail($_POST['email']);
            return;
            exit(0);
        }

        Database::close();
    }
    public static function verificaSeExisteEmail($email){
        $sql = "SELECT 0 FROM usuarios WHERE usuEmail = '$email'";
        if(!Database::execute($sql)){
            return false;
            exit(0);
        }
        $result = Database::fetch();
        if (count($result) > 0){
            return true;
            exit(0);
        }
        return false;
    }
    public static function retornaDados($email){
        $sql = "SELECT usuNome, usuFoto FROM usuarios WHERE usuEmail = '$email'";
        if(!Database::execute($sql)){
            return false;
            exit(0);
        }
        $result = Database::fetchAll();
        if (count($result) > 0){
            $array = array_shift($result);
            return '{"nome":"'.$array[0].'","foto":"'.$array[1].'","email":"'.$email.'"}';
            exit(0);
        }
        return false;
    }
    public static function verificaSenha($email,$senha){
        $sql = "SELECT usuSenha FROM usuarios WHERE usuEmail = '$email'";
        Database::execute($sql);
        $result = Database::fetch();
        $senha = sha1($senha);
        $senha = md5($senha);
        if($senha != $result["usuSenha"]){
            return false;
            exit(0);
        }
        return true;
    }
	public static function Logado(){
		if (isset($_SESSION ["id"])){
			return true;
		}
		return false;
	}
}
new Validation();