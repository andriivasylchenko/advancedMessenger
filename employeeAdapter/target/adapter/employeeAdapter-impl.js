function getRating() {

	var endpoint = MFP.Server.getPropertyValue("endpoint");
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : endpoint
	};

	return MFP.Server.invokeHttp(input);
}