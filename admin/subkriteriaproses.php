<?php include 'header.php';
if (isset($_GET['proses'])) {
    if ($_GET['proses'] == 'prosestambah') {
        $id_kriteria = $_POST['id_kriteria'];
        $nama_subkriteria = $_POST['nama_subkriteria'];
        $nilai_subkriteria = $_POST['nilai_subkriteria'];

        mysqli_query($conn, "INSERT INTO tbl_subkriteria (id_kriteria,nama_subkriteria,nilai_subkriteria) VALUES ('$id_kriteria', '$nama_subkriteria', '$nilai_subkriteria')");
        header("location:subkriteria.php?id_kriteria=$_POST[id_kriteria]");
        
    } elseif ($_GET['proses'] == 'prosesubah') {
        $id_subkriteria = $_POST['id_subkriteria'];
        $id_kriteria = $_POST['id_kriteria'];
        $nama_subkriteria = $_POST['nama_subkriteria'];
        $nilai_subkriteria = $_POST['nilai_subkriteria'];

        mysqli_query($conn, "UPDATE tbl_subkriteria SET id_kriteria='$id_kriteria', nama_subkriteria='$nama_subkriteria', nilai_subkriteria='$nilai_subkriteria' WHERE id_subkriteria='$id_subkriteria'");
        header("location:subkriteria.php?id_kriteria=$_POST[id_kriteria]");

    } elseif ($_GET['proses'] == 'proseshapus') {
        $id_subkriteria = $_GET['id_subkriteria'];
        $id_kriteria = $_GET['id_kriteria'];
        
        mysqli_query($conn, "DELETE FROM tbl_subkriteria WHERE id_subkriteria='$id_subkriteria'");
        header("location:subkriteria.php?id_kriteria=$_GET[id_kriteria]");
    }
}
?>
