import smtplib
from email.mime.text import MIMEText

fromaddr = 'qzhang@cims.nyu.edu'
username = 'qzhang'
password = '******'

def send_email(toaddr, scode):
	global fromaddr, username, password
	
	msg = MIMEText('Hi,\n  We send you your submission code (' + scode + ') for the distributed systems class given by Prof. Jinyang Li through this email.\n  You can submit all your labs using this code.\n  Submission link: http://XXXXX.XXX\n  Enjoy this class!\n')
	msg['Subject'] = 'Submission code for the distributed system class'
	msg['From'] = fromaddr
	msg['To'] = toaddr

	print toaddr, scode

	server = smtplib.SMTP('smtp.cims.nyu.edu:587')
	server.ehlo()
	server.starttls()
	server.login(username, password)
	server.sendmail(fromaddr, [toaddr], msg.as_string())
	server.quit()

if __name__ == '__main__':
	fptr_email = open('emaillist.txt', 'r')
	fptr_code = open('userlist.txt', 'r')
	addr_line = fptr_email.readline()
	scode_line = fptr_code.readline()
	while len(addr_line) != 0:
		addr = addr_line[:-1]
		scode = scode_line.split()[-1]
		send_email(addr, scode)
		addr_line = fptr_email.readline()
		scode_line = fptr_code.readline()
	fptr_email.close()
	fptr_code.close()
