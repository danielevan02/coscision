<?php include 'header.php';
if (isset($_GET['proses'])) {
    if ($_GET['proses'] == 'prosestambah') {
        $id_alternatif = $_POST['id_kostum'];

        $hasil = mysqli_query($conn, "SELECT * FROM tbl_kriteria ORDER BY id_kriteria");
        while ($baris = mysqli_fetch_array($hasil)) {
            $idK = $baris['id_kriteria'];
            $idS = $_POST[$idK];

            $query = "INSERT INTO tbl_nilai(id_kostum, id_kriteria, id_subkriteria) VALUES ('" . $id_alternatif . "', '" . $idK . "', '" . $idS . "')";
            $result = mysqli_query($conn, $query);
        }

        header("location:nilai.php");
    } elseif ($_GET['proses'] == 'prosesubah') {
        $id_alternatif = $_POST['id_kostum'];

        $query1 = "DELETE FROM tbl_nilai WHERE id_kostum='".$_POST['id_kostum']."'";
        $result1 = mysqli_query($conn, $query1);

        $hasil = mysqli_query($conn, "SELECT * FROM tbl_kriteria ORDER BY id_kriteria");
        while ($baris = mysqli_fetch_array($hasil)) {
            $idK = $baris['id_kriteria'];
            $idS = $_POST[$idK];

            $query = "INSERT INTO tbl_nilai(id_kostum, id_kriteria, id_subkriteria) VALUES ('" . $id_alternatif . "', '" . $idK . "', '" . $idS . "')";
            $result = mysqli_query($conn, $query);
        }

        header("location:nilai.php");
    } elseif ($_GET['proses'] == 'proseshapus') {
        $id_alternatif = $_GET['id_kostum'];
        mysqli_query($conn, "DELETE FROM tbl_nilai WHERE id_kostum='$id_alternatif'");
        header("location:nilai.php");
    }
}
