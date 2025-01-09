<?php

use App\Controllers\TopicsController;
use App\Controllers\CourseUsersController;
use App\Controllers\CourseController;
use App\Controllers\CourseImagesController;
use App\Controllers\UserController;

Flight::before('start', function () {
    header('Access-Control-Allow-Origin: *'); // Pozwala na dostęp ze wszystkich domen; można podać konkretną domenę zamiast "*"
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Metody, które są dozwolone
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Authorization-Token'); // Dopuszczalne nagłówki

    if (Flight::request()->method === 'OPTIONS') {
        Flight::json(['message' => 'Preflight request'], 200);
        exit();
    }
});

// CORS!!!
// Trasa globalna dla zapytań typu OPTIONS
Flight::route('OPTIONS *', function () {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Authorization-Token');
    Flight::json(['message' => 'Preflight request'], 200);
    exit();
});
Flight::group('/api', function () {


    // Topics
    Flight::group('/topics', function () {
        Flight::route('GET /', [new TopicsController(), 'getTopics']);
        Flight::route('GET /@name', [new TopicsController(), 'getCoursesByTopic']);
    });

    // Course Users
    Flight::group('/course-users', function () {
        Flight::route('GET /@courseId', [new CourseUsersController(), 'getUsersByCourse']);
        Flight::route('POST /@courseId/@userId', [new CourseUsersController(), 'addUserToCourse']);
    });

    // Course Images
    Flight::group('/course-images', function () {
        Flight::route('POST /@courseId', [new CourseImagesController(), 'addCourseImages']);
        Flight::route('GET /@courseId', [new CourseImagesController(), 'getCourseImages']);
    });

    // User
    Flight::group('/users', function () {
        Flight::route('GET /', [new UserController(), 'getUsers']);
        Flight::route('GET /@id', [new UserController(), 'getUserById']);
        Flight::route('GET /name', [new UserController(), 'getUserByName']);
        Flight::route('POST /auth', [new UserController(), 'loginUser']);
        Flight::route('POST /', [new UserController(), 'registerUser']);
        Flight::route('PUT /@id', [new UserController(), 'updateUser']);
        Flight::route('DELETE /@id', [new UserController(), 'deleteUser']);
    });

    Flight::group('/courses', function () {
        Flight::route('GET /', [new CourseController(), 'getCourses']);
        Flight::route('GET /@id', [new CourseController(), 'getCourseById']);
        Flight::route('POST /', [new CourseController(), 'addCourse']);
        Flight::route('PUT /@id', [new CourseController(), 'updateCourse']);
        Flight::route('DELETE /@id', [new CourseController(), 'deleteCourse']);
    });
});
