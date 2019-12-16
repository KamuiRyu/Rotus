<?php
class Database {
	private static $conexao;
	private static $resultados;
	public static function conect() {
		try {
			$dsn = "mysql:host=108.179.253.165;dbname=rotus863_rotus;charset=utf8";
			self::$conexao = new PDO ( $dsn, "rotus863_adm", "tcc12346" );
			self::$conexao->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			return true;
		} catch ( Exception $erro ) {
			return false;
		}
	}
	public static function execute($sql) {
		try {
			self::$conexao->beginTransaction ();
			self::$resultados = self::$conexao->prepare ( $sql );
			self::$resultados->execute ();
		} catch ( PDOException $e ) {
			self::$conexao->rollBack ();
			return false;
		}
		self::$conexao->commit ();
		return true;
	}
	public static function fetch() {
		return self::$resultados->fetch ();
	}
	public static function fetchAll() {
		return self::$resultados->fetchAll ();
	}
	public static function close() {
		self::$conexao = null;
	}
}
