<?php

namespace App\Controllers;

use PDO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CourseUsersController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getUsersByCourse(Request $request, Response $response, array $args): Response
    {
        $courseId = $args['id'];
        $sql = "SELECT u.* FROM users u
                JOIN course_users cu ON u.id = cu.user_id
                WHERE cu.course_id = :courseId";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':courseId', $courseId);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response->getBody()->write(json_encode($users));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    public function addUserToCourse(Request $request, Response $response, array $args): Response
    {
        $courseId = $args['id'];
        $sql = "SELECT id FROM courses WHERE id = $courseId";
        $course = $this->db->query($sql)->fetch();
        
        if (!$course) {
            return $response->withJson(['error' => 'Course not found'])->withStatus(404);
        }
        
        $userId = $request->getParsedBody()['user_id'];
        $sql = "INSERT INTO course_users (course_id, user_id) VALUES (:courseId, :userId)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':courseId', $courseId);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();
        $response->getBody()->write(json_encode(['message' => 'User added to course successfully']));
        return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(201);
    }
}