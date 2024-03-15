<?php
include 'header.php';
?>

<div class="container">
    <div class="row">
        <ol class="breadcrumb">
            <h4>Hasil Analisa Metode SAW</h4>
        </ol>
    </div>

    <h4>Hasil Analisa</h4>
    <div class="panel panel-container">
        <div class="bootstrap-table">
            <hr>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center">No</th>
                            <th class="text-center">Nama Alternatif (Kostum)</th>
                            <th class="text-center">Nilai SAW</th>
                            <th class="text-center">Rangking</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $data = $conn->query("SELECT * FROM tbl_kostum ORDER BY rangking");
                        $no = 1;
                        while ($a = mysqli_fetch_array($data)) {
                        ?>
                            <tr>
                                <td class="text-center"><?php echo $no++ ?></td>
                                <td class="text-center"><?php echo $a['nama_kostum']; ?></td>
                                <td class="text-center"><?php echo number_format($a['nilai_saw'], 3);
                                                        ?></td>
                                <td class="text-center"><?php echo $a['rangking']; ?></td>

                            </tr>

                        <?php } ?>
                    </tbody>
                </table>
            </div>


        </div>
    </div>

</div>