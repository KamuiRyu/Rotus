<?php
require_once __DIR__ . '/../lib/database.php';
header('Access-Control-Allow-Origin: *'); 
class Home{
    public function __construct() {
        if (!Database::conect()) {
            echo "ERRO!";
        }
        if(isset($_POST["txtCode"]) && $_POST["basic"] == "cm90dXNzZWN1cml0eTp0Y2MxMjM1"){
            $code = filter_var($_POST["txtCode"],FILTER_SANITIZE_STRING);
            $id = filter_var($_POST["txtID"],FILTER_SANITIZE_STRING);
            echo $this->VerificaCode($code,$id);
            Database::close();
        }
    }
    public function VerificaCode($code,$id){
        $sql = "SELECT aluCode FROM alunos WHERE aluID = '$id'";
        if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            if($resultado[0]["aluCode"] == $code){
                return 0;
                exit(0);
            }else{
                return $resultado[0]["aluCode"];
                exit(0);
            }
        }
    }
}
new Home();