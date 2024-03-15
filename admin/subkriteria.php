<?php
include 'header.php';
?>

<div class="container">
    <div class="row"><?php
        $data = $conn->query("SELECT * FROM tbl_kriteria WHERE id_kriteria='$_GET[id_kriteria]'");
        $a = mysqli_fetch_array($data);?>
        <ol class="breadcrumb">
            <h4>SUBKRITERIA / <a href="kriteria.php"><?php echo $a['nama_kriteria']?></a></h4>
        </ol>
    </div>

    <div class="panel panel-container">
        <div class="bootstrap-table">
            <a href="subkriteriaaksi.php?aksi=tambah&id_kriteria=<?php echo $_GET['id_kriteria'] ?>" class="btn btn-primary">TAMBAH DATA</a>
            <hr>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center">No</th>
                            <th class="text-center">Nama Subkriteria</th>
                            <th class="text-center">Nilai</th>
                            <th class="text-center">Opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $data = $conn->query("SELECT * FROM tbl_kriteria AS a, tbl_subkriteria AS b WHERE a.id_kriteria=b.id_kriteria AND b.id_kriteria='$_GET[id_kriteria]' ORDER BY b.id_subkriteria");
                        $no = 1;
                        while ($a = mysqli_fetch_array($data)) { ?>
                            <tr>
                                <td class="text-center"><?php echo $no++ ?></td>
                                <td class="text-center"><?php echo $a['nama_subkriteria']; ?></td>
                                <td class="text-center"><?php echo $a['nilai_subkriteria'];?></td>

                                <td class="text-center">
                                    <a href="subkriteriaaksi.php?id_kriteria=<?php echo $a['id_kriteria']; ?>&id_subkriteria=<?php echo $a['id_subkriteria']; ?>&aksi=ubah" class="btn btn-success">UBAH</a>
                                    <a href="subkriteriaproses.php?id_kriteria=<?php echo $a['id_kriteria']; ?>&id_subkriteria=<?php echo $a['id_subkriteria']; ?>&proses=proseshapus" class="btn btn-danger">HAPUS</a>
                                </td>
                            </tr>
                            
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>