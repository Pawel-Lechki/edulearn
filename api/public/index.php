<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../App/Database/Database.php';
require_once __DIR__ . '/../App/Routes/api.php';


Flight::route('/', function () {
    echo 'Hello World!';
});

Flight::start();
