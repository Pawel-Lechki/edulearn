<?php

namespace App\Controllers;

use PDO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class TopicsController
{
    private PDO $db;
    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getTopics(Request $request, Response $response): Response
    {
        $sql = "SELECT * FROM topics";
        $stmt = $this->db->query($sql);
        $topics = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response->getBody()->write(json_encode($topics));
        return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
    }

    public function getCoursesByTopics(Request $request, Response $response, array $args): Response
    {
        $topicName = $args['name'];
        $sql = "SELECT c.*, GROUP_CONCAT(t.name) as topics 
                FROM courses c
                LEFT JOIN course_topics ct ON c.id = ct.course_id
                LEFT JOIN topics t ON ct.topic_id = t.id
                WHERE t.name = :topicName
                GROUP BY c.id
                LIMIT 8";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':topicName', $topicName);
        $stmt->execute();
        $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($courses as &$course) {
            $course['topics'] = $course['topics'] ? explode(',', $course['topics']) : [];
        }

        $response->getBody()->write(json_encode($courses));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
}

