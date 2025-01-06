<?php
// public/index.php

use Slim\Factory\AppFactory;
use DI\Container;

require __DIR__ . '/../vendor/autoload.php';

// Utworzenie kontenera DI
$container = require __DIR__ . '/../src/Config/container.php';

// Utworzenie aplikacji z kontenerem
AppFactory::setContainer($container);
$app = AppFactory::create();

// Dodanie middleware
$app->addBodyParsingMiddleware();
$app->addErrorMiddleware(true, true, true);

// $app->add(function (Request $request, Response $response, callable $next) {
//     $response = $next($request, $response);
//     return $response
//         ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4321/') // Zmień na adres frontendu
//         ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//         ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//         ->withHeader('Access-Control-Allow-Credentials', 'true');
// });

// Dodanie routingu API
$app->group('/api', require __DIR__ . '/../src/Routes/api.php');

$app->run();