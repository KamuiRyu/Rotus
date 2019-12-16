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
		if(isset($_POST["txtEmail"]) && isset($_POST["txtRequestEmail"])){
			$recovery = $this->geraSenha(10);
			echo $this->EnviaEmail(filter_var($_POST["txtEmail"], FILTER_VALIDATE_EMAIL),$recovery);
		}else if(isset($_POST["txtCode"]) && isset($_POST["txtRequestCode"])){
			$code = filter_var($_POST["txtCode"],FILTER_SANITIZE_STRING);
			$email = filter_var($_POST["Email"], FILTER_VALIDATE_EMAIL);
			echo $this->VerificaCode($email,$code);
			Database::close();
			exit(0);
		}else if(isset($_POST["txtEmail"]) && isset($_POST["txtCode"]) && isset($_POST["txtNovaSenha"]) ){
			$code = filter_var($_POST["txtCode"],FILTER_SANITIZE_STRING);
			$email = filter_var($_POST["txtEmail"], FILTER_VALIDATE_EMAIL);
			$senha = filter_var($_POST["txtNovaSenha"],FILTER_SANITIZE_STRING);
			echo $this->RecuperaSenha($email,$code,$senha);
			Database::close();
			exit(0);
		}else{
			Database::close();

			$this->templateLoader->parse ( "esqueceu_senha" );
			
			$this->templateLoader->out ( "esqueceu_senha" );
		}
	}
	private function EnviaEmail($email,$recovery){
		$sql = "SELECT usuNome, usuID FROM usuarios WHERE usuEmail = '$email'";
		if(!Database::execute($sql)){
			return false;
			exit(0);
		}
		$resultado = Database::fetchAll();
		if(count($resultado[0]) > 0){
			$nome = $resultado[0]["usuNome"];
			$id = $resultado[0]["usuID"];
			$query = "UPDATE usuarios SET usuRecovery = '$recovery' WHERE usuID = '$id'";
			if(!Database::execute($query)){
				return false;
				exit(0);
			}
			$mail = new PHPMailer(true);
			$mail->SetLanguage("br");
			$mail->IsSMTP();
			$html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>REDEFINIÇÃO DE SENHA</title>
    <style type="text/css">
        @media screen and (max-width: 600px) {
            table[class="container"] {
                width: 95% !important;
            }
        }
        
        #outlook a {
            padding: 0;
        }
        
        body {
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            margin: 0;
            padding: 0;
            font-family: Century Gothic !important;
        }
        
        .ExternalClass {
            width: 100%;
        }
        
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            line-height: 100%;
        }
        
        #backgroundTable {
            margin: 0;
            padding: 0;
            width: 100% !important;
            line-height: 100% !important;
        }
        
        img {
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
        
        a img {
            border: none;
        }
        
        .image_fix {
            display: block;
        }
        
        p {
            margin: 1em 0;
        }
        
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            color: black !important;
        }
        
        h1 a,
        h2 a,
        h3 a,
        h4 a,
        h5 a,
        h6 a {
            color: blue !important;
        }
        
        h1 a:active,
        h2 a:active,
        h3 a:active,
        h4 a:active,
        h5 a:active,
        h6 a:active {
            color: red !important;
        }
        
        h1 a:visited,
        h2 a:visited,
        h3 a:visited,
        h4 a:visited,
        h5 a:visited,
        h6 a:visited {
            color: purple !important;
        }
        
        table td {
            border-collapse: collapse;
        }
        
        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        
        a {
            color: #000;
        }
        
        @media only screen and (max-device-width: 480px) {
            a[href^="tel"],
            a[href^="sms"] {
                text-decoration: none;
                color: black;
                /* or whatever your want */
                pointer-events: none;
                cursor: default;
            }
            .mobile_link a[href^="tel"],
            .mobile_link a[href^="sms"] {
                text-decoration: default;
                color: orange !important;
                /* or whatever your want */
                pointer-events: auto;
                cursor: default;
            }
        }
        
        @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
            a[href^="tel"],
            a[href^="sms"] {
                text-decoration: none;
                color: blue;
                /* or whatever your want */
                pointer-events: none;
                cursor: default;
            }
            .mobile_link a[href^="tel"],
            .mobile_link a[href^="sms"] {
                text-decoration: default;
                color: orange !important;
                pointer-events: auto;
                cursor: default;
            }
        }
        
        @media only screen and (-webkit-min-device-pixel-ratio: 2) {
            /* Put your iPhone 4g styles in here */
        }
        
        @media only screen and (-webkit-device-pixel-ratio:.75) {
            /* Put CSS for low density (ldpi) Android layouts in here */
        }
        
        @media only screen and (-webkit-device-pixel-ratio:1) {
            /* Put CSS for medium density (mdpi) Android layouts in here */
        }
        
        @media only screen and (-webkit-device-pixel-ratio:1.5) {
            /* Put CSS for high density (hdpi) Android layouts in here */
        }
        /* end Android targeting */
        
        h2 {
            color: white !important;
            font-size: 22px;
            line-height: 22px;
            font-weight: normal;
        }
        
        a.link1 {}
        
        a.link2 {
            color: #fff;
            text-decoration: none;
            font-size: 16px;
            color: #fff;
            border-radius: 4px;
        }
        
        p {
            color: white;
            font-size: 16px;
            line-height: 160%;
        }
    </style>

    <script type="colorScheme" class="swatch active">
        { "name":"Default", "bgBody":"ffffff", "link":"fff", "color":"555555", "bgItem":"ffffff", "title":"181818" }
    </script>

