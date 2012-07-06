var currWindow = Titanium.UI.currentWindow
var send_id = currWindow.send_;
var send_name = currWindow.sendtitle_;
var send_image = currWindow.sendimage_;
/*alert(send_id);
alert(send_image);
alert(send_name);*/
/*
var nextBtn = Titanium.UI.createButton({  
    title:'HOME',
    height: 25,
    width : 60
});
currWindow.add(nextBtn);

nextBtn.addEventListener('click', function(data)
{
    Ti.API.info("got click event");
    Ti.API.info(currWindow.rootWindow);
    
    // close the parent, then self to pop back to top
    currWindow.navGroup.close(currWindow._parent);
    currWindow.navGroup.close(currWindow);
});
*/
var large_image = Ti.UI.createImageView({
	image: send_image,
	top: 10,
	width: Ti.Platform.displayCaps.platformWidth,
	height: 300
});
currWindow.add(large_image);

var sendbtn1 = Ti.UI.createLabel({
			text:'Send this eCard', 
    		textAlign:'center',
    		top: 10,
    		width:Ti.Platform.displayCaps.platformWidth,
    		height: 50
});	
currWindow.add(sendbtn1);
sendbtn1.addEventListener('click', function(data)
{
   var data = {
   	to: send_id,
   	type: "photo",
    name: send_name,
    message: "Have an awesome birthday, This is where the template desc goes",
    caption: send_name,
    picture: send_image,
    description: "Have an awesome birthday, This is where the template desc goes"
};
Titanium.Facebook.dialog("feed", data, function(e) {
    if (e.success) {
        alert("Success!  From FB: " + e.result);
    } else {
        if (e.error) {
            alert(e.error);
        } else if (e.cancelled) {
            alert('Cancelled');
        } else {
            alert("Unkown result");
        }
    }
});
   
});
