<?php
require_once __DIR__ . '/../lib/database.php';
header('Access-Control-Allow-Origin: *'); 
class gerarQr{
    public function __construct() {
        if (!Database::conect()) {
            echo "ERRO!";
        }
        if($_GET["basic"] == "cm90dXNzZWN1cml0eTp0Y2MxMjM1"){
            $this->verificar();
            $this->geraCode();
        }
    }
    public function verificar(){
        $sql = "SELECT aluRM,aluNome,aluEntrada,aluSaida,curNome,aluEmail FROM alunos INNER JOIN cursos_modulos ON aluCurso = idcurso_modulo INNER JOIN cursos ON curID = cursos_curID WHERE aluBloqueio = '0' AND aluExcluido='0'";
        if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        $mostra = "RM | NOME | ENTRADA | SAIDA | CURSO"."\r\n";
        if(count($resultado[0]) > 0){
            foreach ($resultado as $linha) {
                if($linha["aluEmail"] != null){
                    if($linha["aluEntrada"] == null){
                        $entrada = "0000-00-00 00:00:00";
                    }else{
                        $entrada = $linha["aluEntrada"];
                    }
                    $mostra .= $linha["aluRM"].";".$linha["aluNome"].";".$entrada.";".$linha["aluSaida"].";".$linha["curNome"]."\r\n";
                }
             }
            $fp = fopen("../registros/".date('d-m-Y').".txt", "a");
            $escreve = fwrite($fp, $mostra);
            fclose($fp);
        }
    }
    public function geraCode(){
        $sql = "SELECT aluID,aluEmail FROM alunos WHERE aluBloqueio = '0' AND aluExcluido = '0'";
        if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            foreach ($resultado as $linha) {
                if($linha["aluEmail"] != null){
                    $tamanho = 20;
                    $maiusculas = true;
                    $numeros = true;
                    $simbolos = false;
                    $lmin = 'abcdefghijklmnopqrstuvwxyz';
                    $lmai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    $num = '1234567890';
                    $simb = '!@#$%*-';
                    $retorno = '';
                    $caracteres = '';
                    $caracteres .= $lmin;
                    if ($maiusculas) $caracteres .= $lmai;
                    if ($numeros) $caracteres .= $num;
                    if ($simbolos) $caracteres .= $simb;
                    $len = strlen($caracteres);
                    $nCont = 0;
                    while($nCont < 1){
                        for ($n = 1; $n <= $tamanho; $n++) {
                            $rand = mt_rand(1, $len);
                            $retorno .= $caracteres[$rand-1];
                        }
                        $sql = "SELECT * FROM alunos WHERE aluCode = '$retorno'";
                        if(!Database::execute($sql)){
                            return false;
                            exit(0);
                        }
                        $resultado = Database::fetchAll();
                        if($resultado[0] > 0){
                            $nCont--;
                        }else{
                            $nCont++;
                        }
                    }
                    $query = "UPDATE alunos SET aluCode='$retorno',aluEntrada = NULL,aluSaida = '0000-00-00 00:00:00' WHERE aluID='".$linha["aluID"]."'";
                    if(!Database::execute($query)){
                        return false;
                        exit(0);
                    }
                }
            }
        }
    }
}
new gerarQr();