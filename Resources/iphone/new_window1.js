var currWindow = Titanium.UI.currentWindow;
var text_id = currWindow.reciever_id;
var text_name = currWindow.reciever_name;
var bb1 = Titanium.UI.createButtonBar({ 
	labels:['Stills', 'Videos'], 
	backgroundColor:'#2E5E93', 
	top:0, 
	height:45, 
	width:Ti.Platform.displayCaps.platformWidth
	}); 
currWindow.add(bb1);
var data=[];
var RegData = [
{ leftImage:'http://www.chapelhill-umc.com/uploads//2011/05/Happy-Birthday-God-Bless-You.jpg', title:"Happy Burpday" },
{ leftImage:'http://www.eastpennsd.org/teacherpages/dhinkel/myimages/BIRTHDAY%20CANDLES.jpg', title:"Birthday Bruin"},
{ leftImage:'http://www.momlifetoday.com/wp-content/uploads/2010/12/spiritual-birthdays-300x300.png', title:"Birthday Girl" },
{ leftImage:'http://daysofwhineandroses.com/wp-content/uploads/2011/07/birthday-present-11.jpg', title:"You Are Old" },
{ leftImage:'http://www.thesunsetballroom.com/images/birthdays.jpg', title:"Getting Older" },
{ leftImage:'http://images.nitrosell.com/product_images/10/2447/Birthday%20are%20good%20for%20you.jpg', title:"Man O Man" },
{ leftImage:'http://www.personalizationmall.com/cat_image/300/9761D-10172.jpg', title:"Happy Birthday" }
];

for (var i = 0; i < RegData.length; i++) {
	var row = Titanium.UI.createTableViewRow({
					width: Ti.Platform.displayCaps.platformWidth,
        			height: 100,
        			backgroundColor:'#2E5E93',
        			send_image: RegData[i].leftImage,
        			send_title: RegData[i].title,
        			send_id: text_id,
        			hasDetail:true,
        			hasChild: true
        		});
        		var sendimage = Titanium.UI.createImageView({
        			image: RegData[i].leftImage,
        			left: 5,
        			top: 25,
        			width: 50,
        			height:50,
        			borderWidth: 4,
        			borderColor: "#fff"
        		});
        		var sendname = Ti.UI.createLabel({
        			color:'#fff',
					text: RegData[i].title,
					font:{fontSize:25,fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: -25,
					left: 75
        		});
        		var previewlabel = Ti.UI.createLabel({
        			color:'#5CBBF4',
					text: 'preview >',
					font:{fontSize:20,fontFamily:'Helvetica Neue'},
					textAlign:'left',
					left: 75,
					top: 35
        		});
        		row.add(sendimage);
        		row.add(sendname);
        		row.add(previewlabel)
        		data.push(row);
       row.addEventListener('click',function(e) {
		var detailWindow = Ti.UI.createWindow( {
        title : 'Preview & send to'+text_name+'',
        layout : 'vertical',
        url: 'new_window2.js',
        send_ : e.row.send_id,
        sendtitle_ : e.row.send_title,
        sendimage_ : e.row.send_image,
        _parent: Titanium.UI.currentWindow,
        navGroup : currWindow.navGroup,
        rootWindow : currWindow.rootWindow 
    });
    
    currWindow.navGroup.open(detailWindow);
						 
				});
}


var TheTable = Ti.UI.createTableView({data:data,
	height:Ti.Platform.displayCaps.platformHeight,
	width: Ti.Platform.displayCaps.platformWidth
	});

currWindow.add(TheTable);

