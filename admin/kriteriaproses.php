<?php include 'header.php'; 
if (isset($_GET['proses'])) {
    if ($_GET['proses'] == 'prosestambah') {
    $nama_kriteria=$_POST['nama_kriteria'];
    $bobot_kriteria=$_POST['bobot_kriteria'];
    $tipe_kriteria=$_POST['tipe_kriteria'];

    mysqli_query($conn, "INSERT INTO tbl_kriteria (nama_kriteria, bobot_kriteria, tipe_kriteria) VALUES ('$nama_kriteria', '$bobot_kriteria', '$tipe_kriteria')");
    header("location:kriteria.php");
    }elseif($_GET['proses']=='prosesubah'){
        $id_kriteria=$_POST['id_kriteria'];
        $nama_kriteria=$_POST['nama_kriteria'];
        $bobot_kriteria=$_POST['bobot_kriteria'];
        $tipe_kriteria=$_POST['tipe_kriteria'];

        mysqli_query($conn, "UPDATE tbl_kriteria SET nama_kriteria='$nama_kriteria', bobot_kriteria='$bobot_kriteria', tipe_kriteria='$tipe_kriteria' WHERE id_kriteria='$id_kriteria'");
        header("location:kriteria.php");
    
    }elseif($_GET['proses']=='proseshapus'){
        $id_kriteria=$_GET['id_kriteria'];
        mysqli_query($conn, "DELETE FROM tbl_kriteria WHERE id_kriteria='$id_kriteria'");
        mysqli_query($conn, "DELETE FROM tbl_subkriteria WHERE id_kriteria='$id_kriteria'");
        header("location:kriteria.php");
    }
}
?>