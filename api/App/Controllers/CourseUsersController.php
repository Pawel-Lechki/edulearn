<?php

namespace App\Controllers;

use Flight;

class CourseUsersController {
  private $db;

  public function __construct() {
    $this->db = Flight::db();
  }

  public function getUsersByCourse($courseId) {
    $users = $this->db->fetchAll("SELECT u.* FROM users u
                JOIN course_users cu ON u.id = cu.user_id
                WHERE cu.course_id = $courseId");

    return Flight::json($users);
  }

  public function addUserToCourse($courseId, $userId) {

    $course = $this->db->fetch("SELECT * FROM courses WHERE id = $courseId");
    if (!$course) {
      return Flight::json(['error' => 'Course not found'], 404);
    }

    $this->db->execute("INSERT INTO course_users (course_id, user_id) VALUES ($courseId, $userId)");

    return Flight::json(['message' => "User: $userId added to course: $courseId"]);
  }
}