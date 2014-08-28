

/*
 * GET home page.
 */


var fs = require('fs');
var url = require('url');

var upload_dir = '/tmp';
var upload_suffix = '.tgz';
exports.set_param_upload_dir = function(x) {
	upload_dir = x;
};
exports.set_param_upload_suffix = function(x) {
	upload_suffix = x;
};

function validate_user(netid, uid) {
	return true;
};

exports.getstatus = function(req, res) {
	var url_parts = url.parse(req.url, true);
	var  query = url_parts.query;
	var upfile = upload_dir+'/lab' + query.lab + '/'+query.netid+upload_suffix;
	console.log("trying to determine status of " + upfile);
	fs.stat(upfile, function (err, stats) {
			var info = {};
			info['lab'] = query.lab;
			info['netid'] = query.netid;
			info['uid'] = query.uid;
			if (!err) {
				info['submitMsg'] = ' submitted on ' + stats.mtime;
			}else{
				info['submitMsg'] = ' not submitted ';
			}
			res.json(info);
	});
};

exports.error = function(req, res, errno) {
	res.status(errno);
	res.render('error', {title: errno});
};

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.submit = function(req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var netid = (typeof query.netid === "undefined")? "" : query.netid;
	var uid = (typeof query.uid=== "undefined")? "" : query.uid;
	if (query.lab >=1 && query.lab <= 7) {
		res.render('submit', {title: query.lab, netid: netid, uid: uid});
	}else{
		error(req, res, 200);
	}
};

exports.upload = function(req, res) {
	if (req.body.lab < 1 || req.body.lab <= 7) {
		routes.error(req, res, 200);
		return;
	}

	var tmp_path = req.files.upfile.path;
	
	//check it has the right suffix
	if (tmp_path.match(upload_suffix+"$")) {
		console.log('matching suffix');
	} else {
		console.log('incorrect upload file suffix');
		error(req, res, 500);
		return;
	}

	var target_path = upload_dir + '/lab' + req.body.lab + '/' + req.body.netid + upload_suffix;
	console.log('try to rename ' + tmp_path + ' to ' + target_path);
	fs.rename(tmp_path, target_path, function(err) {
			if (err) throw err;
			console.log('file uploaded');
			res.redirect('submit?lab=1&netid=xxx&uid=yyy');
	});

};

