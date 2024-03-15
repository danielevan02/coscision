<?php
include 'header.php';
if (isset($_GET['aksi'])) {
    if ($_GET['aksi'] == 'tambah') { ?>
        <div class="container">
            <div class="row">
                <ol class="breadcrumb">
                    <h4>Nilai/ TAMBAH DATA</h4>
                </ol>
            </div>

            <div class="panel panel-container">
                <div class="bootstrap-table">
                    <form action="nilaiproses.php?proses=prosestambah" method="post" enctype="multipart/form-data">

                        <div class="form-group">
                            <label>Nama Alternatif (Kostum)</label>
                            <select class="form-control" name="id_kostum">
                                <option disabled selected>Pilih</option>
                                <?php
                                $b1 = mysqli_query($conn, "SELECT * FROM tbl_kostum ORDER BY id_kostum");
                                while ($b = mysqli_fetch_array($b1)) { ?>
                                    <option value="<?php echo $b['id_kostum'] ?>"><?php echo $b['id_kostum'] ?> - <?php echo $b['nama_kostum'] ?></option>

                                <?php } ?>

                            </select>
                        </div>

                        <?php
                        $hasil = mysqli_query($conn, "SELECT * FROM tbl_kriteria ORDER BY id_kriteria");
                        while ($baris = mysqli_fetch_array($hasil)) {
                            $idK = $baris['id_kriteria'];
                            $labelK = $baris['nama_kriteria'];

                            echo "<div class=form-group><label>" . $labelK . "</label>";

                            echo "<select name=" . $idK . " class=form-control>";

                            $hasil1 = mysqli_query($conn, "SELECT * FROM tbl_subkriteria WHERE id_kriteria='" . $idK . "' ORDER BY nilai_subkriteria DESC");
                            while ($baris1 = mysqli_fetch_array($hasil1)) {
                                echo "<option selected value=" . $baris1['id_subkriteria'] . ">" . $baris1['nama_subkriteria'] . " - (" . $baris1['nilai_subkriteria'] . ") </option>";
                            }

                            echo "</select></div>";
                        }
                        ?>
                        <div class="modal-footer">
                            <a href="nilai.php" class="btn btn-primary">KEMBALI</a>
                            <input type="submit" class="btn btn-success" value="SIMPAN">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    <?php
    } elseif ($_GET['aksi'] == 'ubah') { ?>

        <div class="container">
            <div class="row">
                <ol class="breadcrumb">
                    <h4>NILAI / UBAH DATA</h4>
                </ol>
            </div>

            <div class="panel panel-container">
                <div class="bootstrap-table">

                    <form action="nilaiproses.php?proses=prosesubah" method="post" enctype="multipart/form-data">
                        <div class="form-group">
                            <label>Nama Alternatif (Kostum)</label>
                            <?php
                            $id_alternatif = $_GET['id_kostum'];
                            $a1 = mysqli_query($conn, "SELECT * FROM tbl_kostum WHERE id_kostum='$id_alternatif'");
                            $a = mysqli_fetch_array($a1);
                            ?>
                            <select class="form-control" name="id_kostum">
                                <option selected value="<?php echo $a['id_kostum'] ?>"><?php echo $a['id_kostum'] ?> - <?php echo $a['nama_kostum'] ?></option>
                                <?php
                                $b1 = mysqli_query($conn, "SELECT * FROM tbl_kostum ORDER BY id_kostum");
                                while ($b = mysqli_fetch_array($b1)) { ?>
                                    <option value="<?php echo $b['id_kostum'] ?>"><?php echo $b['id_kostum'] ?> - <?php echo $b['nama_kostum'] ?></option>

                                <?php } ?>

                            </select>
                        </div>

                        <?php
                        $hasil = mysqli_query($conn, "SELECT * FROM tbl_kriteria ORDER BY id_kriteria");
                        while ($baris = mysqli_fetch_array($hasil)) {
                            $idK = $baris['id_kriteria'];
                            $labelK = $baris['nama_kriteria'];
                            $id_alternatif = $_GET['id_kostum'];

                            $hasil2 = mysqli_query($conn, "SELECT * FROM tbl_nilai WHERE id_kriteria='".$idK."' AND id_kostum='".$id_alternatif."'");
                            $result2 = mysqli_fetch_array($hasil2);
                            $sub = $result2['id_subkriteria'];

                            echo "<div class=form-group><label>" . $labelK . "</label>";

                            echo "<select name=" . $idK . " class='form-control'>";

                            $hasil1 = mysqli_query($conn, "SELECT * FROM tbl_subkriteria WHERE id_kriteria='" . $idK . "' ORDER BY nilai_subkriteria DESC");
                            while ($baris1 = mysqli_fetch_array($hasil1)) {

                                if ($baris1['id_subkriteria'] == $sub) {
                                    echo "<option selected value=" . $baris1['id_subkriteria'] . ">" . $baris1['nama_subkriteria'] . " - (" . $baris1['nilai_subkriteria'] . ") </option>";
                                } else {
                                    echo "<option selected value=" . $baris1['id_subkriteria'] . ">" . $baris1['nama_subkriteria'] . " - (" . $baris1['nilai_subkriteria'] . ") </option>";
                                }
                            }

                            echo "</select></div>";
                        }
                        ?>

                        <div class="modal-footer">
                            <a href="nilai.php" class="btn btn-primary">KEMBALI</a>
                            <input type="submit" class="btn btn-success" value="UBAH">
                        </div>
                    </form>

                </div>
            </div>
        </div>
<?php }
} ?>