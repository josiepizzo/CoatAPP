//cloudinary.cloudinary_js_config()
$.cloudinary.config({ cloud_name: 'josiepizzo', api_key: '989437654536147'});

//var cloudinary_cors = "http://" + request.headers.host + "/cloudinary_cors.html";

//cloudinary.uploader.image_upload_tag('image_id', { callback: cloudinary_cors });

// $('.upload_form').append($.cloudinary.unsigned_upload_tag("mnfvlfwk", 
//  { cloud_name: 'josiepizzo' }));

$('.image_field').unsigned_cloudinary_upload("gcvazysc", 
  { cloud_name: 'josiepizzo' }
).bind('cloudinarydone', function(e, data) {
	console.log('data', data);
	$("#coaturl").val(data.result.url);
  	$('.coatimage').append($.cloudinary.image(data.result.public_id, 
    { format: 'jpg', width: 150, 
      crop: 'thumb', } ))}

);