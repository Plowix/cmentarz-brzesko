<?php
function getPersonDate($data, $birthOrDeath) {
    $year = $birthOrDeath ? ($data['birth_year'] ?? "0000") : ($data['death_year'] ?? "0000");
    $month = $birthOrDeath ? ($data['birth_month'] ?? "00") : ($data['death_month'] ?? "00");
    $day = $birthOrDeath ? ($data['birth_day'] ?? "00") : ($data['death_day'] ?? "00");

    $month = str_pad($month, 2, "0", STR_PAD_LEFT);
    $day = str_pad($day, 2, "0", STR_PAD_LEFT);

    return implode('-', [$year, $month, $day]);
}
?>