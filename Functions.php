<?php

class Functions
{

    public function updateClient($args)
    {
        require_once('conn.php');
        $conn = Database::connectionPDO();

        try {
            $code = $conn->prepare('UPDATE clientes SET cliente=:cliente, cidade=:cidade, email=:email WHERE id = :id');
            $code->bindParam(':id', $args['id']);
            $code->bindParam(':cliente', $args['cliente']);
            $code->bindParam(':cidade', $args['cidade']);
            $code->bindParam(':email', $args['email']);
            $code->execute();

            return "{$args['cliente']} Editado com sucesso";

        } catch (exception $e) {
            return "Erro: {$e}";
        }

    }

    public function deleteClient($args)
    {
        require_once('conn.php');
        $conn = Database::connectionPDO();

        try {
            $code = $conn->prepare('DELETE FROM clientes WHERE id = :id');
            $code->bindParam(':id', $args['id']);
            $code->execute();

            return "{$args['cliente']} Apagado com sucesso";
        } catch (exception $e) {
            return "Erro: {$e}";
        }

    }

    public function insertClient($args)
    {
        require_once('conn.php');
        $conn = Database::connectionPDO();

        try {
            $sql = $conn->prepare("INSERT INTO clientes (cliente, cidade, email) VALUES (:cliente, :cidade, :email)");
            $sql->bindParam(':cliente', $args['cliente']);
            $sql->bindParam(':cidade', $args['cidade']);
            $sql->bindParam(':email', $args['email']);
            $sql->execute();

            return "{$args['cliente']} Cadastrado com sucesso";
        } catch (exception $e) {
            return "Erro: {$e}";
        }
    }

    public function showClient()
    {
        require_once('conn.php');
        $conn = Database::connectionPDO();

        $code = $conn->prepare("SELECT * FROM clientes");
        $code->execute();
        $select = $code->fetchAll(PDO::FETCH_ASSOC);

        // foreach ($select as $key => $selects) {
        //     $select[$key]['id'] = $selects['id'];
        //     $select[$key]['cliente'] = $selects['cliente'];
        //     $select[$key]['cidade'] = $selects['cidade'];
        //     $select[$key]['email'] = $selects['email'];
        // }

        return $select;
    }

}

?>