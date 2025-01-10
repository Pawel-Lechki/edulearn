<?php

namespace App\Controllers;

use PDO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CourseController
{
  private PDO $db;

  public function __construct(PDO $db)
  {
    $this->db = $db;
  }

  public function getCourses(Request $request, Response $response): Response
  {
    $sql = "SELECT c.*, GROUP_CONCAT(t.name) as topics 
            FROM courses c 
            LEFT JOIN course_topics ct ON c.id = ct.course_id 
            LEFT JOIN topics t ON ct.topic_id = t.id 
            GROUP BY c.id";

    $stmt = $this->db->query($sql);
    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($courses as &$course) {
        $course['topics'] = $course['topics'] ? explode(',', $course['topics']) : [];
    }


    $response->getBody()->write(json_encode($courses));
    return $response
    ->withHeader('Content-Type', 'application/json')
    ->withStatus(200);
  }

  public function getCourseById(Request $request, Response $response, array $args): Response
  {
    $id = $args['id'];
    $sql = "SELECT * FROM courses WHERE id = $id";
    $stmt = $this->db->query($sql);
    $course = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$course) {
      $response->getBody()->write(json_encode(['message' => 'Course not found']));
      return $response
      ->withHeader('Content-Type', 'application/json')
      ->withStatus(404);
    }

    $response->getBody()->write(json_encode($course));
    return $response
    ->withHeader('Content-Type', 'application/json')
    ->withStatus(200);
  }

  public function getCoursesByTitle(Request $request, Response $response, array $args): Response
  {
    $params = $request->getQueryParams();
    $title = $params['title'] ?? '';
    $sql = "SELECT c.*, GROUP_CONCAT(t.name) as topics 
                FROM courses c
                LEFT JOIN course_topics ct ON c.id = ct.course_id
                LEFT JOIN topics t ON ct.topic_id = t.id
                WHERE c.title LIKE '%$title%'
                GROUP BY c.id";

    $stmt = $this->db->query($sql);
    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($courses as &$course) {
        $course['topics'] = $course['topics'] ? explode(',', $course['topics']) : [];
    }

    $response->getBody()->write(json_encode($courses));
    return $response
    ->withHeader('Content-Type', 'application/json')
    ->withStatus(200);
  }

  public function getCoursesByTeacher(Request $request, Response $response, array $args): Response
  {
    $id = $args['id'];
    $sql = "SELECT * FROM courses WHERE user_id = $id";
    $stmt = $this->db->query($sql);
    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response->getBody()->write(json_encode($courses));
    return $response
    ->withHeader('Content-Type', 'application/json')
    ->withStatus(200);
  }

  public function createCourse(Request $request, Response $response): Response
{
    $data = $request->getParsedBody() ?? [];
    $uploadedFiles = $request->getUploadedFiles();

    try {
        $this->db->beginTransaction();

        $imagePath = '';
        if (isset($uploadedFiles['image']) && $uploadedFiles['image']->getError() === UPLOAD_ERR_OK) {
            $uploadedFile = $uploadedFiles['image'];
            $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
            $imageName = uniqid() . '_course.' . $extension;
            $imagePath = '/uploads/courses/' . $imageName;

            if (!is_dir(__DIR__ . '/../../public/uploads/courses')) {
                mkdir(__DIR__ . '/../../public/uploads/courses', 0777, true);
            }

            $uploadedFile->moveTo(__DIR__ . '/../../public' . $imagePath);
        }

        $sql = "INSERT INTO courses (title, short_description, description, price, image, user_id, related) 
                VALUES (:title, :short_description, :description, :price, :image, :user_id, :related)";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':title' => $data['title'] ?? '',
            ':short_description' => $data['short_description'] ?? '',
            ':description' => $data['description'] ?? '',
            ':price' => $data['price'] ?? 0,
            ':image' => $imagePath,
            ':user_id' => $data['user_id'] ?? null,
            ':related' => $data['related'] ?? null
        ]);

        $courseId = $this->db->lastInsertId();

        if (isset($data['topics']) && is_array($data['topics'])) {
            $topicSql = "INSERT INTO course_topics (course_id, topic_id) VALUES (:course_id, :topic_id)";
            $topicStmt = $this->db->prepare($topicSql);
            
            foreach ($data['topics'] as $topicId) {
                $topicStmt->execute([
                    ':course_id' => $courseId,
                    ':topic_id' => $topicId
                ]);
            }
        }

        $this->db->commit();

        $response->getBody()->write(json_encode([
            'status' => 'success',
            'message' => 'Course added successfully',
            'courseId' => $courseId
        ]));
        
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withStatus(201);

    } catch (\PDOException $e) {
        $this->db->rollBack();
        
        if (!empty($imagePath) && file_exists(__DIR__ . '/../../public' . $imagePath)) {
            unlink(__DIR__ . '/../../public' . $imagePath);
        }
        
        $response->getBody()->write(json_encode([
            'status' => 'error',
            'message' => 'Failed to add course: ' . $e->getMessage()
        ]));
        
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withStatus(500);
    }
}

}