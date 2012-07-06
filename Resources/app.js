Titanium.UI.setBackgroundColor('#5CBBF4');

var win1 = Titanium.UI.createWindow({  
    title:'Friends List',
    backgroundColor:'#5CBBF4'
});
var navGroup = Ti.UI.iPhone.createNavigationGroup( {
    window : win1
});

var flexSpace = Titanium.Facebook.createLoginButton({ 
	top: 50, 
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE 
	});
	//win1.setToolbar([flexSpace]);
	win1.setRightNavButton(flexSpace);
	Titanium.Facebook.appid = '147055008723952';
Titanium.Facebook.permissions = ['publish_stream','friends_birthday'];
Titanium.Facebook.addEventListener('login', function(e) {
    if (e.success) {
     //logged in thru the button
     user_loggedin();
    }
});
Titanium.Facebook.addEventListener('logout', function(e) {
    
});

Titanium.Facebook.authorize();
if(Titanium.Facebook.loggedIn)
{
	//logged in when app is init
	user_loggedin();
}

else
{


}
var data=[];
function user_loggedin()
{
	Titanium.Facebook.requestWithGraphPath('me/friends?fields=birthday,first_name,id', {}, 'GET', function(e) {
    if (e.success) {
        //alert(e.result);
        	var currentTime = new Date();
			var day = currentTime.getDate();
			var upcoming = new Array();
			var date_chop;	
			var month = currentTime.getMonth() + 1;
	
			//make it more uniform
			if(month < 10)
			{
		  		month = '0' + month;
			} 
			
			if(day < 10)
			{
		  		day = '0' + day;
			}
		
			var todays_date = month +"/"+ day;
			//alert(todays_date);
			
			var jsondata = JSON.parse(e.result);
			//alert(jsondata);
						  //do sort to get 
			function SortByBday(a, b){
			    var aName = a.bday;
			    var bName = b.bday; 
			    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
			}
        	//alert(jsondata.data.length);
        	for(var i=0;i<jsondata.data.length;i++ )
        	{
        		//remove undefined birthdays
        		if(jsondata.data[i].birthday === undefined)
        		{
        			//do nothing
        			//friend hasnt shared his permission with us
        		}
        		else
        		{
        			//insert into the array
        			datechop = jsondata.data[i].birthday.toString().substr(0,5);
        			//Titanium.API.info(datechop);
        			//get only greater than or equal to today
        			if(datechop >= todays_date)
        			{
        				upcoming.push({"bday":datechop,"id":jsondata.data[i].id,"name":jsondata.data[i].first_name});
        				
        			}
        			upcoming.sort(SortByBday);
        			//Titanium.API.info(upcoming);
        		}
        		//Titanium.API.info(upcoming.length);
        		
        	}
        	var upcoming_limit;
        	if (upcoming.length <= 30)
        	{
        		upcoming_limit = upcoming.length
        	}
        	else
        	{
        		upcoming_limit = 30;
        	}
        	for (var n=0;n< upcoming_limit ;n++)
        		{
        		var row = Ti.UI.createTableViewRow({
        			width: Ti.Platform.displayCaps.platformWidth,
        			height: 80,
        			backgroundColor:'#5CBBF4',
        			fb_reciever_id: upcoming[n].id,
        			fb_reciever_name: upcoming[n].name,
        			hasDetail:true,
        			hasChild: true
        		});
        		var fbimage = Titanium.UI.createImageView({
        			image:'http://graph.facebook.com/'+upcoming[n].id+'/picture',
        			left: 5,
        			top: 15,
        			width: 50,
        			height:50,
        			borderWidth: 4,
        			borderColor: "#fff"
        		});
        		var fbnamelabel = Ti.UI.createLabel({
        			color:'#2B588C',
					text:upcoming[n].name,
					font:{fontSize:25,fontFamily:'Helvetica Neue'},
					textAlign:'left',
					left: 75
        		});
        		var fbbdaylabel = Ti.UI.createLabel({
        			color:'#fff',
					text:upcoming[n].bday,
					font:{fontSize:25,fontFamily:'Helvetica Neue'},
					textAlign:'right',
					right: 15
        		});
        		row.add(fbimage);
        		row.add(fbnamelabel);
        		row.add(fbbdaylabel);
        		data.push(row);
        		//takes you to a new tab
        		row.addEventListener('click',function(e) {
						var detailWindow = Ti.UI.createWindow( {
        title : 'Select Wish for '+e.row.fb_reciever_name+'',
        layout : 'vertical',
        url: 'new_window1.js',
        reciever_id : e.row.fb_reciever_id,
        reciever_name : e.row.fb_reciever_name,
        _parent: Titanium.UI.currentWindow,
        navGroup : navGroup,
        rootWindow : win1
    });
    navGroup.open(detailWindow);
						 
				});
        		}
        	var table_data = Ti.UI.createTableView({data:data});
        	win1.add(table_data);
    } else if (e.error) {
        alert(e.error);
    } else {
        alert('Unknown response');
    }
	});
}
var baseWin = Titanium.UI.createWindow({  
    title:'BASE',
    backgroundColor:'#5CBBF4'
});

win1.navGroup = navGroup;
baseWin.add(navGroup);
baseWin.open();
var labels = Ti.UI.createLabel({});
