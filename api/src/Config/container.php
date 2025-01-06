<?php
// src/Config/container.php

namespace App\Config;

use DI\ContainerBuilder;
use PDO;
use Psr\Container\ContainerInterface;

$containerBuilder = new ContainerBuilder();

// Wczytanie konfiguracji bazy danych
$dbConfig = require __DIR__ . '/database.php';

$containerBuilder->addDefinitions([
    // Definiujemy PDO jako \PDO żeby uniknąć problemów z namespace
    \PDO::class => function(ContainerInterface $c) use ($dbConfig) {
        $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']};charset={$dbConfig['charset']}";
        return new \PDO($dsn, $dbConfig['user'], $dbConfig['password'], [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC
        ]);
    }
]);

return $containerBuilder->build();