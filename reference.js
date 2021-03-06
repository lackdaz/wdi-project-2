<%# <div class="navbar-wrapper">
	<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<!-- Responsive navbar -->
				<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
				</a>
				<a href="/"><img src="/images/logo.png" alt="logo" class="logo"></a>
				<!-- navigation -->
				<nav class="pull-right nav-collapse collapse">
				<ul id="menu-main" class="nav">
					<%if (!authenticated) { %>
					<li><a title="about" href="/#about">About</a></li>
					<li><a title="how it works" href="/#howitworks">How it works</a></li>
					<li><a title="products" href="/#products">Products</a></li>
					<% } %>
					<%if (authenticated) { %>
						<li class="dropdown">
						 <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Orders <span class="caret"></span></a>
						 <ul class="dropdown-menu">
							 <li><a href="/order">View all</a></li>
							 <li><a href="/order/completed">View completed orders</a></li>
							 <li><a href="/order/inprocess">View in-process orders</a></li>
							 <li><a href="/order/cancelled">View cancelled orders</a></li>
						 </ul>
					 </li>
					 <li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Products <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a href="/product">View all</a></li>
							<li><a href="/product/new">Add a product</a></li>
						</ul>
					</li>
					 <li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Devices <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a href="/device">View all</a></li>
							<li><a href="/device/new">Add a device</a></li>
						</ul>
					</li>
					<li class="dropdown">
					 <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Customers <span class="caret"></span></a>
					 <ul class="dropdown-menu">
						 <li><a href="/customer">View all</a></li>
						 <li><a href="/customer/new">Add a customer</a></li>
					 </ul>
				 </li>
					<% } %>
					<%if (!authenticated) { %>
						<li><a href="/signup">Sign up now</a></li>
						<li><a href="/login">Admin Login</a></li>
							<% } else {%>
						<li><a href="#"><%=userdata.local.email%></a></li>
							<li><a href="/logout">Logout</a></li>
					<% } %>
				</ul>
				</nav>
			</div>
		</div>
	</div>
</div>%>
