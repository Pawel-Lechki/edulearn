<?php
// src/Routes/api.php

use App\Controllers\UserController;
use App\Controllers\CourseController;
use App\Controllers\TopicsController;
use Slim\Routing\RouteCollectorProxy;
use App\Middleware\UploadMiddleware;

return function (RouteCollectorProxy $group) {
    // Users routes
    $group->group('/users', function (RouteCollectorProxy $group) {
        $group->get('', [UserController::class, 'getUsers']);
        $group->get('/{id}', [UserController::class, 'getUserById']);
        $group->post('', [UserController::class, 'createUser'])->add(new UploadMiddleware());;
        $group->put('/{id}', [UserController::class, 'updateUser']);
        $group->delete('/{id}', [UserController::class, 'deleteUser']);
        $group->post('/auth', [UserController::class, 'authUser']);
        $group->get('/s/search', [UserController::class, 'getUsersByUsername']);
    });

    // Course routes
    $group->group('/courses', function (RouteCollectorProxy $group) {
        $group->get('', [CourseController::class, 'getCourses']);
        $group->get('/search', [CourseController::class, 'getCoursesByTitle']);
        $group->get('/teacher/{id}', [CourseController::class, 'getCoursesByTeacher']);
        $group->get('/{id}', [CourseController::class, 'getCourseById']);
        $group->post('', [CourseController::class, 'createCourse']);
        $group->put('/{id}', [CourseController::class, 'updateCourse']);
        $group->delete('/{id}', [CourseController::class, 'deleteCourse']);
    });

    // Topics routes
    $group->group('/topics', function (RouteCollectorProxy $group) {
        $group->get('', [TopicsController::class, 'getTopics']);
        $group->get('/{name}', [TopicsController::class, 'getCoursesByTopics']);
    });

    // Course Images routes
    $group->group('/course-images', function (RouteCollectorProxy $group) {
        $group->get('/{id}', [CourseImagesController::class, 'getCourseImages']);
    });
};


