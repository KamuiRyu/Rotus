<?php
require_once __DIR__ . '/../lib/database.php';
header('Access-Control-Allow-Origin: *'); 
class Qrcode {
	private $templateLoader;
	public function __construct() {	
       	if (!Database::conect()) {
            echo "ERRO!";
        }
        if(isset($_POST["txtCode"]) && $_POST["basic"] == "cm90dXNzZWN1cml0eTp0Y2MxMjM1"){
            $code = filter_var($_POST["txtCode"],FILTER_SANITIZE_STRING);
            echo $this->verificaCode($code);
            Database::close();            
        }
    }
	public function verificaCode($code){
		$sql = "SELECT aluID,aluRM,aluNome,aluFoto,aluEntrada,aluSaida,curNome,modDesc,perDesc,aluExcluido,aluBloqueio FROM `alunos` INNER JOIN cursos_modulos ON aluCurso=idcurso_modulo INNER JOIN cursos ON curID=cursos_curID INNER JOIN modulo ON modID = modulo_modID INNER JOIN periodo ON perID = periodo_perID WHERE aluCode = '$code' AND aluBloqueio = '0'";
	    if(!Database::execute($sql)){
			return false;
			exit(0);
    	}
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            date_default_timezone_set('America/Sao_Paulo');
            //$hora = strtotime(date($resultado[0]["aluEntrada"]));
            $horaAtual = strtotime(date('Y-m-d H:i:s'));
            $chunks = explode(" ", $resultado[0]["aluEntrada"]);
            $timestamp = strtotime($chunks[1]) + 60*30;
            $dataHora = strftime('%H:%M:%S', $timestamp); // 24 - 12 - 2016, 11:15
            $intervalo = strtotime($chunks[0]." ".$dataHora);
            $hora = date('H:i:s');
            $condicao = "";
            if($resultado[0]["aluEntrada"] == null ){
                $query = "UPDATE alunos SET aluEntrada='".date('Y-m-d H:i:s')."' WHERE aluID='".$resultado[0]["aluID"]."'";
                if(!Database::execute($query)){
                    return false;
                    exit(0);
                }
                $condicao = "liberado";
            }else if($resultado[0]["aluBloqueio"] == "1"){
                $condicao = "bloquear";
            }
            else if($resultado[0]["aluExcluido"] == "1"){
                $condicao = "bloquear";
            }
            else if($horaAtual < $intervalo){
                $condicao = "bloquear";
            }else if($hora > "00:00:00" && $hora < "05:00:00"){
                $condicao = "bloquear";
            }
            else if($resultado[0]["aluEntrada"] != null && $resultado[0]["aluSaida"] == "0000-00-00 00:00:00"){
                $query = "UPDATE alunos SET aluSaida='".date('Y-m-d H:i:s')."' WHERE aluID='".$resultado[0]["aluID"]."'";
                if(!Database::execute($query)){
                    return false;
                    exit(0);
                }
                $condicao = "liberado";
            }else if($resultado[0]["aluEntrada"] != null && $resultado[0]["aluSaida"] != "0000-00-00 00:00:00"){
                $condicao = "bloquear";
            }
            $array = array_merge((array)$condicao,(array)$resultado);
            $json = json_encode($array);
            return $json;
        }else{
            return false;
        }
	}
}
new Qrcode ();