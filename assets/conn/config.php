<?php
// error_reporting(E_ERROR);
$host = "localhost";
$user = "root";
$pass = "";
$db = "dbcosplay";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}