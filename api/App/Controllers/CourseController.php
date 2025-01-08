<?php

namespace App\Controllers;

use Flight;

class CourseController{
  private $db;

  public function __construct() {
    $this->db = Flight::db();
  }

  public function getCourses() {
    $courses = $this->db->fetchAll("SELECT c.*, GROUP_CONCAT(t.name) as topics 
            FROM courses c 
            LEFT JOIN course_topics ct ON c.id = ct.course_id 
            LEFT JOIN topics t ON ct.topic_id = t.id 
            GROUP BY c.id");

    foreach ($courses as $course) {
      $course['topics'] = explode(',', $course['topics']);
    }

    return Flight::json($courses);
  }

  public function getCourseById($id) {
    $course = $this->db->fetchRow("SELECT * FROM courses WHERE id = $id");

    if (!$course) {
      return Flight::notFound();
    }

    return Flight::json($course);
  }

  public function getCourseByTitle() {
    $title = Flight::request()->query['title'];
    $course = $this->db->fetchAll("SELECT c.*, GROUP_CONCAT(t.name) as topics 
                FROM courses c
                LEFT JOIN course_topics ct ON c.id = ct.course_id
                LEFT JOIN topics t ON ct.topic_id = t.id
                WHERE c.title LIKE '%$title%'
                GROUP BY c.id");

    foreach ($courses as $course) {
      $course['topics'] = explode(',', $course['topics']);
    }

    return Flight::json($course);

  }
}