<?php
class Product {

    // подключение к базе данных и таблице 'products' 
    private $conn;
    private $table_name = "products";

    // свойства объекта 
    public $id;
    public $title;
    public $description;
    public $created;

    // конструктор для соединения с базой данных 
    public function __construct($db){
        $this->conn = $db;
    }

    // метод read() - получение товаров 
function read(){

    // выбираем все записи 
    $query = "SELECT `id`, `title`, `description`, `created` FROM `products` WHERE 1";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);

    // выполняем запрос 
    $stmt->execute();

    return $stmt;
}
}
?>