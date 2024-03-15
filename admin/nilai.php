<?php
include 'header.php';
?>

<div class="container">
    <div class="row">
        <ol class="breadcrumb">
            <h4>NILAI</h4>
        </ol>
    </div>

    <div class="panel panel-container">
        <div class="bootstrap-table">
            <a href="nilaiaksi.php?aksi=tambah" class="btn btn-primary">TAMBAH DATA</a>
            <hr>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center">No</th>
                            <th class="text-center">Nama Alternatif (Kostum)</th>
                            <?php
                            $query = mysqli_query($conn, "SELECT * FROM tbl_kriteria");
                            while ($b = mysqli_fetch_array($query)) {
                                echo "<th class='text-center'>$b[nama_kriteria]</th>";
                            }
                            ?>


                            <th class="text-center">Opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $data = $conn->query("SELECT * FROM tbl_kostum ORDER BY id_kostum");
                        $no = 1;
                        while ($a = mysqli_fetch_array($data)) {
                        ?>
                            <tr>

                                <?php
                                $nomor = $no++;
                                $kode = $a['id_kostum'];
                                $nama = $a['nama_kostum'];

                                echo "<td class='text-center'>$nomor</td><td class='text-center'>$nama</td>";

                                // Bisa pakai a.nama_subkriteria atau a.nilai_subkriteria
                                $query1 = mysqli_query($conn, "SELECT a.nama_subkriteria AS sub FROM tbl_subkriteria a, tbl_nilai b WHERE b.id_kostum='" . $kode . "'AND a.id_subkriteria=b.id_subkriteria ORDER BY b.id_kriteria");
                                while ($result = mysqli_fetch_array($query1)) {
                                    echo "<td class='text-center'>$result[sub]</td>";
                                }
                                ?>


                                <td class="text-center">
                                    <a href="nilaiaksi.php?id_kostum=<?php echo $a['id_kostum']; ?>&aksi=ubah" class="btn btn-success">UBAH</a>
                                    <a href="nilaiproses.php?id_kostum=<?php echo $a['id_kostum']; ?>&proses=proseshapus" class="btn btn-danger">HAPUS</a>
                                </td>
                            </tr>

                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>