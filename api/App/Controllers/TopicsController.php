<?php

namespace App\Controllers;

use Flight;

class TopicsController
{
  private $db;

  public function __construct()
  {
    $this->db = Flight::db();
  }

  public function getTopics()
  {
    $topics = $this->db->fetchAll("SELECT * FROM topics");
    return Flight::json($topics);
  }

  public function getCoursesByTopics($topicName)
  {
    $courses = $this->db->fetchAll("SELECT c.*, GROUP_CONCAT(t.name) as topics 
                FROM courses c
                LEFT JOIN course_topics ct ON c.id = ct.course_id
                LEFT JOIN topics t ON ct.topic_id = t.id
                WHERE t.name = $topicName
                GROUP BY c.id
                LIMIT 8");

    foreach ($courses as &$course) {
      $course['topics'] = $course['topics'] ? explode(',', $course['topics']) : [];
    }

    return Flight::json($courses);
  }
}