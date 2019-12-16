<?php
require_once __DIR__ . '/../lib/database.php';
header('Access-Control-Allow-Origin: *'); 
class logarAluno{
    public function __construct() {
        if (!Database::conect()) {
            echo "ERRO!";
        }
        if(isset($_POST["txtUser"]) && isset($_POST["txtPass"]) && isset($_POST["txtType"]) && $_POST["basic"] == "cm90dXNzZWN1cml0eTp0Y2MxMjM1"){
            echo $this->logarUsuario($_POST["txtUser"],$_POST["txtPass"],$_POST["txtType"]);
            Database::close();
        }
        else if(isset($_POST["txtCode"]) && $_POST["basic"] == "cm90dXNzZWN1cml0eTp0Y2MxMjM1"){
            $code = filter_var($_POST["txtCode"],FILTER_SANITIZE_STRING);
            $user = $_POST["txtUser"];
            $type = $_POST["txType"];
            echo $this->desbloqueiaUsuario($user,$type,$code);
            Database::close();
        }
    }
    public function logarUsuario($user,$pass,$type){
        $sql = "SELECT aluID,aluEmail,aluCode,aluFoto,aluNome,aluRM,aluRG,aluCPF,aluEstado,curNome,aluDTNasc,aluBloqueio,aluExcluido FROM alunos INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID";
        if($type == "rm"){
            $sql .= " WHERE aluRM = '$user'";
        }
        else{
            $sql .=" WHERE aluEmail = '$user'";
        }
        $senha = sha1($pass);
        $senha = md5($senha);
        $sql .= " AND aluSenha = '$senha'";
        if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            if($resultado[0]["aluExcluido"] == "1"){
                return "excluido";
                exit(0);
            }
            if($resultado[0]["aluBloqueio"] == "1"){
                return "bloqueado";
                exit(0);
            }else{
                $id = $resultado[0]["aluID"];
                $email = $resultado[0]["aluEmail"];
                $code = $resultado[0]["aluCode"];
                $foto = "http://rotussecurity.com.br".$resultado[0]["aluFoto"];
                $nome = $resultado[0]["aluNome"];
                $rm = $resultado[0]["aluRM"];
                $rg = $resultado[0]["aluRG"];
                $cpf = $resultado[0]["aluCPF"];
                $estado = $resultado[0]["aluEstado"];
                $curso = $resultado[0]["curNome"];
                $data = $resultado[0]["aluDTNasc"];
                $dtnasc = implode("/",array_reverse(explode("-",$resultado[0]["aluDTNasc"])));
                $array = array('id'=>$id,'nome'=>$nome, 'email'=>$email, 'cpf'=>$cpf, 'rg'=>$rg, 'curso'=>$curso, 'dtnasc'=>$dtnasc, 'estado'=>$estado, 'rm'=>$rm, 'foto'=>$foto, 'code'=>$code);
                $info = json_encode($array);
                return $info;
            }
        }
    }
    public function desbloqueiaUsuario($user,$type,$code){
        $sql = "SELECT aluID,aluEmail,aluCode,aluFoto,aluNome,aluRM,aluRG,aluCPF,aluEstado,curNome,aluDTNasc,aluBloqueio FROM alunos INNER JOIN cursos_modulos ON idcurso_modulo = aluCurso INNER JOIN cursos ON cursos_curID = curID";
        if($type == "rm"){
            $sql .= " WHERE aluRM = '$user'";
        }
        else{
            $sql .=" WHERE aluEmail = '$user'";
        }
        $sql .="AND aluBLCode = '$code'";
        if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado[0]) > 0){
            $update = "UPDATE alunos SET aluBloqueio = '0'";
            if($type == "rm"){
                $update .= " WHERE aluRM = '$user'";
            }
            else{
                $update .=" WHERE aluEmail = '$user'";
            }
            $update .="AND aluBLCode = '$code'";
            if(!Database::execute($update)){
                return false;
                exit(0);
		    }
            $id = $resultado[0]["aluID"];
            $email = $resultado[0]["aluEmail"];
            $code = $resultado[0]["aluCode"];
            $foto = "http://rotussecurity.com.br".$resultado[0]["aluFoto"];
            $nome = $resultado[0]["aluNome"];
            $rm = $resultado[0]["aluRM"];
            $rg = $resultado[0]["aluRG"];
            $cpf = $resultado[0]["aluCPF"];
            $estado = $resultado[0]["aluEstado"];
            $curso = $resultado[0]["curNome"];
            $data = $resultado[0]["aluDTNasc"];
            $dtnasc = implode("/",array_reverse(explode("-",$resultado[0]["aluDTNasc"])));
            $array = array('id'=>$id,'nome'=>$nome, 'email'=>$email, 'cpf'=>$cpf, 'rg'=>$rg, 'curso'=>$curso, 'dtnasc'=>$dtnasc, 'estado'=>$estado, 'rm'=>$rm, 'foto'=>$foto, 'code'=>$code);
            $info = json_encode($array);
            return $info;
        }    
    }
}
new logarAluno();