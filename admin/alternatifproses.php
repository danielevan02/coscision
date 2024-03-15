<?php include 'header.php'; 
if (isset($_GET['proses'])) {
    if ($_GET['proses'] == 'prosestambah') {
    $nama_alternatif=$_POST['nama_kostum'];

    mysqli_query($conn, "INSERT INTO tbl_kostum (nama_kostum, nilai_saw, rangking) VALUES ('$nama_alternatif', '0', '0')");
    header("location:alternatif.php");
    }elseif($_GET['proses']=='prosesubah'){
        $id_alternatif=$_POST['id_kostum'];
        $nama_alternatif=$_POST['nama_kostum'];

        mysqli_query($conn, "UPDATE tbl_kostum SET nama_kostum='$nama_alternatif' WHERE id_kostum='$id_alternatif'");
        header("location:alternatif.php");
    
    }elseif($_GET['proses']=='proseshapus'){
        $id_alternatif=$_GET['id_kostum'];
        mysqli_query($conn, "DELETE FROM tbl_kostum WHERE id_kostum='$id_alternatif'");
        header("location:alternatif.php");
    }
}
?>