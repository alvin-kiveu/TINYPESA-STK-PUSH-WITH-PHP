<?php
$amount = '1'; // Amount to transact
$phonenuber = '07XXXXXXXX'; // Phone number paying
$Account_no = 'UMESKIA SOFTWARES'; // Enter account number (optional)
$url = 'https://tinypesa.com/api/v1/express/initialize';
$data = array(
    'amount' => $amount,
    'msisdn' => $phonenuber,
    'account_no' => $Account_no
);
$headers = array(
    'Content-Type: application/x-www-form-urlencoded',
    'ApiKey: XXXXXXXXX' // Replace with your API key
);
$info = http_build_query($data);
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $info);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$resp = curl_exec($curl);
// Check for CURL errors
if ($resp === false) {
    echo "CURL ERROR: " . curl_error($curl);
} else {
    $msg_resp = json_decode($resp);
    // Check if the request was successful
    if ($msg_resp->success == 'true') {
        echo "✔✔ TinyPesa transaction initialized successfully. With request id " . $msg_resp->request_id ."";
    } else {
        // Handle any errors returned by the API
        echo "ERROR: " . $resp;
    }
}

// Close the CURL session
curl_close($curl);
