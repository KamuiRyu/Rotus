<?php
require_once __DIR__ . '/lib/TemplateLoader.php';
require_once __DIR__ . '/lib/database.php';

class Index {
	private $templateLoader;
	public function __construct() {	
       	if (!Database::conect()) {
            echo "ERRO!";
        }
		session_start();

		$this->templateLoader = new TemplateLoader ( __DIR__ . "/template/index.html" );

		$navbar = $this->AutenticarUsuario();
		
		$this->templateLoader->assign ( "navbar" , $navbar);

		Database::close();

		$this->templateLoader->parse ( "index" );
		
		$this->templateLoader->out ( "index" );
	}
	public static function AutenticarUsuario(){
		if(isset($_SESSION["id"])){
			$id = $_SESSION["id"];
			$sql = "SELECT usuNome, usuFoto FROM usuarios WHERE usuID = $id";
	        if(!Database::execute($sql)){
				return false;
				exit(0);
        	}
			$resultado = Database::fetch();
			$nome = $resultado['usuNome'];
			$foto = $resultado['usuFoto'];
			return "
				<nav class='z-depth-1 nav-fixed' role='navigation'>
					<div class='nav-wrapper'>
					<a href='index.php' class='brand-logo black-text'><img src='images/logo.png' class='responsive-img logo-navbar' width='62'/></a>
					<ul id='userMenu' class='dropdown-content'>
						<li><a href='conta' class='black-text'><i class='material-icons'>person</i>VER INFORMAÇÕES</a></li>
						<li><a href='admin/cursos.php' class='black-text'><i class='material-icons'>school</i>CURSOS</a></li>
						<li><a href='class/logout.php' class='black-text'><i class='material-icons black-text'>power_settings_new</i>SAIR</a></li>
					</ul>
					<ul class='right hide-on-med-and-down'>
						<li><a href='index.php' class='black-text'>home</a></li>
						<li><a href='contato.php' class='black-text'>contato</a></li>
						<li class='nav-main'><a class='dropdown-button' href='#!' data-activates='userMenu' style='color: white;'><img src='$foto' class='responsive-img circle' width='37' style='position:relative;top:12px;right:8px;'>Olá $nome<i class='material-icons right'>arrow_drop_down</i></a></li>
					</ul>
					<ul id='nav-mobile' class='side-nav' style='left: 0px;'>
						<div>
							<img src='$foto' class='responsive-img circle' width='120' style='display: block;margin-left: auto;margin-right: auto;margin-top: 2%;'>
							<strong class='white-text center-align' style='display: block;margin-left: auto;margin-right: auto;margin-top: -5%;font-size:17px;'>$nome</strong>
						</div>
						<li><a href='conta' class='white-text'><i class='material-icons white-text'>person</i>VER INFORMAÇÕES</a></li>
						<li><a href='admin/cursos.php' class='white-text'><i class='material-icons white-text'>school</i>CURSOS</a></li>
						<li><a href='class/logout.php' class='white-text'><i class='material-icons white-text'>power_settings_new</i>SAIR</a></li>
						<li class='divider white'></li>
						<li><a href='index.php' class='white-text'>home</a></li>
						<li><a href='contato.php' class='white-text'>contato</a></li> 
					</ul>
					<a href='#' data-activates='nav-mobile' class='button-collapse'><i class='material-icons black-text'>menu</i></a>
					</div>
				</nav>
			";
			exit(0);
		}
		else{
			return "
					<nav class='z-depth-1 nav-fixed' role='navigation'>
						<div class='nav-wrapper'>
							<a href='index.php' class='brand-logo black-text'><img src='images/logo.png' class='responsive-img logo-navbar' width='62'/></a>
								<ul class='right hide-on-med-and-down'>
									<li><a href='index.php' style='color: black;'>home</a></li>
									<li><a href='contato.php' style='color: black;'>contato</a></li>
									<li class='nav-main'><a href='desativar_conta.php' style='color: white;'>em caso de furto</a></li>
								</ul>
					<ul id='nav-mobile' class='side-nav' style='left: 0px;'>
						<li><a href='index.php' class='white-text'>home</a></li>
						<li><a href='contato.php' class='white-text'>contato</a></li>
						<li class='nav-main'><a href='desativar_conta.php' class='white-text'>em caso de furto</a></li>   
					</ul>
					<a href='#' data-activates='nav-mobile' class='button-collapse'><i class='material-icons black-text'>menu</i></a>
					</div>
				</nav>
			";
		}
	}
}
new Index ();