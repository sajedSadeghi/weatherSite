<?php

require __DIR__ . '/vendor/autoload.php'; // Path to Composer autoloader

$dotenv = Dotenv\Dotenv::createUnsafeImmutable(__DIR__);
$dotenv->load();

$headers = [
    "content-type" => "application/json; charset=UTF-8"
];
$client = new GuzzleHttp\Client();

$apiKey = getenv('API_KEY');
$city = $_POST["city"];

try {
    $response = $client->get("https://api.weatherapi.com/v1/current.json?key={$apiKey}&q={$city}&aqi=no", [
        "headers" => $headers
    ]);
    
    $data = json_encode(json_decode($response->getBody()), JSON_PRETTY_PRINT);
    
    header('Content-Type: application/json');
    echo $data;
} catch (GuzzleHttp\Exception\RequestException $e) {
    // Handle any errors that occur during the API call
    echo $e->getMessage();
}
