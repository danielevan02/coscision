<?php
include 'header.php';
?>

<div class="container">
    <div class="row">
        <ol class="breadcrumb">
            <h4>ALTERNATIF (KOSTUM)</h4>
        </ol>
    </div>

    <div class="panel panel-container">
        <div class="bootstrap-table">
            <a href="alternatifaksi.php?aksi=tambah" class="btn btn-primary">TAMBAH DATA</a>
            <hr>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center">No</th>
                            <th class="text-center">Nama Alternatif (Kostum)</th>
                            <th class="text-center">Nilai SAW</th>
                            <th class="text-center">Rangking</th>
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
                                <td class="text-center"><?php echo $no++ ?></td>
                                <td class="text-center"><?php echo $a['nama_kostum']; ?></td>
                                <td class="text-center"><?php echo number_format($a['nilai_saw'], 3);
                                ?></td>
                                <td class="text-center"><?php echo $a['rangking']; ?></td>

                                <td class="text-center">
                                    <a href="alternatifaksi.php?id_kostum=<?php echo $a['id_kostum']; ?>&aksi=ubah" class="btn btn-success">UBAH</a>
                                    <a href="alternatifproses.php?id_kostum=<?php echo $a['id_kostum']; ?>&proses=proseshapus" class="btn btn-danger">HAPUS</a>
                                </td>
                            </tr>
                            
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>