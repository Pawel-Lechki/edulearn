<?php

namespace App\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

class UploadMiddleware implements MiddlewareInterface
{
    private string $uploadDirectory;

    public function __construct(string $uploadDirectory = null)
    {
        $this->uploadDirectory = $uploadDirectory ?? __DIR__ . '/../../public/uploads';
        
        // Utworzenie katalogu, jeśli nie istnieje
        if (!is_dir($this->uploadDirectory)) {
            mkdir($this->uploadDirectory, 0777, true);
        }
    }

    public function process(Request $request, RequestHandler $handler): Response
    {
        if ($request->getMethod() === 'POST' || $request->getMethod() === 'PUT') {
            $contentType = $request->getHeaderLine('Content-Type');
            if (strstr($contentType, 'multipart/form-data')) {
                $uploadedFiles = $request->getUploadedFiles();
                // Możesz tutaj dodać dodatkową logikę przetwarzania plików
                $request = $request->withAttribute('uploadedFiles', $uploadedFiles);
            }
        }

        return $handler->handle($request);
    }
}