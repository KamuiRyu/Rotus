<?php
require_once __DIR__ . '/../lib/database.php';
header('Access-Control-Allow-Origin: *'); 
class cadastroAluno{
    public function __construct() {
        if (!Database::conect()) {
            echo "ERRO!";
        }
        if(isset($_POST["txtRM"]) && isset($_POST["txtCPF"]) && $_POST["basic"] == "cm90dXNzZWN1cml0eTp0Y2MxMjM1"){
            $rm = filter_var(preg_replace("([^0-9])","",$_POST["txtRM"]));
            $cpf = filter_var(preg_replace("(([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2}))","$1.$2.$3-$4",$_POST["txtCPF"]));
            echo $this->verificaCadastro($rm,$cpf);
            Database::close();
        }
        if(isset($_POST["txtRM"]) && isset($_POST["txtEmail"]) && isset($_POST["txtSenha"]) && $_POST["basic"] == "cm90dXNzZWN1cml0eTp0Y2MxMjM1"){
            $rm = filter_var(preg_replace("([^0-9])","",$_POST["txtRM"]));
            $email = filter_var($_POST["txtEmail"],FILTER_VALIDATE_EMAIL);
            $senha = filter_var($_POST["txtSenha"],FILTER_SANITIZE_STRING);
            $qrcode = $this->geraSenha(20);
            echo $this->cadastrarAluno($rm,$email,$senha,$qrcode);
            Database::close();
        }
        if(isset($_POST["Email"]) && $_POST["basic"] == "cm90dXNzZWN1cml0eTp0Y2MxMjM1"){
            $email = filter_var($_POST["Email"],FILTER_VALIDATE_EMAIL);
            echo $this->verificaEmail($email);
            Database::close();
        }
        if(isset($_FILES["file"])){
            if($_GET["basic"] == "cm90dXNzZWN1cml0eTp0Y2MxMjM1"){
                $id = filter_var(preg_replace("([^0-9])","",$_GET["txtID"]));
                $foto = urldecode($_FILES["file"]["name"]).".jpg";
                echo $this->uploadFoto($foto,$id);
                Database::close();
            }
        }
    }
    public function verificaCadastro($rm,$cpf){
        $sql = "SELECT aluID,aluNome,aluDTNasc,aluSexo,curNome,aluEmail,aluExcluido FROM alunos INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID WHERE aluRM = '$rm' AND aluCPF = '$cpf'";
        if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado) > 0){
            if($resultado[0]["aluEmail"] != ""){
                return "existe";
                exit(0);
            }else if($resultado[0]["aluExcluido"] == "1"){
                return "excluido";
                exit(0);
            }
            $nome = $resultado[0]['aluNome'];
            $dtnasc = implode("/",array_reverse(explode("-",$resultado[0]["aluDTNasc"])));
            if($resultado[0]["aluSexo"] == 0){
                $sexo = "Masculino";
            }
            else{
                $sexo = "Feminino";
            }
            $curso = $resultado[0]["curNome"];
            $id = $resultado[0]["aluID"];
            return '{"id":"'.$id.'","nome":"'.$nome.'","dtnasc":"'.$dtnasc.'","sexo":"'.$sexo.'","curso":"'.$curso.'"}';
            exit(0);
        }
        else{
            return false;
        }
    }
    public function cadastrarAluno($rm,$email,$senha,$qrcode){
        $novasenha = sha1($senha);
        $novasenha = md5($novasenha);
        $sql = "SELECT aluID FROM alunos WHERE aluRM = '$rm'";
        if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado) > 0){
            $id = $resultado[0]["aluID"];
            $update = "UPDATE alunos SET aluEmail = '$email', aluSenha = '$novasenha',aluCode = '$qrcode' WHERE aluID = '$id'";
            if(!Database::execute($update)){
                return false;
                exit(0);
            }
            return "sucess";
            exit(0);
        }
        return false;
    }
    public function verificaEmail($email){
        $sql = "SELECT * FROM alunos WHERE aluEmail = '$email'";
        if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado) > 0){
            return 0;
            exit(0);
        }
        return true;
    }
    public function uploadFoto($foto,$id){
        if(move_uploaded_file($_FILES["file"]["tmp_name"], "../profiles/alunos/".$foto)){
            $sql = "UPDATE alunos SET aluFoto='"."/profiles/alunos/".$foto."' WHERE aluID='$id'";
            if(!Database::execute($sql)){
                return false;
                exit(0);
		    }
            return "sucess";
        }else{
            return "fail";
        }
    }
    function geraSenha($tamanho = 8, $maiusculas = true, $numeros = true, $simbolos = false){
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
		return $retorno;
	}
}
new cadastroAluno();

