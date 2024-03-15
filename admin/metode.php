<?php
include 'header.php';
?>

<div class="container">
    <div class="row">
        <ol class="breadcrumb">
            <h4>METODE</h4>
        </ol>
    </div>

    <div class="panel panel-container">
        <div class="bootstrap-table">
            <h4>Nilai Keputusan</h4>
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
                            </tr>

                        <?php } ?>
                    </tbody>
                </table>
            </div>

            <h4>Konversi Nilai Keputusan</h4>
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
                                $query1 = mysqli_query($conn, "SELECT a.nilai_subkriteria AS sub FROM tbl_subkriteria a, tbl_nilai b WHERE b.id_kostum='" . $kode . "'AND a.id_subkriteria=b.id_subkriteria ORDER BY b.id_kriteria");
                                while ($result = mysqli_fetch_array($query1)) {
                                    echo "<td class='text-center'>$result[sub]</td>";
                                }
                                ?>
                            </tr>

                        <?php } ?>
                    </tbody>
                    <tr>
                        <!--Mencari Nilai MAX -->
                        <td colspan="2">Nilai Max</td>
                        <?php
                        $query = mysqli_query($conn, "SELECT * FROM tbl_kriteria ORDER BY id_kriteria");
                        while ($b = mysqli_fetch_array($query)) {
                            echo "<td class='text-center'><b>";
                            $query1 = mysqli_query($conn, "SELECT MAX(s.nilai_subkriteria) AS nmax FROM tbl_subkriteria s, tbl_nilai kp WHERE kp.id_kriteria='" . $b['id_kriteria'] . "' AND s.id_subkriteria=kp.id_subkriteria");
                            $result1 = mysqli_fetch_array($query1);
                            echo $result1['nmax'];
                            echo "</b></td>";
                        }
                        ?>
                    </tr>

                    <tr>
                        <!--Mencari Nilai MIN -->
                        <td colspan="2">Nilai Min</td>
                        <?php
                        $query = mysqli_query($conn, "SELECT * FROM tbl_kriteria ORDER BY id_kriteria");
                        while ($b = mysqli_fetch_array($query)) {
                            echo "<td class='text-center'><b>";
                            $query1 = mysqli_query($conn, "SELECT MIN(s.nilai_subkriteria) AS nmin FROM tbl_subkriteria s, tbl_nilai kp WHERE kp.id_kriteria='" . $b['id_kriteria'] . "' AND s.id_subkriteria=kp.id_subkriteria");
                            $result1 = mysqli_fetch_array($query1);
                            echo $result1['nmin'];
                            echo "</b></td>";
                        }
                        ?>
                    </tr>

                </table>
            </div>

            <h4>Normalisasi Matriks</h4>
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
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $data = mysqli_query($conn, "SELECT * FROM tbl_kostum ORDER BY id_kostum");
                        $no = 1;
                        while ($a = mysqli_fetch_array($data)) {
                            $nomor = $no++;
                            $kode = $a['id_kostum'];
                            $nama = $a['nama_kostum'];

                            echo "<tr>";
                            echo "<td class='text-center'>$nomor</td><td class='text-center'>$nama</td>";

                            $query1 = mysqli_query($conn, "SELECT s.nilai_subkriteria AS sub, kp.id_kriteria AS id_kriteria, k.tipe_kriteria AS atribut FROM tbl_subkriteria s, tbl_nilai kp, tbl_kriteria k WHERE kp.id_kostum='$kode' AND s.id_subkriteria=kp.id_subkriteria AND k.id_kriteria=kp.id_kriteria ORDER BY kp.id_kriteria");
                            while ($result = mysqli_fetch_array($query1)) {

                                // Untuk memanggil nilai Max
                                $query2 = mysqli_query($conn, "SELECT MAX(s.nilai_subkriteria) AS nmax FROM tbl_subkriteria s, tbl_nilai kp WHERE kp.id_kriteria='" . $result['id_kriteria'] . "' AND s.id_subkriteria=kp.id_subkriteria");
                                $result2 = mysqli_fetch_array($query2);
                                $tmax = $result2['nmax'];

                                // Untuk memanggil nilai Min
                                $query3 = mysqli_query($conn, "SELECT MIN(s.nilai_subkriteria) AS nmin FROM tbl_subkriteria s, tbl_nilai kp WHERE kp.id_kriteria='" . $result['id_kriteria'] . "' AND s.id_subkriteria=kp.id_subkriteria");
                                $result3 = mysqli_fetch_array($query3);
                                $tmin = $result3['nmin'];

                                // Membuat keputusan berdasarkan tipe kriterianya
                                if ($tmax != 0 && $tmin != 0) {
                                    if ($result['atribut'] == 'Benefit') {
                                        $val = $result['sub'] / $tmax;
                                    } else {
                                        $val = $tmin / $result['sub'];
                                    }

                                    $val = round($val, 2);
                                } else {
                                    // Penanganan jika terjadi pembagian oleh nol
                                    $val = "Undefined";
                                }

                                echo "<td class='text-center'>$val</td>";
                            }
                            echo "</tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div>

            <h4>Normalisasi Bobot</h4>
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
                                <th class="text-center">Nilai Vi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $data = mysqli_query($conn, "SELECT * FROM tbl_kostum ORDER BY id_kostum");
                            $no = 1;
                            while ($a = mysqli_fetch_array($data)) {
                                $vi = 0;
                                $nomor = $no++;
                                $kode = $a['id_kostum'];
                                $nama = $a['nama_kostum'];

                                echo "<tr>";
                                echo "<td class='text-center'>$nomor</td><td class='text-center'>$nama</td>";

                                $query1 = mysqli_query($conn, "SELECT s.nilai_subkriteria AS sub, kp.id_kriteria AS id_kriteria, k.tipe_kriteria AS atribut FROM tbl_subkriteria s, tbl_nilai kp, tbl_kriteria k WHERE kp.id_kostum='$kode' AND s.id_subkriteria=kp.id_subkriteria AND k.id_kriteria=kp.id_kriteria ORDER BY kp.id_kriteria");
                                while ($result = mysqli_fetch_array($query1)) {
                                    // Untuk memanggil nilai Max
                                    $query2 = mysqli_query($conn, "SELECT MAX(s.nilai_subkriteria) AS nmax FROM tbl_subkriteria s, tbl_nilai kp WHERE kp.id_kriteria='" . $result['id_kriteria'] . "' AND s.id_subkriteria=kp.id_subkriteria");
                                    $result2 = mysqli_fetch_array($query2);
                                    $tmax = $result2['nmax'];

                                    // Untuk memanggil nilai Min
                                    $query3 = mysqli_query($conn, "SELECT MIN(s.nilai_subkriteria) AS nmin FROM tbl_subkriteria s, tbl_nilai kp WHERE kp.id_kriteria='" . $result['id_kriteria'] . "' AND s.id_subkriteria=kp.id_subkriteria");
                                    $result3 = mysqli_fetch_array($query3);
                                    $tmin = $result3['nmin'];

                                    // Membuat keputusan berdasarkan tipe kriterianya
                                    if ($tmax != 0 && $tmin != 0) {
                                        if ($result['atribut'] == 'Benefit') {
                                            $val = $result['sub'] / $tmax;
                                        } else {
                                            $val = $tmin / $result['sub'];
                                        }

                                        $val = round($val, 2);

                                        // Panggil nilai bobot
                                        $query4 = mysqli_query($conn, "SELECT bobot_kriteria FROM tbl_kriteria WHERE id_kriteria='" . $result['id_kriteria'] . "'");
                                        $result4 = mysqli_fetch_array($query4);

                                        // Normalisasikan bobot
                                        $bobot_k = $result4['bobot_kriteria'] / 100;

                                        // Perkalian bobot
                                        $valbobot = ($val * $bobot_k);
                                        $nbobot = round($valbobot, 2);

                                        $vi += $valbobot;

                                        // Tampilkan dengan dua angka di belakang koma
                                        $nbobot_formatted = number_format($nbobot, 3);

                                        echo "<td class='text-center'>" . $nbobot_formatted . "</td>";
                                    }
                                    
                                }

                                // Tampilkan nilai Vi dengan dua angka di belakang koma
                                $vi_formatted = number_format($vi, 3);
                                echo "<td class='text-center'>" . $vi_formatted . "</td>";

                                // Simpan nilai SAW ke database
                                $result = mysqli_query($conn, "UPDATE tbl_kostum SET nilai_saw='$vi' WHERE id_kostum='$kode'");
                                if (!$result) {
                                    die('Error: ' . mysqli_error($conn)); // Tampilkan pesan error jika query gagal
                                }

                                echo "</tr>";
                            }
                            ?>
                        </tbody>
                    </table>
                </div>

                <?php
                // Set rangking
                mysqli_query($conn, "SET @rank=0;");
                mysqli_query($conn, "UPDATE tbl_kostum SET rangking= @rank:= (@rank+1) ORDER BY nilai_saw DESC");
                ?>
        </div>