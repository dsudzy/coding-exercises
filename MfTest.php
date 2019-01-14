<?php

// Write a PHP and JS function that returns whether the first character in a string is alphanumeric
function isFirstCharAlphanumeric($string)
{
    // dont accept anything that is not a string
    if (gettype($string) != 'string') {
        return false;
    }
    // get frist character of string
    $firstChar = $string[0];
    // return if first character is alphanumeric
    return preg_match('/^[0-9a-zA-Z]+/', $firstChar);
}

// Write PHP code that can read data from a large CSV file. The CSV file has headers with two columns: "label","value". Then each row has a label and a numeric value. The script should read from the CSV file and aggregate the "value" per "label", ie. it should output a CSV with one row per label showing the sum of the values.
function getRows()
{
    // in a more production environment I would use .env variables for server configuration data
    $servername = getenv('servername');
    $username = getenv('username');
    $password = getenv('password');
    $dbname = getenv('dbname');
    $connection = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    } 

    $sql = "SELECT id, first_name, last_name FROM users";
    $results = $connection->query($sql);
    return $results;
}

// Write PHP code that can read data from a large CSV file. The CSV file has headers with two columns: "label","value". Then each row has a label and a numeric value. The script should read from the CSV file and aggregate the "value" per "label", ie. it should output a CSV with one row per label showing the sum of the values.
function parseCsv($inputFile)
{
    $sum = [];
    $header = true;
    if (($handle = fopen($inputFile, 'r')) !== FALSE) {
        // call fgets to remove the headers
        $header = fgets($handle);
        // use fgets because it is more memory efficient than fgetcsv
        while (($line = fgets($handle)) !== false) {
            $data = str_getcsv($line);
            if (isset($sum[$data[0]])) {
                $sum[$data[0]] = $sum[$data[0]] + $data[1];
            } else {
                $sum[$data[0]] = $data[1];
            }
        }
        fclose($handle);
    }

    $outputFile = fopen('exampleOutput.csv','w');
    fputcsv($outputFile, ['label', 'value']);
    foreach ($sum as $key => $line) {
        fputcsv($outputFile, [$key, $line]);
    }
    fclose($outputFile);
}

?>