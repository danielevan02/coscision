<?php
if(isset($_GET['aksi'])) {
    if($_GET['aksi']=='login'){
        session_start();
        include 'assets/conn/config.php';
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Query untuk melakukan autentikasi login, misalnya
        $query = "SELECT * FROM tbl_akun WHERE username='$username' AND password='$password'";
        
        // Menjalankan query
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc(); // Menggunakan fetch_assoc() untuk mendapatkan baris data hasil query
            
            if($data['level'] == 'Admin'){
                $_SESSION['username'] = $username;
                $_SESSION['level'] = 'Admin';
                header("Location: admin/index.php");
                exit;
            } else {
                // Login gagal
                header("Location: index.php?pesan=gagal");
            }
        }
    }
}
?>


<!DOCTYPE html>
<html>

<head>
    <title>PENERAPAN METODE SAW</title>
    <link rel="stylesheet" type="text/css" href="assets/css/cosmo.min.css">

    <style type="text/css">
        .kotak{
            margin-top: 150px;
            padding-left: 300px;
        }

        .kotak .input-grop{
            margin-left: 20px;

        }
    </style>
</head>

<body>
    <div class="container">
<?php
if(isset($_GET['aksi'])){
    if($_GET['aksi']=='login'){
        echo "<div style='margin-bottom:-1px;' class='alert alert-danger' role='alert'> Login anda gagal, username atau password salah </div>";
    }
}
?>
        <form action="index.php?aksi=login" method="post" enctype="multipart/form-data">
            <div class="col-md-7 col-offset-4 kotak">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" class="form-control" placeholder="username">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" class="form-control" placeholder="password">
            </div>
            <div>
                <input type="submit" name="LOGIN" class="btn btn-primary">
            </div>
            </div>
        </form>
    </div>
</body>

</html>