</head>

<body>
    <table cellpadding="0" width="100%" cellspacing="0" border="0" id="backgroundTable" class="bgBody">
        <tr>
            <td>
                <table cellpadding="0" width="620" class="container" align="center" cellspacing="0" border="0">
                    <tr>
                        <td style="background:#212121;">
                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                                <tr>
                                    <td class="movableContentContainer bgItem">

                                        <div class="movableContent">
                                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                                                <tr height="40">
                                                    <td width="200">&nbsp;</td>
                                                    <td width="200">&nbsp;</td>
                                                    <td width="200">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td width="200" valign="top">&nbsp;</td>
                                                    <td width="200" valign="top" align="center">
                                                        <div class="contentEditableContainer contentImageEditable">
                                                            <div class="contentEditable" align="center">
                                                                <img src="http://rotussecurity.com.br/images/logo.png" width="220" height="180" alt="Logo" data-default="placeholder" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td width="200" valign="top">&nbsp;</td>
                                                </tr>
                                                <tr height="25">
                                                    <td width="200">&nbsp;</td>
                                                    <td width="200">&nbsp;</td>
                                                    <td width="200">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </div>

                                        <div class="movableContent">
                                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                                                <tr>
                                                    <td width="100%" colspan="3" align="center" style="padding-bottom:10px;padding-top:25px;">
                                                        <div class="contentEditableContainer contentTextEditable">
                                                            <div class="contentEditable" align="center">
                                                                <h2>REDEFINIÇÃO DE SENHA</h2>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="100">&nbsp;</td>
                                                    <td width="400" align="center">
                                                        <div class="contentEditableContainer contentTextEditable">
                                                            <div class="contentEditable" align="left">
                                                                <p>Olá '.$nome.',
                                                                    <br/>
                                                                    <br/> Você solicitou uma recuperação de senha em nosso site, aqui está o código para redefinição de senha.</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td width="100">&nbsp;</td>
                                                </tr>
                                            </table>
                                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                                                <tr>
                                                    <td width="200">&nbsp;</td>
                                                    <td width="200" align="center" style="padding-top:25px;">
                                                        <table cellpadding="0" cellspacing="0" border="0" align="center" width="200" height="50">
                                                            <tr>
                                                                <td bgcolor="#B71C1C" align="center" style="border-radius:4px;" width="200" height="50">
                                                                    <div class="contentEditableContainer contentTextEditable">
                                                                        <div class="contentEditable" align="center">
                                                                            <p>'.$recovery.'</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td width="200">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </div>

                                        <div class="movableContent" style="padding-top:25px;">
                                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                                                <tr>
                                                    <td width="80">&nbsp;</td>
                                                    <td width="400" align="center">
                                                        <div class="contentEditableContainer contentTextEditable">
                                                            <div class="contentEditable" align="center">
                                                                <p>Se você não está tentando mudar suas credenciais de login, por favor ignore este e-mail. É possível que outro usuário tenha inserido suas informações de login de forma incorreta.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td width="80">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="movableContent">
                                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="620px" class="container">
                                                <tbody>
                                                    <tr>
                                                        <td width="100%" colspan="2" style="padding-top:-5px;">
                                                            <hr style="height:1px;border:none;color:#000;background-color:#a8a8a8;" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="60%" height="70" valign="middle">
                                                            <div class="contentEditableContainer contentTextEditable">
                                                                <div class="contentEditable" align="left">
                                                                    <span style="font-size:16px;color:#B71C1C;font-family:Arial, sans-serif;margin-left:10px;font-weight:600;display:block">© 2017 Todos direitos reservados a Rotus Security<br>
