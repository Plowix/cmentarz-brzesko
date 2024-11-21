<?php
function getPersonDate($data, $birthOrDeath) {
    $year = $birthOrDeath ? ($data['birth_year'] ?? "0000") : ($data['death_year'] ?? "0000");
    $month = $birthOrDeath ? ($data['birth_month'] ?? "00") : ($data['death_month'] ?? "00");
    $day = $birthOrDeath ? ($data['birth_day'] ?? "00") : ($data['death_day'] ?? "00");

    return implode('-', [$year, $month, $day]);
}
?>