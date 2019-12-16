<?php
require_once __DIR__ . '/../lib/TemplateLoader.php';
require_once __DIR__ . '/../lib/database.php';
require_once __DIR__ . '/../class/navbar.php';
require_once __DIR__ . '/../class/validation.php';
class cadastrarADM{
    public function __construct() {
        if (!Database::conect()) {
            echo "ERRO!";
        }
        session_start();

        $this->templateLoader = new TemplateLoader ( "../template/cadastrar_admin.html" );

        if(!Validation::Logado()){
            Database::close();
            header('Location: ../index.php');
            return;
        }
        if(isset($_POST["submit"])){
            $nome = filter_var($_POST["txtNome"],FILTER_SANITIZE_STRING);
            $senha = filter_var($_POST["txtSenha"],FILTER_SANITIZE_STRING);
            $sexo = filter_var($_POST["txtSexo"],FILTER_SANITIZE_NUMBER_INT);
            $data = filter_var(preg_replace("([^0-9/])","",$_POST["txtDTNasc"]));
            $dtnasc = implode("-",array_reverse(explode("/",$data)));
            $email = filter_var($_POST["txtEmail"],FILTER_VALIDATE_EMAIL);
            $foto = $_FILES["txtFoto"];
            if($this->cadastrarADM($nome,$sexo,$dtnasc,$email,$foto,$senha) == true){
                $alerta = '<div id="alert_box" class="card green">
                            <div class="card-content white-text">
                            <p><i class="material-icons" style="position: relative;top: 5px;">check</i> 
                            CADASTRO FEITO COM SUCESSO!</p>
                            </div> 
                            <i class="material-icons" style="position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;" id="alert_close" onclick="closeAlert()">close</i>
                        </div>';
                }else{
                    $alerta = '<div id="alert_box" class="card red">
                            <div class="card-content white-text">
                           <p><i class="material-icons" style="position: relative;top: 5px;">errork</i> 
                            ERRO AO CADASTRAR, VERIFIQUE AS INFORMAÇÕES E TENTE NOVAMENTE!<br></p>
                            </div> 
                             <i class="material-icons" style="position: absolute;right: 10px;top: 10px;font-size: 20px;color: white;cursor: pointer;" id="alert_close" onclick="closeAlert()">>close</i></div>';
                }
            $this->templateLoader->assign ( "alerta" , $alerta);
        }
        if(isset($_POST["txtRequestEmail"])){
            $email = filter_var($_POST["txtEmail"],FILTER_VALIDATE_EMAIL);
            echo $this->existeEmail($email);
            Database::close();
        }else{
            $navbar = NavBar::AutenticarUsuario();

            $this->templateLoader->assign ( "navbar" , $navbar);

            Database::close();
            $this->templateLoader->parse ( "cadastrar_admin.alerta" );
            $this->templateLoader->parse ( "cadastrar_admin" );

            $this->templateLoader->out ( "cadastrar_admin" );
        }
    }
    public function existeEmail($email){
        $sql = "SELECT * FROM usuarios WHERE usuEmail = '$email'";
        if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado[0])){
            return false;
        }else{
            return true;
        }
    }
    public function cadastrarADM($nome,$sexo,$dtnasc,$email,$foto,$senha){
        $sql = "LOCK TABLES alunos WRITE";
        if(!Database::execute($sql)){
			return false;
			exit(0);
		}
        $password = sha1($senha);
        $password = md5($password);
        $query = "INSERT INTO usuarios(usuNome,usuEmail,usuSenha,usuDTNasc,usuSexo,usuAcesso) VALUES ('$nome','$email','$password','$dtnasc','$sexo','1')";
        if(!Database::execute($query)){
			return "INSERIR";
			exit(0);
		}
        $select = "SELECT MAX(usuID) AS ID FROM usuarios";
        if(!Database::execute($select)){
			return "SELECIONAR";
			exit(0);
		}
        $resultado = Database::fetchAll();
        if(count($resultado) > 0){
            $id = $resultado[0]["ID"];
        }else{
            return "SEM ID";
            exit(0);
        }
        $dir_upload  = "../profiles/admin/";
        $arquivo  = $dir_upload  . basename($foto["name"]);
        $tipo_arquivo  = pathinfo($arquivo ,PATHINFO_EXTENSION);
        $novo_arquivo = $dir_upload . $id . '.' . $tipo_arquivo;
        if ($foto["size"] > 1000000) {
            return "TAMANHO";
            exit(0);
        }
        if($tipo_arquivo  != "jpg" && $tipo_arquivo  != "png" && $tipo_arquivo  != "jpeg" && $tipo_arquivo  != "gif" ) {
            return "EXTENSÃO";
            exit(0);
        }
        if (move_uploaded_file($foto["tmp_name"], $novo_arquivo)) {
            $diretorio = "/profiles/admin/".$id.'.'.$tipo_arquivo;
            $update = "UPDATE usuarios SET usuFoto = '$diretorio' WHERE usuID = '$id'";
            if (!Database::execute($update)){
                return "ATUALIZAR";
                exit(0);
            }
            return true;
        } else {
            return "ERRO UPLOAD";
            exit(0);
        }
        $sql = "UNLOCK TABLES";
        if(!Database::execute($sql)){
			return 0;
			exit(0);
		}
    }
}
new cadastrarADM();