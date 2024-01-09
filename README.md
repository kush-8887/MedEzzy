# MedEzzy Development Rules
This is an **Request** to please follow this guide to ensure readability and simplicity throughout the project. 

**DO NOT COMMIT TO MAIN** 
# File Structure

Follow the file structure of the public folder (refer to github )

**links (css ,img svgs , etc )**

To ensure compatibility through out the server we are following a common folder structure

**Only public folder will be sent to the users !**

A public folder will be sent through Express.js  (‘public/’)

While writing links only write in the following manner:

	/folder-name/folder-name/file-name.ext

**(Since public/ will automatically be included)**

Example.

    <link rel=”stylesheet” href=”/css/main-homepage/main-homepage.css”>
 (https://photos.app.goo.gl/FNBNhiPQAne5qzW8A)
  

# CSS Rules

Following describes the best CSS practices and the rules we are following with our files

 1. Do not make social media nav, navbar , footer, mobile nav
	
	Leave 20vh height from top and then create website

	(Make a div give height 20vh and bg-color red)
	

	    .nav{
		    height:20vh;
		    background-color:red;
	    }

	**Only for landing and login pages**
2. Include the following in you CSS Files
	

		 @import url('https://fonts.googleapis.com/css2?family=Cabin&family=Inter&family=Roboto&family=Rubik&display=swap');

		*{
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			font-family: 'Cabin', sans-serif;
		}

		:root {
		--main-purple: #3e4095;
		--main-green: #65bc50;
		--main-heading: #033b4a;
		--nav-items-color:#636778;
		--white: white;
		--offer-background:#f4f8fb;
		--border-color:#00c9a7;
		--grey-border-color:rgb(215, 217, 224);
		}
3.use these variables (if u want add extra variables specific to your page put them **after a 	comment** )

    :root {
	--main-purple: #3e4095;
	--main-green: #65bc50;
	--main-heading: #033b4a;
	--nav-items-color:#636778;
	--white: white;
	--offer-background:#f4f8fb;
	--border-color:#00c9a7;
	--grey-border-color:rgb(215, 217, 224);
		
	/*Additional color!*/
	Your variables here
	}
