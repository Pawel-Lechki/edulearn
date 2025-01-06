<?php

namespace App\Controllers;

use PDO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function authUser(Request $request, Response $response): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);
        $email = $data['email'];
        $password = $data['password'];
        $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
        $stmt = $this->db->query($sql);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            $response->getBody()->write(json_encode(['message' => 'Invalid credentials']));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401);
        }
        $response->getBody()->write(json_encode($user));
        return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);

    }

    public function getUsers(Request $request, Response $response): Response
    {
        $sql = "SELECT * FROM users";
        $stmt = $this->db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response->getBody()->write(json_encode($users));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    public function getUserById(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];
        $sql = "SELECT * FROM users WHERE id = $id";
        $stmt = $this->db->query($sql);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
          $response->getBody()->write(json_encode(['message' => 'User not found']));
          return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(404);
        }

        $response->getBody()->write(json_encode($user));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    public function getUsersByUsername(Request $request, Response $response, array $args): Response
    {
        $params = $request->getQueryParams();
        $name = $params['name'] ?? '';
        $sql = "SELECT * FROM users WHERE username LIKE '%$name%'";
        $stmt = $this->db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response->getBody()->write(json_encode($users));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    public function createUser(Request $request, Response $response): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);
        
        try {
          $sql = "INSERT INTO users (username, email, password, role) VALUES ('{$data["username"]}','{$data["email"]}','{$data["password"]}','{$data["role"]}')";
            $stmt = $this->db->prepare($sql);
            $stmt->execute();

            $userId = $this->db->lastInsertId();
            $response->getBody()->write(json_encode(['message' => 'User created successfully', 'id' => $userId]));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(201);

        } catch (\PDOException $e) {
            $response->getBody()->write(json_encode(['message' => 'Error creating user']));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(400);
        }
    }

    public function updateUser(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];
        $data = json_decode($request->getBody()->getContents(), true);

        $existingUser = $this->getUserById($request, $response, ['id' => $id]);

        if (!$existingUser) {
            $response->getBody()->write(json_encode(['message' => 'User not found']));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(404);
        }

        try {
            $username = $data['username'] ?? $existingUser['username'];
            $email = $data['email'] ?? $existingUser['email'];
            $password = $data['password'] ?? $existingUser['password'];
            $role = $data['role'] ?? $existingUser['role'];

            $sql = "UPDATE users SET username = $username, email = $email, password = $password, role = $role WHERE id = $id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute();

            $response->getBody()->write(json_encode(['message' => 'User updated successfully']));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(200);

        } catch (\PDOException $e) {
            $response->getBody()->write(json_encode(['message' => 'Error updating user']));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(400);
        }
    }

    public function deleteUser(Request $request, Response $response, array $args): Response
    {
      $id = $args['id'];
      $existingUser = $this->getUserById($request, $response, ['id' => $id]);
      if (!$existingUser) {
          $response->getBody()->write(json_encode(['message' => 'User not found']));
          return $response
          ->withHeader('Content-Type', 'application/json')
          ->withStatus(404);
      }

      try {
          $sql = "DELETE FROM users WHERE id = $id";
          $stmt = $this->db->prepare($sql);
          $stmt->execute();
          $response->getBody()->write(json_encode(['message' => 'User deleted successfully']));
          return $response
          ->withHeader('Content-Type', 'application/json')
          ->withStatus(200);
        } catch (\PDOException $e) {
          $response->getBody()->write(json_encode(['message' => 'Error deleting user']));
            return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(400);
        }   
    }
}