<?php
session_start();
error_reporting(0);
include '../assets/conn/config.php';
include '../assets/conn/cek.php';
?>

<!DOCTYPE html>
<html>

<head>
    <title>PENERAPAN METODE SAW</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/cosmo.min.css">
</head>

<body>
    <nav class="navbar navbar-inverse navbar-static-top">
        <div class="container">
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="index.php">HOME</a></li>
                    <li><a href="alternatif.php">ALTERNATIF</a></li>
                    <li><a href="kriteria.php">KRITERIA</a></li>
                    <li><a href="nilai.php">NILAI</a></li>
                    <li><a href="metode.php">METODE</a></li>
                    <li><a href="hasil.php">HASIL ANALISA</a></li>
                    <li><a href="logout.php">LOG OUT</a></li>
                </ul>
            </div>
        </div>
    </nav>
</body>

</html>