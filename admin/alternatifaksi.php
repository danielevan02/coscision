<?php
include 'header.php';
if (isset($_GET['aksi'])) {
    if ($_GET['aksi'] == 'tambah') { ?>
        <div class="container">
            <div class="row">
                <ol class="breadcrumb">
                    <h4>ALTERNATIF TAMBAH DATA</h4>
                </ol>
            </div>

            <div class="panel panel-container">
                <div class="bootstrap-table">
                    <form action="alternatifproses.php?proses=prosestambah" method="post" enctype="multipart/form-data">
                        <div class="form-group">
                            <label>Nama Alternatif (Kostum)</label>
                            <input type="text" name="nama_kostum" class="form-control" placeholder="Nama Kostum">
                        </div>

                        <div class="modal-footer">
                            <a href="alternatif.php" class="btn btn-primary">KEMBALI</a>
                            <input type="submit" class="btn btn-success" value="SIMPAN">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    <?php 
} 
    elseif ($_GET['aksi'] == 'ubah') { ?>

        <div class="container">
            <div class="row">
                <ol class="breadcrumb">
                    <h4>ALTERNATIF UBAH DATA</h4>
                </ol>
            </div>

            <div class="panel panel-container">
                <div class="bootstrap-table">

                    <?php
                    $data = $conn->query("SELECT * FROM tbl_kostum WHERE id_kostum='$_GET[id_kostum]'");
                    while ($a = mysqli_fetch_array($data)) {
                    ?>
                        <form action="alternatifproses.php?proses=prosesubah" method="post" enctype="multipart/form-data">
                            <input type="hidden" name="id_kostum" value="<?php echo $a['id_kostum']; ?>">

                            <div class="form-group">
                                <label>Nama Alternatif (Kostum)</label>
                                <input type="text" name="nama_kostum" class="form-control" placeholder="Nama Kostum" value="<?php echo $a['nama_kostum']; ?>">
                            </div>

                            <div class="modal-footer">
                                <a href="alternatif.php" class="btn btn-primary">KEMBALI</a>
                                <input type="submit" class="btn btn-success" value="UBAH">
                            </div>
                        </form>
                    <?php } ?>
                </div>
            </div>
        </div>
<?php } } ?>