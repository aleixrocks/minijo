
var google_adnum = 0;

 function google_ad_request_done(google_ads) {

 var s = '';
 var i;

 if (google_ads.length == 0) {
 return;
 }

if (google_ads[0].type == "html") {

 s += google_ads[0].snippet;

 } else {

 if (google_ads.length < 2) {
   s += '<a href=\"' + google_info.feedback_url + '\" class="adsBy"  target="_blank">Avisos Google</a>';
   s +='<li><a target="_blank" href="'+google_ads[0].url +'" class="titleUrl" style="display:inline;"><span><b>'+google_ads[0].line1 + '</b></span></a> <br/>'+
	'<span class="urlAds"><a target="_blank" href="'+google_ads[0].url +'" class="url">'+google_ads[0].visible_url +'</a></span><span> - </span><span class="desc">'+google_ads[0].line2 +' '+google_ads[0].line3 +'</span></li>';

 } else if (google_ads.length > 1) {

 s += '<a href=\"' + google_info.feedback_url + '\" class="adsBy"  target="_blank">Avisos Google</a>';

 s +='<div class="byGoogle topAds"><ul>';
 for(i = 0; i < google_ads.length; ++i) {
   s +='<li><a target="_blank" href="'+google_ads[i].url +'" class="titleUrl" style="display:inline;"><span><b>'+google_ads[i].line1 + '</b></span></a><br/> '+
	'<span class="urlAds"><a target="_blank" href="'+google_ads[i].url +'" class="url">'+google_ads[i].visible_url +'</a></span><span> - </span><span class="desc">'+google_ads[i].line2 +' '+google_ads[i].line3 +'</span></li>';
 }
 s +='</ul></div>';


if (google_ads[0].bidtype == "CPC") {  
google_adnum = google_adnum + google_ads.length;
}
 }
     }

     document.write(s);
     return;
   }
