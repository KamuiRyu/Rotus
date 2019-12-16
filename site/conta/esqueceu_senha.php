<?php
require_once __DIR__ . '/../lib/TemplateLoader.php';
require_once __DIR__ . '/../lib/database.php';
require_once __DIR__ . '/../class/validation.php';
require_once __DIR__ . '/../lib/PHPMailer/PHPMailerAutoload.php';


class EsqueceuSenha {
	private $templateLoader;
	public function __construct() {
       	if (!Database::conect()) {
            echo "ERRO!";
        }
		$this->templateLoader = new TemplateLoader ("../template/esqueceu_senha.html");

        if(Validation::Logado()){
            header('Location: ../index.php');
            Database::close();
            return;
        }
		if(isset($_POST["txtEmail"])){
			echo $this->EnviaEmail($_POST["txtEmail"]);
		}else{
			Database::close();

			$this->templateLoader->parse ( "esqueceu_senha" );
			
			$this->templateLoader->out ( "esqueceu_senha" );
		}
	}
	private function EnviaEmail($email){
		$sql = "SELECT usuNome, usuID, usuRecovery FROM usuarios WHERE usuEmail = '$email'";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
		$resultado = Database::fetch();
		if(count($resultado) > 0){
			$cemail = sha1($email);
			$cemail = sha1($cemail);
			$link = "http://www.rotussecurity.com.br/admin/recuperar_senha.php?id=".$resultado["usuID"]."&email=".$cemail."&key=".$resultado["usuRecovery"];
			$mail = new PHPMailer(true);
			$mail->SetLanguage("br");
			$mail->IsSMTP();
			try{
				//Configurações do servidor
				$mail->Host = 'br586.hostgator.com.br';
				$mail->SMTPAuth = true;
				$mail->SMTPSecure = "ssl";
				$mail->Port = 465;
				$mail->Username = 'cadastro@rotussecurity.com.br';
				$mail->Password = 'tcc12346';

				//Define o remetente
				$mail->SetFrom('cadastro@rotussecurity.com.br', 'Rotus Security');
				$mail->AddReplyTo('cadastro@rotussecurity.com.br', 'Rotus Security');

				//Define os destinatário(s)
				$mail->AddAddress($email, $resultado['usuNome']);

				// Define os dados técnicos da Mensagem
				$mail->IsHTML(true);
				$mail->CharSet = 'UTF-8';

				// Define a mensagem (Texto e Assunto)
				$mail->Subject = 'Recuperação de senha';
				$mail->Body = "Este é o corpo da mensagem de teste, em <b>HTML</b>! $link :)";
				$mail->AltBody = "Este é o corpo da mensagem de teste, em <b>HTML</b>! $link :)";

				// Envia o e-mail
				$enviar = $mail->Send();

				// Limpa os destinatários e os anexos
				$mail->ClearAllRecipients();

				if ($enviar){
  					return "E-mail enviado com sucesso!";
				} else {
  					return "Não foi possível enviar o e-mail";
				}		
			}
			catch (Exception $e) {
   				return 'Exceção capturada: ' .  $e->getMessage() . "\n";
			}finally{
    			
			}
		}
	}
}
new EsqueceuSenha ();