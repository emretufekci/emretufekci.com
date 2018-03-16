
<!DOCTYPE html>
<html>
    <head>        
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="js/html2canvas.js"></script>
<script type="text/javascript" src="js/jquery.plugin.html2canvas.js"></script>
<!-- -->
        </head>
        <style>
            .container {
                position: relative;
                text-align: center;
                color: white;

            }
        .centered {
            position: absolute;
            top: 47%;
            left: 50%;
            transform: translate(-50%, -40%);

        }
        </style>
    <body>
        <center>
        <h2>CERTIFICATE OF PARTICIPATION</h2>
        <p>THE COMPUTER SCIENCE CLUB OF CIU  <br> EVENT: GRADUATION AND FUTURE </p>
        Name and Surname: <input type="text" id="name" value=""><br>
           1. Click >>> <button onclick="myFunction()">Create Certificate</button></br>
           2. Click >>> <input type="submit" value="Click Here To Save" onclick="capture();" />

            </center>
        <!-- CERTIFICATE TOP TEXT -->

<form method="POST" enctype="multipart/form-data" action="save.php" id="myForm">
	<input type="hidden" name="img_val" id="img_val" value="" />
</form>
<table>
	<tr>
		<td colspan="2">
			<table width="100%">
				<tr>
					<td>
					</td>
					<td align="right">
						<a href="http://www.kubilayerdogan.net?p=304" style="font-family: Tahoma; font-size: 10pt; font-weight: bold;">
                            More Information About This Project (Developed By Emre Tufekci)</a>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td valign="top" style="padding: 10px;">

          

		</td>
		<td>
			
 <div class="container" id="target">
            <img src="certificate.jpg" alt="certificate" style="width:70%;">
                <div class="centered">
                    <h1 id="namesurname" style="color:blue">ds</h1>
                </div>
        </div>


		</td>
	</tr>
</table>

<script type="text/javascript">
	     var namesurname="";
        document.getElementById("namesurname").innerHTML =namesurname;
        function myFunction() {
            var x = document.getElementById("name").value;
            document.getElementById("namesurname").innerHTML = x;
        }
	function capture() {
		$('#target').html2canvas({
			onrendered: function (canvas) {
                //Set hidden field's value to image data (base-64 string)
				$('#img_val').val(canvas.toDataURL("image/png"));
                //Submit the form manually
				document.getElementById("myForm").submit();
			}
		});
	}
</script>
<style type="text/css">
	#target {
		border: 1px solid #CCC;
		padding: 5px;
		margin: 5px;
	}
	h2, h3 {
		color: #003d5d;
	}
	p {
		color:#AA00BB;
	}
	#more {
		font-family: Verdana;
		color: purple;
		background-color: #d8da3d;
	}
</style>