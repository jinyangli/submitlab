'''
Read studentinfo.txt and generate two files.
userlist.txt is for check user validation
emaillist.txt is for sending emails to inform students their submission code
'''
import random
import string

fptr = open('studentinfo.txt', 'r')
out_userlist = open('userlist.txt', 'w')
out_emaillist = open('emaillist.txt', 'w')
stu_list = [];
line = fptr.readline()
while (len(line) != 0):
	seg = line.split()
	uid = seg[0]
	netid = seg[1].split('@')[0]
	scode = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(5)])
	out_userlist.write('%s %s %s \n'%(netid, uid, scode))
	out_emaillist.write('%s\n'%(seg[1]))
	line = fptr.readline()
fptr.close()
out_userlist.close()
out_emaillist.close()