</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td width="40%" height="70" align="right" valign="top" align="right"" style="padding-bottom:20px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="right">
                                                                <tr>
                                                                    <td width="57%"></td>
                                                                    <td valign="top" width="34">
                                                                        <div class="contentEditableContainer contentFacebookEditable" style="display:inline;">
                                                                            <div class="contentEditable">
                                                                                <a target="_blank" href="https://www.facebook.com/ControledeAcessoRotus/" data-default="placeholder" style="text-decoration:none;">
                                                                                    <img src="http://rotussecurity.com.br/images/redes-sociais/Facebook.png" data-default="placeholder" data-max-width="50" data-customIcon="true" width="50" height="50" alt="facebook" style="margin-right:40x;"></a>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td valign="top" width="34">
                                                                        <div class="contentEditableContainer contentTwitterEditable" style="display:inline;">
                                                                            <div class="contentEditable">
                                                                                <a target="_blank" href="https://twitter.com/RotusSecurity" data-default="placeholder" style="text-decoration:none;">
                                                                                    <img src="http://rotussecurity.com.br/images/redes-sociais/Twitter.png" data-default="placeholder" data-max-width="50" data-customIcon="true" width="50" height="50" alt="twitter" style="margin-right:40x;"></a>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td valign="top" width="34">
                                                                        <div class="contentEditableContainer contentImageEditable" style="display:inline;">
                                                                            <div class="contentEditable">
                                                                                <a target="_blank" href="https://www.youtube.com/channel/UCfLNX5F4RL9eHEn-XDYOQGw" data-default="placeholder" style="text-decoration:none;">
                                                                                    <img src="http://rotussecurity.com.br/images/redes-sociais/Youtube.png" width="50" height="50" data-max-width="50" alt="youtube" style="margin-right:40x;" />
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>';
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
				$mail->Body = "$html";
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
		}else{
			return false;
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
			$sql = "SELECT * FROM usuarios WHERE usuRecovery = '$retorno'";
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
	public function VerificaCode($email,$code){
		$sql = "SELECT usuRecovery FROM usuarios WHERE usuEmail = '$email' AND usuRecovery = '$code'";
        if(!Database::execute($sql)){
            return false;
            exit(0);
        }
		$resultado = Database::fetchAll();
		if(count($resultado[0]) > 0){
			return true;
		}else{
			return false;
		}
	}
    public function RecuperaSenha($email,$code,$senha){
        $sql = "SELECT usuEmail,usuRecovery FROM usuarios WHERE usuEmail = '$email' AND usuRecovery = '$code'";
        if(!Database::execute($sql)){
            return false;
            exit(0);
        }
        $resultado = Database::fetch();
        if(count($resultado) > 0){
            $novasenha = sha1($senha);
            $novasenha = md5($novasenha);
            $update = "UPDATE usuarios SET usuSenha = '$novasenha' WHERE usuEmail = '$email' AND usuRecovery = '$code'";
            if(!Database::execute($update)){
                return false;
                exit(0);
            }
            return true;
        }
    }
}
new EsqueceuSenha ();