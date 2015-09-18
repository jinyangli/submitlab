'''
This script is used to generate a folder under labX/ for each student
'''

import sys
import os

def gen_folders(labnum):
	fptr = open('userlist.txt', 'r')
	line = fptr.readline()
	while len(line) != 0:
		seg = line.split()
		path = 'uploads/lab' + str(labnum) + '/' + seg[0]
		os.system('mkdir ' + path)
		line = fptr.readline()
	fptr.close()

if __name__ == '__main__':
	if len(sys.argv) != 2:
		print 'python gen_stufolder.py labnum(e.g. 1)'
	else:
		gen_folders(sys.argv[1])
