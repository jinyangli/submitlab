To set things up:
----------------
-	edit your own studentinfo.txt file first
-	$ npm install
-	$ ./setup.sh numberoflabs handinsuffix (e.g. ./setup.sh 7 tgz)

To run the server:
----------------
-	$ nodejs app.js

Then goto:
----------------
-	http://hostname:3000/submit?lab=1

Send submission code to your students:
----------------
-	you should replace 'fromaddr', 'username', 'password' with your own email,
-	then execute python send\_emails.py to inform students of their submission code.
