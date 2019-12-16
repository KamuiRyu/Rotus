<?php
require_once __DIR__ . '/../lib/database.php';
header('Access-Control-Allow-Origin: *'); 
class upload{
    public function __construct() {
        if (!Database::conect()) {
            echo "ERRO!";
        }
        $foto = urldecode($_FILES["file"]["name"]).".png";
        echo $this->uploadFoto($foto);
    }
    public function uploadFoto($foto){
        if(move_uploaded_file($_FILES["file"]["tmp_name"], "../profiles/alunos/".$foto)){
            return "FOI";
        }else{
            return "FALHO";
        }
    }
}
new upload();