function fetchStatus(lab, netid, uid) {
	if (netid.length === 0 || uid.length === 0) {
		return;
	}
	var uinfo = { lab: lab, netid: netid, uid: uid };
	$.ajax({url:"/ajax/getstatus?"+$.param(uinfo), 
			dataType: 'json',
		    success: function(data) {
		        $(".statustb").html('<p> Submission Status: ' + 'lab-'+data.lab + ' from ' + data.netid + ' ' + data.uid + ' <br> ' + data.submitMsg + ' ' );
		    },
			error: function() {
				$(".statustb").append(' ajax error!');
			}
	 });
}

$(document).ready(function() {
		$(".statustb").html(' <p>Submission Status: ');
		var lab = $('#myForm :input[name=lab]').val();

		fetchStatus(lab, $('#myForm :input[name=netid]').val(), $('#myForm :input[name=uid]').val());

		$('#myForm :input[name=netid]').change(function(){
			fetchStatus(lab, $('#myForm :input[name=netid]').val(), $('#myForm :input[name=uid]').val());
		});
		$('#myForm :input[name=uid]').change(function(){
			fetchStatus(lab, $('#myForm :input[name=netid]').val(), $('#myForm :input[name=uid]').val());
		});

});

