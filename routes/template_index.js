

/*
 * GET home page.
 */

var lab_id_min = 1;
var lab_id_max = __num_labs__;

var fs = require('fs');
var url = require('url');

var upload_dir = '/tmp';
var full_suffix = '__suffix__';
var last_suffix = full_suffix.match(/[^\.]+$/g);
exports.set_param_upload_dir = function(x) {
    upload_dir = x;
};
exports.set_param_upload_suffix = function(x) {
    full_suffix = x;
    last_suffix = full_suffix.match(/[^\.]+$/g);
};

function validate_user(netid, uid) {
    return true;
};

exports.getstatus = function(req, res) {
    var url_parts = url.parse(req.url, true);
    var  query = url_parts.query;
    var upfile = upload_dir + '/lab' + query.lab + '/' + query.netid + '.' +
        full_suffix;
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

error = function(/*req, */res, errno, err_msg) {
    res.status(errno);
    res.render('error', { title: err_msg });
};

exports.index = function(req, res){
    res.render('index', { title: 'Express' })
};

extract_lab_num = function(lab) {
    var lab_str = lab.toString();
    var lab_res = lab_str.match(/^\d+[a-zA-Z]?$/g);
    var lab_num = -1;
    if (lab_res) {
        last_char = lab_str.charAt(lab_str.length - 1);
        if (('a' <= last_char && last_char <= 'z') || ('A' <= last_char && last_char <= 'Z'))
            lab_num = parseInt(lab_str.substr(0, lab_str.length - 1), 10);
        else
            lab_num = parseInt(lab_str, 10);
    }
    return lab_num;
};

exports.submit = function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var netid = (typeof query.netid === "undefined")? "" : query.netid;
    var uid = (typeof query.uid === "undefined")? "" : query.uid;
    var lab_num = extract_lab_num(query.lab);
    if (lab_num >= lab_id_min && lab_num <= lab_id_max) {
        res.render('submit', {title: query.lab, netid: netid, uid: uid});
    }else{
        error(/*req, */res, 200, 'Invalid Lab Number');
    }
};

exports.upload = function(req, res) {
    var lab_num = extract_lab_num(req.body.lab);
    if (lab_num < lab_id_min || lab_num > lab_id_max) {
        error(/*req, */res, 200, 'Invalid Lab Number');
        return;
    }

    if (!req.files.upfile) {
        error(/*req, */res, 200, 'No file selected');
        return;
    }

    var tmp_path = req.files.upfile.path;

    //check it has the right suffix
    var regex = new RegExp('.*\\.' + last_suffix + '$');
    if (tmp_path.match(regex)) {
        console.log('matching suffix');
    } else {
        console.log('incorrect upload file suffix');
        error(/*req, */res, 500, 'Incorrect Upload File Suffix, should be *.'
                + last_suffix);
        return;
    }

    var target_path = upload_dir + '/lab' + req.body.lab + '/' + req.body.netid
        + '.' + full_suffix;
    rename_cb = function(err) {
        if (err) {
            console.error('lab: ' + req.body.lab + ', netid: ' + req.body.netid +
                    ', status: fail');
            error(/*req, */res, 500, 'Uploading failed');
        }
        else {
            console.error('lab: ' + req.body.lab + ', netid: ' + req.body.netid +
                    ', status: succ');
            res.redirect('submit?lab=' + req.body.lab + '&netid=' +
                    req.body.netid + '&uid=' + req.body.uid);
        }
    };
    fs.rename(tmp_path, target_path, rename_cb);
    console.error('lab: ' + req.body.lab + ', netid: ' + req.body.netid +
            ', status: submit');
};

