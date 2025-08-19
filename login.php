<?php
	session_start();
	
	// Check if user is already logged in
	if (isset($_SESSION['loggedIn'])) {
		header('Location: index.php');
		exit();
	}
	
	require_once('inc/config/constants.php');
	require_once('inc/config/db.php');
	require_once('inc/header.html');
?>
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'YOUR_TRACKING_ID');
</script>
<!-- End Google Analytics -->
<style type="text/css">
  body {
    display: flex;
    flex-direction: row; /* Changed from column to row for landscape layout */
    min-height: 100vh;
    margin: 0;
    font-family: Arial, sans-serif;
    background: url('assets/img/shopping.jpg') no-repeat center center fixed; /* Use a valid relative path */
    background-size: cover; /* Ensure the image covers the entire background */
    color: #333;
  }
  .content-wrapper {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: row; /* Changed from column to row */
    align-items: flex-start; /* Align content to the top */
    justify-content: center; /* Center content horizontally */
  }
  .header {
    text-align: center;
    margin-right: 20px; /* Add spacing between header and form */
  }
  .login-form-bx {
    display: flex;
    justify-content: flex-start; /* Align forms to the left */
    align-items: center; /* Center forms vertically */
    flex-direction: column;
    width: 100%; /* Ensure it spans the container */
    max-width: 600px; /* Limit the width for better readability */
  }
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    width: 100%; /* Ensure cards take full width of the container */
  }
  .card-header {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
    color: #0066FF;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-group label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-right: 10px;
  }
  .btn-primary {
    background-color: #007bff;
    color: #fff;
  }
  .btn-success {
    background-color: #28a745;
    color: #fff;
  }
  .btn-warning {
    background-color: #ffc107;
    color: #fff;
  }
  .btn:hover {
    opacity: 0.9;
  }
  .footer {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #006400;
    color: #fff;
    text-align: center;
  }
</style>
<body>
  <div class="content-wrapper">
    <div class="header">
      <a class="login-logo" href="">
        <img src="assets/img/log.jpg" alt="Logo" height="150px" width="auto">
      </a>
      <h3>Welcome to Kilo Retail Inventory Management</h3>
    </div>
    <div class="login-form-bx">
      <div class="row">
        <div class="col-md-8">
          <div class="authincation-content">
            <?php
            $action = isset($_GET['action']) ? $_GET['action'] : '';
            if ($action == 'register') {
            ?>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-sm-12 col-md-5 col-lg-5">
                  <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                      <form action="">
                        <div id="registerMessage"></div>
                        <div class="form-group">
                          <label for="registerFullName">Name<span class="requiredIcon">*</span></label>
                          <input type="text" class="form-control" id="registerFullName" name="registerFullName">
                        </div>
                        <div class="form-group">
                          <label for="registerUsername">Username<span class="requiredIcon">*</span></label>
                          <input type="email" class="form-control" id="registerUsername" name="registerUsername" autocomplete="on">
                        </div>
                        <div class="form-group">
                          <label for="registerPassword1">Password<span class="requiredIcon">*</span></label>
                          <input type="password" class="form-control" id="registerPassword1" name="registerPassword1">
                          <input type="checkbox" id="toggleRegisterPassword1" onclick="togglePasswordVisibility('registerPassword1')"> Show Password
                        </div>
                        <div class="form-group">
                          <label for="registerPassword2">Re-enter password<span class="requiredIcon">*</span></label>
                          <input type="password" class="form-control" id="registerPassword2" name="registerPassword2">
                          <input type="checkbox" id="toggleRegisterPassword2" onclick="togglePasswordVisibility('registerPassword2')"> Show Password
                        </div>
                        <a href="login.php" class="btn btn-primary">Login</a>
                        <button type="button" id="register" class="btn btn-success">Register</button>
                        <a href="login.php?action=resetPassword" class="btn btn-warning">Reset Password</a>
                        <button type="reset" class="btn">Clear</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <?php
              require 'inc/footer.php';
              echo '</body></html>';
              exit();
            } elseif ($action == 'resetPassword') {
            ?>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-sm-12 col-md-5 col-lg-5">
                  <div class="card">
                    <div class="card-header">Reset Password</div>
                    <div class="card-body">
                      <form action="">
                        <div id="resetPasswordMessage"></div>
                        <div class="form-group">
                          <label for="resetPasswordUsername">Username</label>
                          <input type="text" class="form-control" id="resetPasswordUsername" name="resetPasswordUsername">
                        </div>
                        <div class="form-group">
                          <label for="resetPasswordPassword1">New Password</label>
                          <input type="password" class="form-control" id="resetPasswordPassword1" name="resetPasswordPassword1">
                          <input type="checkbox" id="toggleResetPassword1" onclick="togglePasswordVisibility('resetPasswordPassword1')"> Show Password
                        </div>
                        <div class="form-group">
                          <label for="resetPasswordPassword2">Confirm New Password</label>
                          <input type="password" class="form-control" id="resetPasswordPassword2" name="resetPasswordPassword2">
                          <input type="checkbox" id="toggleResetPassword2" onclick="togglePasswordVisibility('resetPasswordPassword2')"> Show Password
                        </div>
                        <a href="login.php" class="btn btn-primary">Login</a>
                        <a href="login.php?action=register" class="btn btn-success">Register</a>
                        <button type="button" id="resetPasswordButton" class="btn btn-warning">Reset Password</button>
                        <button type="reset" class="btn">Clear</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <?php
              require 'inc/footer.php';
              echo '</body></html>';
              exit();
            }
            ?>
            <!-- Default Page Content (login form) -->
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-sm-12 col-md-5 col-lg-5">
                  <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                      <form action="">
                        <div id="loginMessage"></div>
                        <div class="form-group">
                          <label for="loginUsername">Username</label>
                          <input type="text" class="form-control" id="loginUsername" name="loginUsername">
                        </div>
                        <div class="form-group">
                          <label for="loginPassword">Password</label>
                          <input type="password" class="form-control" id="loginPassword" name="loginPassword">
                          <input type="checkbox" id="toggleLoginPassword" onclick="togglePasswordVisibility('loginPassword')"> Show Password
                        </div>
                        <button type="button" id="login" class="btn btn-primary">Login</button>
                        <a href="login.php?action=resetPassword" class="btn btn-warning">Reset Password</a>
                        <button type="reset" class="btn">Clear</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <?php require 'inc/footer.php'; ?>
  </div>
<script>
function togglePasswordVisibility(fieldId) {
	const passwordField = document.getElementById(fieldId);
	passwordField.type = passwordField.type === "password" ? "text" : "password";
}
</script>
</body>
</html>
