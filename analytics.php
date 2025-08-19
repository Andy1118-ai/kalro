<?php
// Database connection
$conn = new mysqli("127.0.0.1", "root", "", "shop_inventory");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch sales data dynamically
$salesQuery = "SELECT itemName, SUM(quantity) AS totalSold FROM sale GROUP BY itemName";
$salesResult = $conn->query($salesQuery);
$salesData = [];
while ($row = $salesResult->fetch_assoc()) {
    $salesData[] = $row;
}

// Fetch stock data dynamically
$stockQuery = "SELECT itemName, stock FROM item";
$stockResult = $conn->query($stockQuery);
$stockData = [];
while ($row = $stockResult->fetch_assoc()) {
    $stockData[] = $row;
}

// Fetch staff data dynamically
$staffQuery = "SELECT role, COUNT(*) AS totalStaff FROM staff GROUP BY role";
$staffResult = $conn->query($staffQuery);
$staffData = [];
while ($row = $staffResult->fetch_assoc()) {
    $staffData[] = $row;
}

// Encode data for JavaScript
$salesDataJson = json_encode($salesData);
$stockDataJson = json_encode($stockData);
$staffDataJson = json_encode($staffData);

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Business Analytics</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>Business Analytics</h1>

    <h2>Sales Data</h2>
    <canvas id="salesChart" style="max-width: 400px; max-height: 300px;"></canvas>

    <h2>Stock Data</h2>
    <canvas id="stockChart" style="max-width: 400px; max-height: 300px;"></canvas>

    <h2>Staff Data</h2>
    <canvas id="staffChart" style="max-width: 400px; max-height: 300px;"></canvas>

    <script>
        // Sales Chart
        const salesData = <?php echo $salesDataJson; ?>;
        const salesLabels = salesData.map(data => data.itemName);
        const salesValues = salesData.map(data => data.totalSold);

        new Chart(document.getElementById('salesChart'), {
            type: 'bar',
            data: {
                labels: salesLabels,
                datasets: [{
                    label: 'Total Sold',
                    data: salesValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Stock Chart
        const stockData = <?php echo $stockDataJson; ?>;
        const stockLabels = stockData.map(data => data.itemName);
        const stockValues = stockData.map(data => data.stock);

        new Chart(document.getElementById('stockChart'), {
            type: 'pie',
            data: {
                labels: stockLabels,
                datasets: [{
                    label: 'Stock',
                    data: stockValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });

        // Staff Chart
        const staffData = <?php echo $staffDataJson; ?>;
        const staffLabels = staffData.map(data => data.role);
        const staffValues = staffData.map(data => data.totalStaff);

        new Chart(document.getElementById('staffChart'), {
            type: 'doughnut',
            data: {
                labels: staffLabels,
                datasets: [{
                    label: 'Staff Distribution',
                    data: staffValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    </script>
</body>
</html>
