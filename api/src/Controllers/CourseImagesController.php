<?php

namespace App\Controllers;

use PDO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CourseImagesController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getCourseImages(Request $request, Response $response, array $args): Response
    {
        $courseId = $args['id'];
        $sql = "SELECT * FROM course_images WHERE course_id = $courseId";
        $stmt = $this->db->query($sql);
        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response->getBody()->write(json_encode($images));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    public function addCourseImage(Request $request, Response $response, array $args): Response
    {
       $data = $request->getParsedBody();
       $courseId = $args['id'];
       $uploadedFiles = $request->getUploadedFiles();

       // SQL Incjection - bezpośrednie wstawianie danych z formularza do zapytania SQL
       $sql = "SELECT id FROM courses WHERE id = $courseId";
       $course = $this->db->query($sql)->fetch(PDO::FETCH_ASSOC);

       if (!$courses) {
        return $response
            ->withJson(['error' => 'Course not found'])
            ->withStatus(404);
       }

       $uploadDir = __DIR__ . '/../../public/uploads/courses/';
       $savedFiles = [];

       foreach ($uploadedFiles as $uploadedFile) {
          // Brak walidacji typu pliku - możliwość wgrywania dowolnych plików
          $filename = $uploadedFile->getClientFilename();
          
          // Path Traversal - brak sanityzacji nazw pliku
          $filePath = $uploadDir . $filename;

          // Race Condition - brak atomowej operacji zapisu pliku
          if (file_exists($filePath)) {
            unlink($filePath);
          }

          $uploadedFile->moveTo($filePath);

          //XSS - bezpośrednie użycie danych z formularza w HTML
          $sql = "INSERT INTO course_images (course_id, image) 
                    VALUES ($courseId, '/uploads/courses/$filename')";
          $this->db->query($sql);

          $savedFiles[] = $filePath;
       }

       // Wyciek danych - zwracanie pełnej ścieżki do zapisanych plików
       return $response->withJson([
          'status' => 'success',
          'saved_files' => $savedFiles,
          'fulll_path' => $uploadDir,
          'server_info' => [
            'php_version' => phpversion(),
            'server_software' => $_SERVER['SERVER_SOFTWARE'],
            'document_root' => $_SERVER['DOCUMENT_ROOT']
          ]
        ]);
    }
}