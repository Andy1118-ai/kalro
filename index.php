<?php
      session_start();
    // Redirect the user to login page if he is not logged in.
    if(!isset($_SESSION['loggedIn'])){
        header('Location: login.php');
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
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_TRACKING_ID');
</script>
<!-- End Google Analytics -->
  <style>
    body {
      background-image: url('https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fshopping&psig=AOvVaw23WXDS8-ImKlMbm_3V0uQe&ust=1744996026613000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMj7yffG34wDFQAAAAAdAAAAABAS'); /* Updated to absolute path */
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
    .notification-icon {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: red;
      color: white;
      padding: 10px;
      border-radius: 50%;
      display: none; /* Hidden by default */
      z-index: 1000;
    }
  </style>
  <body>
<?php
    require 'inc/navigation.php';
?>
    <div id="lowStockNotification" class="notification-icon">
      ⚠️ Low Stock
    </div>
    <!-- Page Content -->
    <div class="container-fluid">
	  <div class="row">
		<div class="col-lg-2">
		<h1 class="my-4"></h1>
			<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
			  <a class="nav-link active" id="v-pills-item-tab" data-toggle="pill" href="#v-pills-item" role="tab" aria-controls="v-pills-item" aria-selected="true">Item</a>
			  <a class="nav-link" id="v-pills-purchase-tab" data-toggle="pill" href="#v-pills-purchase" role="tab" aria-controls="v-pills-purchase" aria-selected="false">Purchase</a>
			  <a class="nav-link" id="v-pills-vendor-tab" data-toggle="pill" href="#v-pills-vendor" role="tab" aria-controls="v-pills-vendor" aria-selected="false">Vendor</a>
			  <a class="nav-link" id="v-pills-sale-tab" data-toggle="pill" href="#v-pills-sale" role="tab" aria-controls="v-pills-sale" aria-selected="false">Sale</a>
			  <a class="nav-link" id="v-pills-customer-tab" data-toggle="pill" href="#v-pills-customer" role="tab" aria-controls="v-pills-customer" aria-selected="false">Customer</a>
			  <a class="nav-link" id="v-pills-search-tab" data-toggle="pill" href="#v-pills-search" role="tab" aria-controls="v-pills-search" aria-selected="false">Search</a>
			  <a class="nav-link" id="v-pills-reports-tab" data-toggle="pill" href="#v-pills-reports" role="tab" aria-controls="v-pills-reports" aria-selected="false">Reports</a>
			  <a class="nav-link" id="v-pills-analytics-tab" data-toggle="pill" href="#v-pills-analytics" role="tab" aria-controls="v-pills-analytics" aria-selected="false">Analytics</a>
			  <a class="nav-link" id="v-pills-staff-tab" data-toggle="pill" href="#v-pills-staff" role="tab" aria-controls="v-pills-staff" aria-selected="false">Staff</a>
			</div>
		</div>
		 <div class="col-lg-10">
			<div class="tab-content" id="v-pills-tabContent">
			  <div class="tab-pane fade show active" id="v-pills-item" role="tabpanel" aria-labelledby="v-pills-item-tab">
				<div class="card card-outline-secondary my-4">
				  <div class="card-header">Item Details</div>
				  <div class="card-body">
				  					<ul class="nav nav-tabs" role="tablist">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="tab" href="#itemDetailsTab">Item</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#itemImageTab">Upload Image</a>
						</li>
					</ul>
					
					<!-- Tab panes for item details and image sections -->
					<div class="tab-content">
						<div id="itemDetailsTab" class="container-fluid tab-pane active">
							<br>
							<!-- Div to show the ajax message from validations/db submission -->
							<div id="itemDetailsMessage"></div>
							<form>
							  <div class="form-row">
								<div class="form-group col-md-3" style="display:inline-block">
								  <label for="itemDetailsItemNumber">Item Number<span class="requiredIcon">*</span></label>
								  <input type="text" class="form-control" name="itemDetailsItemNumber" id="itemDetailsItemNumber" autocomplete="off">
								  <div id="itemDetailsItemNumberSuggestionsDiv" class="customListDivWidth"></div>
								</div>
								<div class="form-group col-md-3">
								  <label for="itemDetailsProductID">Product ID</label>
								  <input class="form-control invTooltip" type="number" readonly id="itemDetailsProductID" name="itemDetailsProductID" value="" title="This will be auto-generated when you add a new item">
								</div>
							  </div>
							  <div class="form-row">
								  <div class="form-group col-md-6">
									<label for="itemDetailsItemName">Item Name<span class="requiredIcon">*</span></label>
									<input type="text" class="form-control" name="itemDetailsItemName" id="itemDetailsItemName" autocomplete="off">
									<div id="itemDetailsItemNameSuggestionsDiv" class="customListDivWidth"></div>
								  </div>
								  <div class="form-group col-md-2">
									<label for="itemDetailsStatus">Status</label>
									<select id="itemDetailsStatus" name="itemDetailsStatus" class="form-control chosenSelect">
										<?php include('inc/statusList.html'); ?>
									</select>
								  </div>
							  </div>
							  <div class="form-row">
								<div class="form-group col-md-6" style="display:inline-block">
								  <!-- <label for="itemDetailsDescription">Description</label> -->
								  <textarea rows="4" class="form-control" placeholder="Description" name="itemDetailsDescription" id="itemDetailsDescription"></textarea>
								</div>
							  </div>
							  <div class="form-row">
								<div class="form-group col-md-3">
								  <label for="itemDetailsDiscount">Discount %</label>
								  <input type="text" class="form-control" value="0" name="itemDetailsDiscount" id="itemDetailsDiscount">
								</div>
								<div class="form-group col-md-3">
								  <label for="itemDetailsQuantity">Quantity<span class="requiredIcon">*</span></label>
								  <input type="number" class="form-control" value="0" name="itemDetailsQuantity" id="itemDetailsQuantity">
								</div>
								<div class="form-group col-md-3">
								  <label for="itemDetailsUnitPrice">Unit Price<span class="requiredIcon">*</span></label>
								  <input type="text" class="form-control" value="0" name="itemDetailsUnitPrice" id="itemDetailsUnitPrice">
								</div>
								<div class="form-group col-md-3">
								  <label for="itemDetailsTotalStock">Total Stock</label>
								  <input type="text" class="form-control" name="itemDetailsTotalStock" id="itemDetailsTotalStock" readonly>
								</div>
								<div class="form-group col-md-3">
									<div id="imageContainer"></div>
								</div>
							  </div>
							  <button type="button" id="addItem" class="btn btn-success">Add Item</button>
							  <button type="button" id="updateItemDetailsButton" class="btn btn-primary">Update</button>
							  <button type="button" id="deleteItem" class="btn btn-danger">Delete</button>
							  <button type="reset" class="btn" id="itemClear">Clear</button>
							</form>
						</div>
						<div id="itemImageTab" class="container-fluid tab-pane fade">
							<br>
							<div id="itemImageMessage"></div>
							<p>You can upload an image for a particular item using this section.</p> 
							<p>Please make sure the item is already added to database before uploading the image.</p>
							<br>							
							<form name="imageForm" id="imageForm" method="post">
							  <div class="form-row">
								<div class="form-group col-md-3" style="display:inline-block">
								  <label for="itemImageItemNumber">Item Number<span class="requiredIcon">*</span></label>
								  <input type="text" class="form-control" name="itemImageItemNumber" id="itemImageItemNumber" autocomplete="off">
								  <div id="itemImageItemNumberSuggestionsDiv" class="customListDivWidth"></div>
								</div>
								<div class="form-group col-md-4">
									<label for="itemImageItemName">Item Name</label>
									<input type="text" class="form-control" name="itemImageItemName" id="itemImageItemName" readonly>
								</div>
							  </div>
							  <br>
							  <div class="form-row">
								  <div class="form-group col-md-7">
									<label for="itemImageFile">Select Image ( <span class="blueText">jpg</span>, <span class="blueText">jpeg</span>, <span class="blueText">gif</span>, <span class="blueText">png</span> only )</label>
									<input type="file" class="form-control-file btn btn-dark" id="itemImageFile" name="itemImageFile">
								  </div>
							  </div>
							  <br>
							  <button type="button" id="updateImageButton" class="btn btn-primary">Upload Image</button>
							  <button type="button" id="deleteImageButton" class="btn btn-danger">Delete Image</button>
							  <button type="reset" class="btn">Clear</button>
							</form>
						</div>
					</div>
				  </div> 
				</div>
			  </div>
			  <div class="tab-pane fade" id="v-pills-purchase" role="tabpanel" aria-labelledby="v-pills-purchase-tab">
				<div class="card card-outline-secondary my-4">
				  <div class="card-header">Purchase Details</div>
				  <div class="card-body">
					<div id="purchaseDetailsMessage"></div>
					<form>
					  <div class="form-row">
						<div class="form-group col-md-3">
						  <label for="purchaseDetailsItemNumber">Item Number<span class="requiredIcon">*</span></label>
						  <input type="text" class="form-control" id="purchaseDetailsItemNumber" name="purchaseDetailsItemNumber" autocomplete="off">
						  <div id="purchaseDetailsItemNumberSuggestionsDiv" class="customListDivWidth"></div>
						</div>
						<div class="form-group col-md-3">
						  <label for="purchaseDetailsPurchaseDate">Purchase Date<span class="requiredIcon">*</span></label>
						  <input type="text" class="form-control datepicker" id="purchaseDetailsPurchaseDate" name="purchaseDetailsPurchaseDate" readonly value="<?php echo date('Y-m-d'); ?>">
						</div>
						<div class="form-group col-md-2">
						  <label for="purchaseDetailsPurchaseID">Purchase ID</label>
						  <input type="text" class="form-control invTooltip" id="purchaseDetailsPurchaseID" name="purchaseDetailsPurchaseID" value="" title="This will be auto-generated when you add a new record" autocomplete="off">
						  <div id="purchaseDetailsPurchaseIDSuggestionsDiv" class="customListDivWidth"></div>
						</div>
					  </div>
					  <div class="form-row"> 
						  <div class="form-group col-md-4">
							<label for="purchaseDetailsItemName">Item Name<span class="requiredIcon">*</span></label>
							<input type="text" class="form-control invTooltip" id="purchaseDetailsItemName" name="purchaseDetailsItemName" readonly title="This will be auto-filled when you enter the item number above">
						  </div>
						  <div class="form-group col-md-2">
							  <label for="purchaseDetailsCurrentStock">Current Stock</label>
							  <input type="text" class="form-control" id="purchaseDetailsCurrentStock" name="purchaseDetailsCurrentStock" readonly>
						  </div>
						  <div class="form-group col-md-4">
							<label for="purchaseDetailsVendorName">Vendor Name<span class="requiredIcon">*</span></label>
							<select id="purchaseDetailsVendorName" name="purchaseDetailsVendorName" class="form-control chosenSelect">
								<?php 
									require('model/vendor/getVendorNames.php');
								?>
							</select>
						  </div>
					  </div>
					  <div class="form-row">
						<div class="form-group col-md-2">
						  <label for="purchaseDetailsQuantity">Quantity<span class="requiredIcon">*</span></label>
						  <input type="number" class="form-control" id="purchaseDetailsQuantity" name="purchaseDetailsQuantity" value="0">
						</div>
						<div class="form-group col-md-2">
						  <label for="purchaseDetailsUnitPrice">Unit Price<span class="requiredIcon">*</span></label>
						  <input type="text" class="form-control" id="purchaseDetailsUnitPrice" name="purchaseDetailsUnitPrice" value="0">
						  
						</div>
						<div class="form-group col-md-2">
						  <label for="purchaseDetailsTotal">Total Cost</label>
						  <input type="text" class="form-control" id="purchaseDetailsTotal" name="purchaseDetailsTotal" readonly>
						</div>
					  </div>
					  <button type="button" id="addPurchase" class="btn btn-success">Add Purchase</button>
					  <button type="button" id="updatePurchaseDetailsButton" class="btn btn-primary">Update</button>
					  <button type="reset" class="btn">Clear</button>
					</form>
				  </div> 
				</div>
			  </div>
			  
			  <div class="tab-pane fade" id="v-pills-vendor" role="tabpanel" aria-labelledby="v-pills-vendor-tab">
				<div class="card card-outline-secondary my-4">
				  <div class="card-header">Vendor Details</div>
				  <div class="card-body">
				  <!-- Div to show the ajax message from validations/db submission -->
				  <div id="vendorDetailsMessage"></div>
					 <form> 
					  <div class="form-row">
						<div class="form-group col-md-6">
						  <label for="vendorDetailsVendorFullName">Full Name<span class="requiredIcon">*</span></label>
						  <input type="text" class="form-control" id="vendorDetailsVendorFullName" name="vendorDetailsVendorFullName" placeholder="">
						</div>
						<div class="form-group col-md-2">
							<label for="vendorDetailsStatus">Status</label>
							<select id="vendorDetailsStatus" name="vendorDetailsStatus" class="form-control chosenSelect">
								<?php include('inc/statusList.html'); ?>
							</select>
						</div>
						 <div class="form-group col-md-3">
							<label for="vendorDetailsVendorID">Vendor ID</label>
							<input type="text" class="form-control invTooltip" id="vendorDetailsVendorID" name="vendorDetailsVendorID" value="" title="This will be auto-generated when you add a new vendor" autocomplete="off">
							<div id="vendorDetailsVendorIDSuggestionsDiv" class="customListDivWidth"></div>
						</div>
					  </div>
					  <div class="form-row">
						  <div class="form-group col-md-3">
							<label for="vendorDetailsVendorMobile">Phone (+254)<span class="requiredIcon">*</span></label>
							<input type="text" class="form-control invTooltip" id="vendorDetailsVendorMobile" name="vendorDetailsVendorMobile" title="Do not enter leading 0">
						  </div>
						  <div class="form-group col-md-3">
							<label for="vendorDetailsVendorPhone2">Phone 2</label>
							<input type="text" class="form-control invTooltip" id="vendorDetailsVendorPhone2" name="vendorDetailsVendorPhone2" title="Do not enter leading 0">
						  </div>
						  <div class="form-group col-md-6">
							<label for="vendorDetailsVendorEmail">Email</label>
							<input type="email" class="form-control" id="vendorDetailsVendorEmail" name="vendorDetailsVendorEmail">
						</div>
					  </div>
					  <div class="form-group">
						<label for="vendorDetailsVendorAddress">Address<span class="requiredIcon">*</span></label>
						<input type="text" class="form-control" id="vendorDetailsVendorAddress" name="vendorDetailsVendorAddress">
					  </div>
					  <div class="form-group">
						<label for="vendorDetailsVendorAddress2">Address 2</label>
						<input type="text" class="form-control" id="vendorDetailsVendorAddress2" name="vendorDetailsVendorAddress2">
					  </div>
					  <div class="form-row">
						<div class="form-group col-md-6">
						  <label for="vendorDetailsVendorCity">City</label>
						  <input type="text" class="form-control" id="vendorDetailsVendorCity" name="vendorDetailsVendorCity">
						</div>
						<div class="form-group col-md-4">
						  <label for="vendorDetailsVendorDistrict">District</label>
						  <select id="vendorDetailsVendorDistrict" name="vendorDetailsVendorDistrict" class="form-control chosenSelect">
							<option value="Nairobi">Nairobi</option>
							<option value="Mombasa">Mombasa</option>
							<option value="Kisumu">Kisumu</option>
							<option value="Nakuru">Nakuru</option>
							<option value="Eldoret">Eldoret</option>
							<option value="Thika">Thika</option>
							<option value="Nyeri">Nyeri</option>
							<option value="Meru">Meru</option>
							<option value="Machakos">Machakos</option>
							<option value="Garissa">Garissa</option>
							<option value="Embu">Embu</option>
							<option value="Kitale">Kitale</option>
							<option value="Kericho">Kericho</option>
							<option value="Malindi">Malindi</option>
							<option value="Kakamega">Kakamega</option>
							<option value="Nanyuki">Nanyuki</option>
							<option value="Naivasha">Naivasha</option>
							<option value="Narok">Narok</option>
							<option value="Kilifi">Kilifi</option>
							<option value="Isiolo">Isiolo</option>
							<option value="Lamu">Lamu</option>
							<option value="Marsabit">Marsabit</option>
							<option value="Wajir">Wajir</option>
							<option value="Mandera">Mandera</option>
							<option value="Turkana">Turkana</option>
							<option value="Bungoma">Bungoma</option>
							<option value="Busia">Busia</option>
							<option value="Voi">Voi</option>
							<option value="Nyahururu">Nyahururu</option>
							<option value="Lodwar">Lodwar</option>
							<option value="Kapenguria">Kapenguria</option>
						  </select>
						</div>
					  </div>					  
					  <button type="button" id="addVendor" name="addVendor" class="btn btn-success">Add Vendor</button>
					  <button type="button" id="updateVendorDetailsButton" class="btn btn-primary">Update</button>
					  <button type="button" id="deleteVendorButton" class="btn btn-danger">Delete</button>
					  <button type="reset" class="btn">Clear</button>
					 </form>
				  </div> 
				</div>
			  </div>
			    
			  <div class="tab-pane fade" id="v-pills-sale" role="tabpanel" aria-labelledby="v-pills-sale-tab">
				<div class="card card-outline-secondary my-4">
				  <div class="card-header">Sale Details</div>
				  <div class="card-body">
					<div id="saleDetailsMessage"></div>
					<form>
					  <div class="form-row">
						<div class="form-group col-md-3">
						  <label for="saleDetailsItemNumber">Item Number<span class="requiredIcon">*</span></label>
						  <input type="text" class="form-control" id="saleDetailsItemNumber" name="saleDetailsItemNumber" autocomplete="off">
						  <div id="saleDetailsItemNumberSuggestionsDiv" class="customListDivWidth"></div>
						</div>
						<div class="form-group col-md-3">
							<label for="saleDetailsCustomerID">Customer ID<span class="requiredIcon">*</span></label>
							<input type="text" class="form-control" id="saleDetailsCustomerID" name="saleDetailsCustomerID" autocomplete="off">
							<div id="saleDetailsCustomerIDSuggestionsDiv" class="customListDivWidth"></div>
						</div>
						<div class="form-group col-md-4">
						  <label for="saleDetailsCustomerName">Customer Name</label>
						  <input type="text" class="form-control" id="saleDetailsCustomerName" name="saleDetailsCustomerName" readonly>
						</div>
						<div class="form-group col-md-2">
						  <label for="saleDetailsSaleID">Sale ID</label>
						  <input type="text" class="form-control invTooltip" id="saleDetailsSaleID" name="saleDetailsSaleID" value="" title="This will be auto-generated when you add a new record" autocomplete="off">
						  <div id="saleDetailsSaleIDSuggestionsDiv" class="customListDivWidth"></div>
						</div>
					  </div>
					  <div class="form-row">
						  <div class="form-group col-md-5">
							<label for="saleDetailsItemName">Item Name</label>
							<!--<select id="saleDetailsItemNames" name="saleDetailsItemNames" class="form-control chosenSelect"> -->
								<?php 
									//require('model/item/getItemDetails.php');
								?>
							<!-- </select> -->
							<input type="text" class="form-control invTooltip" id="saleDetailsItemName" name="saleDetailsItemName" readonly title="This will be auto-filled when you enter the item number above">
						  </div>
						  <div class="form-group col-md-3">
							  <label for="saleDetailsSaleDate">Sale Date<span class="requiredIcon">*</span></label>
							  <input type="text" class="form-control datepicker" id="saleDetailsSaleDate" value="<?php echo date('Y-m-d'); ?>" name="saleDetailsSaleDate" readonly>
						  </div>
					  </div>
					  <div class="form-row">
						<div class="form-group col-md-2">
								  <label for="saleDetailsTotalStock">Total Stock</label>
								  <input type="text" class="form-control" name="saleDetailsTotalStock" id="saleDetailsTotalStock" readonly>
								</div>
						<div class="form-group col-md-2">
						  <label for="saleDetailsDiscount">Discount %</label>
						  <input type="text" class="form-control" id="saleDetailsDiscount" name="saleDetailsDiscount" value="0">
						</div>
						<div class="form-group col-md-2">
						  <label for="saleDetailsQuantity">Quantity<span class="requiredIcon">*</span></label>
						  <input type="number" class="form-control" id="saleDetailsQuantity" name="saleDetailsQuantity" value="0">
						</div>
						<div class="form-group col-md-2">
						  <label for="saleDetailsUnitPrice">Unit Price<span class="requiredIcon">*</span></label>
						  <input type="text" class="form-control" id="saleDetailsUnitPrice" name="saleDetailsUnitPrice" value="0">
						</div>
						<div class="form-group col-md-3">
						  <label for="saleDetailsTotal">Total</label>
						  <input type="text" class="form-control" id="saleDetailsTotal" name="saleDetailsTotal">
						</div>
					  </div>
					  <div class="form-row">
						  <div class="form-group col-md-3">
							<div id="saleDetailsImageContainer"></div>
						  </div>
					 </div>
					  <button type="button" id="addSaleButton" class="btn btn-success">Add Sale</button>
					  <button type="button" id="updateSaleDetailsButton" class="btn btn-primary">Update</button>
					  <button type="reset" id="saleClear" class="btn">Clear</button>
					</form>
				  </div> 
				</div>
			  </div>
			  <div class="tab-pane fade" id="v-pills-customer" role="tabpanel" aria-labelledby="v-pills-customer-tab">
				<div class="card card-outline-secondary my-4">
				  <div class="card-header">Customer Details</div>
				  <div class="card-body">
				  <!-- Div to show the ajax message from validations/db submission -->
				  <div id="customerDetailsMessage"></div>
					 <form> 
					  <div class="form-row">
						<div class="form-group col-md-6">
						  <label for="customerDetailsCustomerFullName">Full Name<span class="requiredIcon">*</span></label>
						  <input type="text" class="form-control" id="customerDetailsCustomerFullName" name="customerDetailsCustomerFullName">
						</div>
						<div class="form-group col-md-2">
							<label for="customerDetailsStatus">Status</label>
							<select id="customerDetailsStatus" name="customerDetailsStatus" class="form-control chosenSelect">
								<?php include('inc/statusList.html'); ?>
							</select>
						</div>
						 <div class="form-group col-md-3">
							<label for="customerDetailsCustomerID">Customer ID</label>
							<input type="text" class="form-control invTooltip" id="customerDetailsCustomerID" name="customerDetailsCustomerID" value="" title="This will be auto-generated when you add a new customer" autocomplete="off">
							<div id="customerDetailsCustomerIDSuggestionsDiv" class="customListDivWidth"></div>
						</div>
					  </div>
					  <div class="form-row">
						  <div class="form-group col-md-3">
							<label for="customerDetailsCustomerMobile">Phone (+254)<span class="requiredIcon">*</span></label>
							<input type="text" class="form-control invTooltip" id="customerDetailsCustomerMobile" name="customerDetailsCustomerMobile" title="Do not enter leading 0">
						  </div>
						  <div class="form-group col-md-3">
							<label for="customerDetailsCustomerPhone2">Phone 2</label>
							<input type="text" class="form-control invTooltip" id="customerDetailsCustomerPhone2" name="customerDetailsCustomerPhone2" title="Do not enter leading 0">
						  </div>
						  <div class="form-group col-md-6">
							<label for="customerDetailsCustomerEmail">Email</label>
							<input type="email" class="form-control" id="customerDetailsCustomerEmail" name="customerDetailsCustomerEmail">
						</div>
					  </div>
					  <div class="form-group">
						<label for="customerDetailsCustomerAddress">Address<span class="requiredIcon">*</span></label>
						<input type="text" class="form-control" id="customerDetailsCustomerAddress" name="customerDetailsCustomerAddress">
					  </div>
					  <div class="form-group">
						<label for="customerDetailsCustomerAddress2">Address 2</label>
						<input type="text" class="form-control" id="customerDetailsCustomerAddress2" name="customerDetailsCustomerAddress2">
					  </div>
					  <div class="form-row">
						<div class="form-group col-md-6">
						  <label for="customerDetailsCustomerCity">City</label>
						  <input type="text" class="form-control" id="customerDetailsCustomerCity" name="customerDetailsCustomerCity">
						</div>
						<div class="form-group col-md-4">
						  <label for="customerDetailsCustomerDistrict">District</label>
						  <select id="customerDetailsCustomerDistrict" name="customerDetailsCustomerDistrict" class="form-control chosenSelect">
							<option value="Nairobi">Nairobi</option>
							<option value="Mombasa">Mombasa</option>
							<option value="Kisumu">Kisumu</option>
							<option value="Nakuru">Nakuru</option>
							<option value="Eldoret">Eldoret</option>
							<option value="Thika">Thika</option>
							<option value="Nyeri">Nyeri</option>
							<option value="Meru">Meru</option>
							<option value="Machakos">Machakos</option>
							<option value="Garissa">Garissa</option>
							<option value="Embu">Embu</option>
							<option value="Kitale">Kitale</option>
							<option value="Kericho">Kericho</option>
							<option value="Malindi">Malindi</option>
							<option value="Kakamega">Kakamega</option>
							<option value="Nanyuki">Nanyuki</option>
							<option value="Naivasha">Naivasha</option>
							<option value="Narok">Narok</option>
							<option value="Kilifi">Kilifi</option>
							<option value="Isiolo">Isiolo</option>
							<option value="Lamu">Lamu</option>
							<option value="Marsabit">Marsabit</option>
							<option value="Wajir">Wajir</option>
							<option value="Mandera">Mandera</option>
							<option value="Turkana">Turkana</option>
							<option value="Bungoma">Bungoma</option>
							<option value="Busia">Busia</option>
							<option value="Voi">Voi</option>
							<option value="Nyahururu">Nyahururu</option>
							<option value="Lodwar">Lodwar</option>
							<option value="Kapenguria">Kapenguria</option>
						  </select>
						</div>
					  </div>					  
					  <button type="button" id="addCustomer" name="addCustomer" class="btn btn-success">Add Customer</button>
					  <button type="button" id="updateCustomerDetailsButton" class="btn btn-primary">Update</button>
					  <button type="button" id="deleteCustomerButton" class="btn btn-danger">Delete</button>
					  <button type="reset" class="btn">Clear</button>
					 </form>
				  </div> 
				</div>
			  </div>
			  
			  <div class="tab-pane fade" id="v-pills-search" role="tabpanel" aria-labelledby="v-pills-search-tab">
				<div class="card card-outline-secondary my-4">
				  <div class="card-header">Search Inventory<button id="searchTablesRefresh" name="searchTablesRefresh" class="btn btn-warning float-right btn-sm">Refresh</button></div>
				  <div class="card-body">										
					<ul class="nav nav-tabs" role="tablist">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="tab" href="#itemSearchTab">Item</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#customerSearchTab">Customer</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#saleSearchTab">Sale</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#purchaseSearchTab">Purchase</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#vendorSearchTab">Vendor</a>
						</li>
					</ul>
  
					<!-- Tab panes -->
					<div class="tab-content">
						<div id="itemSearchTab" class="container-fluid tab-pane active">
						  <br>
						  <p>Use the grid below to search all details of items</p>
						  <!-- <a href="#" class="itemDetailsHover" data-toggle="popover" id="10">wwwee</a> -->
							<div class="table-responsive" id="itemDetailsTableDiv"></div>
						</div>
						<div id="customerSearchTab" class="container-fluid tab-pane fade">
						  <br>
						  <p>Use the grid below to search all details of customers</p>
							<div class="table-responsive" id="customerDetailsTableDiv"></div>
						</div>
						<div id="saleSearchTab" class="container-fluid tab-pane fade">
							<br>
							<p>Use the grid below to search sale details</p>
							<div class="table-responsive" id="saleDetailsTableDiv"></div>
						</div>
						<div id="purchaseSearchTab" class="container-fluid tab-pane fade">
							<br>
							<p>Use the grid below to search purchase details</p>
							<div class="table-responsive" id="purchaseDetailsTableDiv"></div>
						</div>
						<div id="vendorSearchTab" class="container-fluid tab-pane fade">
							<br>
							<p>Use the grid below to search vendor details</p>
							<div class="table-responsive" id="vendorDetailsTableDiv"></div>
						</div>
					</div>
				  </div> 
				</div>
			  </div>
			  
			  <div class="tab-pane fade" id="v-pills-reports" role="tabpanel" aria-labelledby="v-pills-reports-tab">
				<div class="card card-outline-secondary my-4">
				  <div class="card-header">Reports<button id="reportsTablesRefresh" name="reportsTablesRefresh" class="btn btn-warning float-right btn-sm">Refresh</button></div>
				  <div class="card-body">										
					<ul class="nav nav-tabs" role="tablist">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="tab" href="#itemReportsTab">Item</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#customerReportsTab">Customer</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#saleReportsTab">Sale</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#purchaseReportsTab">Purchase</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#vendorReportsTab">Vendor</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#staffReportsTab">Staff</a> <!-- New Staff Tab -->
						</li>
					</ul>
  
					<!-- Tab panes for reports sections -->
					<div class="tab-content">
						<div id="itemReportsTab" class="container-fluid tab-pane active">
							<br>
							<p>Use the grid below to get reports for items</p>
							<div class="table-responsive" id="itemReportsTableDiv"></div>
						</div>
						<div id="customerReportsTab" class="container-fluid tab-pane fade">
							<br>
							<p>Use the grid below to get reports for customers</p>
							<div class="table-responsive" id="customerReportsTableDiv"></div>
						</div>
						<div id="saleReportsTab" class="container-fluid tab-pane fade">
							<br>
							<!-- <p>Use the grid below to get reports for sales</p> -->
							<form> 
							  <div class="form-row">
								  <div class="form-group col-md-3">
									<label for="saleReportStartDate">Start Date</label>
									<input type="text" class="form-control datepicker" id="saleReportStartDate" value="<?php echo date('Y-m-d'); ?>" name="saleReportStartDate" readonly>
								  </div>
								  <div class="form-group col-md-3">
									<label for="saleReportEndDate">End Date</label>
									<input type="text" class="form-control datepicker" id="saleReportEndDate" value="<?php echo date('Y-m-d'); ?>" name="saleReportEndDate" readonly>
								  </div>
							  </div>
							  <button type="button" id="showSaleReport" class="btn btn-dark">Show Report</button>
							  <button type="reset" id="saleFilterClear" class="btn">Clear</button>
							</form>
							<br><br>
							<div class="table-responsive" id="saleReportsTableDiv"></div>
						</div>
						<div id="purchaseReportsTab" class="container-fluid tab-pane fade">
							<br>
							<!-- <p>Use the grid below to get reports for purchases</p> -->
							<form> 
							  <div class="form-row">
								  <div class="form-group col-md-3">
									<label for="purchaseReportStartDate">Start Date</label>
									<input type="text" class="form-control datepicker" id="purchaseReportStartDate" value="<?php echo date('Y-m-d'); ?>" name="purchaseReportStartDate" readonly>
								  </div>
								  <div class="form-group col-md-3">
									<label for="purchaseReportEndDate">End Date</label>
									<input type="text" class="form-control datepicker" id="purchaseReportEndDate" value="<?php echo date('Y-m-d'); ?>" name="purchaseReportEndDate" readonly>
								  </div>
							  </div>
							  <button type="button" id="showPurchaseReport" class="btn btn-dark">Show Report</button>
							  <button type="reset" id="purchaseFilterClear" class="btn">Clear</button>
							</form>
							<br><br>
							<div class="table-responsive" id="purchaseReportsTableDiv"></div>
						</div>
						<div id="vendorReportsTab" class="container-fluid tab-pane fade">
							<br>
							<p>Use the grid below to get reports for vendors</p>
							<div class="table-responsive" id="vendorReportsTableDiv"></div>
						</div>
						<div id="staffReportsTab" class="container-fluid tab-pane fade">
							<br>
							<p>Use the grid below to get reports for staff</p>
							<form>
								<div class="form-row">
									<div class="form-group col-md-3">
										<label for="staffReportStartDate">Start Date</label>
										<input type="text" class="form-control datepicker" id="staffReportStartDate" value="<?php echo date('Y-m-d'); ?>" name="staffReportStartDate" readonly>
									</div>
									<div class="form-group col-md-3">
										<label for="staffReportEndDate">End Date</label>
										<input type="text" class="form-control datepicker" id="staffReportEndDate" value="<?php echo date('Y-m-d'); ?>" name="staffReportEndDate" readonly>
									</div>
									<div class="form-group col-md-3">
										<label for="staffReportRole">Role</label>
										<select id="staffReportRole" name="staffReportRole" class="form-control chosenSelect">
											<option value="">All Roles</option>
											<option value="Manager">Manager</option>
											<option value="Cashier">Cashier</option>
											<option value="Stock Keeper">Stock Keeper</option>
										</select>
									</div>
								</div>
								<button type="button" id="showStaffReport" class="btn btn-dark">Show Report</button>
								<button type="reset" id="staffFilterClear" class="btn">Clear</button>
							</form>
							<br><br>
							<div class="table-responsive" id="staffReportsTableDiv"></div>
						</div>
					</div>
				  </div> 
				</div>
			  </div>
			  <div class="tab-pane fade" id="v-pills-analytics" role="tabpanel" aria-labelledby="v-pills-analytics-tab">
				<div class="card card-outline-secondary my-4">
				  <div class="card-header">Business Analytics</div>
				  <div class="card-body">
					<p>Below are the analytics and progress of the business:</p>
					<canvas id="salesChart" width="400" height="200"></canvas>
					<canvas id="inventoryChart" width="400" height="200"></canvas>
				  </div>
				</div>
			  </div>
			  <div class="tab-pane fade" id="v-pills-staff" role="tabpanel" aria-labelledby="v-pills-staff-tab">
				<div class="card card-outline-secondary my-4">
				  <div class="card-header">Staff Details</div>
				  <div class="card-body">
					<div id="staffDetailsMessage"></div>
					<form>
					  <div class="form-row">
						<div class="form-group col-md-6">
						  <label for="staffDetailsFullName">Full Name<span class="requiredIcon">*</span></label>
						  <input type="text" class="form-control" id="staffDetailsFullName" name="staffDetailsFullName">
						</div>
						<div class="form-group col-md-2">
						  <label for="staffDetailsRole">Role</label>
						  <select id="staffDetailsRole" name="staffDetailsRole" class="form-control chosenSelect">
							<option value="Manager">Manager</option>
							<option value="Cashier">Cashier</option>
							<option value="Stock Keeper">Stock Keeper</option>
						  </select>
						</div>
						<div class="form-group col-md-3">
						  <label for="staffDetailsStaffID">Staff ID</label>
						  <input type="text" class="form-control invTooltip" id="staffDetailsStaffID" name="staffDetailsStaffID" value="" title="This will be auto-generated when you add a new staff" autocomplete="off">
						</div>
					  </div>
					  <div class="form-row">
						<div class="form-group col-md-3">
						  <label for="staffDetailsMobile">Phone (+254)<span class="requiredIcon">*</span></label>
						  <input type="text" class="form-control invTooltip" id="staffDetailsMobile" name="staffDetailsMobile" title="Do not enter leading 0">
						</div>
						<div class="form-group col-md-3">
						  <label for="staffDetailsPhone2">Phone 2</label>
						  <input type="text" class="form-control invTooltip" id="staffDetailsPhone2" name="staffDetailsPhone2" title="Do not enter leading 0">
						</div>
						<div class="form-group col-md-6">
						  <label for="staffDetailsEmail">Email</label>
						  <input type="email" class="form-control" id="staffDetailsEmail" name="staffDetailsEmail">
						</div>
					  </div>
					  <div class="form-group">
						<label for="staffDetailsAddress">Address<span class="requiredIcon">*</span></label>
						<input type="text" class="form-control" id="staffDetailsAddress" name="staffDetailsAddress">
					  </div>
					  <div class="form-group">
						<label for="staffDetailsAddress2">Address 2</label>
						<input type="text" class="form-control" id="staffDetailsAddress2" name="staffDetailsAddress2">
					  </div>
					  <div class="form-row">
						<div class="form-group col-md-6">
						  <label for="staffDetailsCity">City</label>
						  <input type="text" class="form-control" id="staffDetailsCity" name="staffDetailsCity">
						</div>
						<div class="form-group col-md-4">
						  <label for="staffDetailsDistrict">District</label>
						  <select id="staffDetailsDistrict" name="staffDetailsDistrict" class="form-control chosenSelect">
							<option value="Nairobi">Nairobi</option>
							<option value="Mombasa">Mombasa</option>
							<option value="Kisumu">Kisumu</option>
							<!-- Add more districts as needed -->
						  </select>
						</div>
					  </div>
					  <button type="button" id="addStaff" class="btn btn-success">Add Staff</button>
					  <button type="button" id="updateStaffDetailsButton" class="btn btn-primary">Update</button>
					  <button type="button" id="deleteStaffButton" class="btn btn-danger">Delete</button>
					  <button type="reset" class="btn">Clear</button>
					</form>
				  </div>
				</div>
			  </div>
			</div>
		 </div>
	  </div>
    </div>
<?php
	require 'inc/footer.php';
?>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    const totalStockField = document.getElementById('itemDetailsTotalStock');
    const quantityField = document.getElementById('itemDetailsQuantity');
    const unitPriceField = document.getElementById('itemDetailsUnitPrice');
    const totalCostField = document.getElementById('purchaseDetailsTotal');
    const purchaseQuantityField = document.getElementById('purchaseDetailsQuantity');
    const purchaseUnitPriceField = document.getElementById('purchaseDetailsUnitPrice');
    const notificationIcon = document.getElementById('lowStockNotification');
    const lowStockThreshold = 100; // Set your threshold here

    // Update Total Stock dynamically
    if (totalStockField && quantityField) {
      quantityField.addEventListener('input', function () {
        const quantityValue = parseInt(quantityField.value, 10);
        if (!isNaN(quantityValue)) {
          totalStockField.value = quantityValue; // Update Total Stock
        }
      });
    }

    // Update Total Cost dynamically for purchases
    if (totalCostField && purchaseQuantityField && purchaseUnitPriceField) {
      const updateTotalCost = () => {
        const quantity = parseInt(purchaseQuantityField.value, 10);
        const unitPrice = parseFloat(purchaseUnitPriceField.value);
        if (!isNaN(quantity) && !isNaN(unitPrice)) {
          totalCostField.value = (quantity * unitPrice).toFixed(2); // Update Total Cost
        } else {
          totalCostField.value = '';
        }
      };

      purchaseQuantityField.addEventListener('input', updateTotalCost);
      purchaseUnitPriceField.addEventListener('input', updateTotalCost);
    }

    // Warning for low stock
    if (totalStockField) {
      totalStockField.addEventListener('input', function () {
        const stockValue = parseInt(totalStockField.value, 10);
        if (!isNaN(stockValue) && stockValue < lowStockThreshold) {
          notificationIcon.style.display = 'block'; // Show notification
        } else {
          notificationIcon.style.display = 'none'; // Hide notification
        }
      });
    }

    // Reports Section: Validate and dynamically update reports
    const saleReportStartDate = document.getElementById('saleReportStartDate');
    const saleReportEndDate = document.getElementById('saleReportEndDate');
    const purchaseReportStartDate = document.getElementById('purchaseReportStartDate');
    const purchaseReportEndDate = document.getElementById('purchaseReportEndDate');
    const showSaleReportButton = document.getElementById('showSaleReport');
    const showPurchaseReportButton = document.getElementById('showPurchaseReport');

    // Validate Sale Report Dates
    if (saleReportStartDate && saleReportEndDate && showSaleReportButton) {
      showSaleReportButton.addEventListener('click', function () {
        const startDate = new Date(saleReportStartDate.value);
        const endDate = new Date(saleReportEndDate.value);
        if (startDate > endDate) {
          alert('Error: Start Date cannot be later than End Date for Sale Report.');
        } else {
          // Fetch and display sale report data (placeholder for actual implementation)
          console.log('Fetching Sale Report...');
        }
      });
    }

    // Validate Purchase Report Dates
    if (purchaseReportStartDate && purchaseReportEndDate && showPurchaseReportButton) {
      showPurchaseReportButton.addEventListener('click', function () {
        const startDate = new Date(purchaseReportStartDate.value);
        const endDate = new Date(purchaseReportEndDate.value);
        if (startDate > endDate) {
          alert('Error: Start Date cannot be later than End Date for Purchase Report.');
        } else {
          // Fetch and display purchase report data (placeholder for actual implementation)
          console.log('Fetching Purchase Report...');
        }
      });
    }

    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'], // Example labels
        datasets: [{
          label: 'Sales',
          data: [1200, 1900, 3000, 5000, 2000], // Example data
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });

    // Inventory Chart
    const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
    new Chart(inventoryCtx, {
      type: 'bar',
      data: {
        labels: ['Item A', 'Item B', 'Item C', 'Item D'], // Example labels
        datasets: [{
          label: 'Stock Levels',
          data: [50, 75, 100, 125], // Example data
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  });
</script>
  </body>
</html>
