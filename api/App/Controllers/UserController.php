<?php

namespace App\Controllers;

use Flight;

class UserController
{

  private $db;

  public function __construct()
  {
    $this->db = Flight::db();
  }

  public function getUsers()
  {
    $users = $this->db->fetchAll("SELECT * FROM users");
    return Flight::json($users);
  }

  public function getUserById($id)
  {
    $user = $this->db->fetchRow("SELECT * FROM users WHERE id = $id");

    if (!$user) {
      return Flight::notFound();
    }

    return Flight::json($user);
  }

  public function loginUser()
  {
    $data = Flight::request()->data;
    $email = $data["email"];
    $password = $data['password'];
    $user = $this->db->fetchRow("SELECT * FROM users WHERE email = '$email' AND password = '$password'");

    if (!$user) {
      return Flight::notFound();
    }

    return Flight::json($user);
  }

  public function getUserByName()
  {
    $name = Flight::request()->query['name'];
    $users = $this->db->fetchAll("SELECT * FROM users WHERE name LIKE '%$name%'");

    return Flight::json($users);
  }

  public function registerUser()
  {
    $data = Flight::request()->data;
    $name = $data["name"];
    $email = $data["email"];
    $password = $data['password'];

    $newUser = $this->db->runQuery("INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')");

    return Flight::json(['message' => 'User registered successfully']);
  }

  public function updateUser($id)
  {
    $data = Flight::request()->data;
    $name = $data["name"];
    $email = $data["email"];
    $password = $data['password'];

    $user = $this->db->fetchRow("SELECT * FROM users WHERE id = $id");

    if (!$user) {
      return Flight::notFound();
    }

    $this->db->runQuery("UPDATE users SET name = '$name', email = '$email', password = '$password' WHERE id = $id");

    return Flight::json(['message' => 'User updated successfully']);
  }

  public function deleteUser($id)
  {
    $user = $this->db->fetchRow("SELECT * FROM users WHERE id = $id");

    if (!$user) {
      return Flight::notFound();
    }

    $this->db->runQuery("DELETE FROM users WHERE id = $id");
    return Flight::json(['message' => 'User deleted successfully']);
  }
}
