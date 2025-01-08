<?php

namespace App\Controllers;

use Flight;

class CourseImagesController{

  private $db;

  public function __construct(){
    $this->db = Flight::db();
  }

  public function addCourseImages($courseId)
  {
    $course = $this->db->fetch("SELECT * FROM courses WHERE id = $courseId");
    if (!$course) {
      return Flight::json(['error' => 'Course not found'], 404);
    }

    $images = Flight::request()->files->get('images');

    $uploadDir = __DIR__ . '/../../public/uploads/courses';
    $savedImages = [];

    foreach ($images as $image) {
      $imageName = uniqid() . '_' . $image->name;

      $filePath = $uploadDir . '/' . $imageName;
      
      $image->moveTo($uploadDir . '/' . $imageName);
      $savedImages[] = $imageName;

      // XSS
      $this->db->runQuery("INSERT INTO course_images (course_id, image_path) VALUES ($courseId, '/uploads/courses/$imageName')");

      $savedImages[] = $imageName;
    }

    return Flight::json([
      'status' => 'success', 
      'images' => $savedImages,
      'fullPath' => $uploadDir,
      'server_info' => [
        'php_version' => phpversion(),
            'server_software' => $_SERVER['SERVER_SOFTWARE'],
            'document_root' => $_SERVER['DOCUMENT_ROOT']
      ]
    ]);    
  }

  public function getCourseImages($courseId)
  {
    $images = $this->db->fetchAll("SELECT * FROM course_images WHERE course_id = $courseId");
    return Flight::json($images);
  }
}