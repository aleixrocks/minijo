String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}

ch_ad_url = '';
ch_oeh = window.onerror;
ch_chitika_loaded = true;
ch_loaded = 0;
ch_meta_vars = new Array('codev','lat','lon');
ch_amm_version = "1.0";
ch_osnap_loaded = 0;

function dq(s) { return (s != null) ? '"' + s + '"' : '""'; }
function ch_au(p,v) { if (v) { window.ch_ad_url += '&' + p + '=' + v; } }
function ch_aue(p,v) { if (v) { ch_au(p,escape(v)); } }
function ch_def(v, def) { return (v) ? v : def; }

function ch_ad_render_ecpm() {
    var w = window;
    if(typeof(w["ch_mmhtml"])!="undefined") {
        var thehtml = w.ch_mmhtml["output"];
        if (thehtml && thehtml.indexOf("<ROLLUP>") == -1) {
            ch_decision(true);
            return;
        }
    }
    ch_decision(false);
}

function ch_ad_render_search() {
    var w = window;
    if(typeof(w["ch_mmhtml"])!="undefined") {
        var thehtml = w.ch_mmhtml["output"];
        if (thehtml) {
            ch_decision(true);
            return;
        }
    }
    ch_decision(false);
}

function ch_ad_locate(obj) {
    var objPos = {'x':0,'y':0};
    try {
        if(obj.offsetParent) {
            while(1) {
                objPos.x += obj.offsetLeft;
                objPos.y += obj.offsetTop;
                if(!obj.offsetParent) { break; }
                obj = obj.offsetParent;
            }
        } else if(obj.x && obj.y) {
            objPos.x += obj.x;
            objPos.y += obj.y; 
        }
    } catch (err) {
        objPos.x = -1;
        objPos.y = -1;
    }
    return objPos;
}

function ch_get_snippet(){
    try{
        var snippetPriority = new Array('title', 'h1', 'meta');
        var snippetCount = 1;
        var snippetMaxLength = 100;
        var snippetData = new Array();

        if (document.getElementsByTagName){
            var metaTags = document.getElementsByTagName('meta');
            for(var meta=0; meta<metaTags.length-1; meta++){
                snippetData[metaTags[meta].getAttribute('name').toLowerCase()] = metaTags[meta].getAttribute('content');
            }
            if (document.title){ snippetData['title'] = document.title; }
            if (document.getElementsByTagName('h1').length > 0) { snippetData['h1'] = document.getElementsByTagName('h1')[0].innerHTML.replace(/(<([^>]+)>)/ig, '') }
        }
        var snipCount = 0;
        for ( var snip in snippetPriority ) {
            if (snipCount >= snippetCount) { break; }
            var snippet = snippetPriority[snip];
            if (snippetData[snippet]) {
                snipCount++;
                ch_aue('snip_' + snippet, snippetData[snippet].substring(0, snippetMaxLength));
            }
        }
    }catch(err){}
}

function ch_get_style(x, styleProp) {
    if (x.currentStyle) {
        return x.currentStyle[styleProp];
    } else if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
    }
}

function append_func(o, a) {
    return function (e) {
        if (typeof(o) == "function") { o(e); }
        return a(e);
    };
}

function ch_write_iframe(f, thehtml, thejs,r, width, height) {
    var w = window;

    var d = w.ch_dim["ch_ad"+r];
    if (typeof(f) == "undefined"){
        return; //f was undefined crashing Chrome for Mac.
    } 
    if (thejs){
        var headID = document.getElementsByTagName("head")[0];
        if (headID){
            if(typeof jQuery != 'function'){
                var jquery = document.createElement('script');
                jquery.type = 'text/javascript';
                jquery.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
                headID.appendChild(jquery);
            }

            if (typeof(adFocused) == "undefined"){
                var myjs = document.createElement('script');
                myjs.type = 'text/javascript';
                myjs.src = thejs;
                headID.appendChild(myjs);
            }
        }
    }

    var fobj = document.createElement("iframe");
    var _id = "ch_ad_ctr"+r;
    fobj.src = "about:blank";
    try {fobj.contentWindow.document.designMode = "on";} catch (e) {}
    fobj.border = "0";
    fobj.style.margin = fobj.style.padding = fobj.style.border= 0;
    fobj.padding = "0";
    fobj.frameBorder = 0;
    fobj.marginWidth = 0;
    fobj.marginHeight = 0;
    fobj.vspace = 0;
    fobj.hspace = 0;
    fobj.scrolling = "no";
    fobj.setAttribute("class", "chitikaAdBlock");
    fobj.setAttribute("allowTransparency", "allowTransparency");
    fobj.setAttribute("name", _id);
    fobj.setAttribute("id", _id);

    // If we specified fluid width
    var fctr = document.createElement("div");	// Create a container div
    fctr.style.position = 'relative';
    fctr.appendChild(fobj);
    if(d[6]){
        try{
            try{fctr.style.zoom = 1;}catch(e){}		// Makes IE6 behave. Zoom is not a standard property, so suppress any possible errors in other browsers
            fctr.style.width = "auto";				// Width auto and overflow hidden trigger a special box rendering mode, which causes
            fctr.style.overflow = "hidden";			// the element to not flow under floated elements
            fobj.style.width = "100%";				// Thus allowing us to specify 100% width on the iframe without breaking the page
        }catch(e){}
    }
    // If we specified fluid height
    if(d[7]){
        try{
            // The function we use to resize
            var ch_resize_height = function() {
                try{ 
                    _height = (((navigator.userAgent.match(/Chrome/) || navigator.userAgent.match(/Safari/)) ? (fobj.contentWindow.document.body.offsetHeight) : fobj.contentWindow.document.body.offsetHeight)); 
                    if(!fobj.bResizeSet) {
                        if(w.addEventListener){
                            fobj.contentWindow.onresize = append_func(fobj.contentWindow.onresize, fobj.onload);
                        }else{
                            fobj.contentWindow.attachEvent("onresize", fobj.onload);
                        }
                        fobj.bResizeSet = true;
                    }
                    fobj.style.height = "" + _height + "px";
                }catch(e){ } 
                return true;
            }
            if(window.addEventListener){ // This is the standardized method, but...
                fobj.onload = append_func(fobj.onload, ch_resize_height); // We can assign functions directly
                w.onresize = append_func(w.onresize, ch_resize_height);
            }else{ // IE doesn't use the standardized function
                fobj.attachEvent("onload", append_func(fobj.onload, ch_resize_height)); // And we have to use attachEvent, because it doesn't like
                w.attachEvent("onresize",  append_func(w.onreszize, ch_resize_height)); // direct assignment of onload.
                fobj.ch_resize = ch_resize_height;
            }
        }catch(e){}
    }

    var tries = 0;
    var interval;

    var checkDisplay = function() {
        if (typeof(f) == "undefined" || f == null){
            w.clearInterval(interval);
            return;
        }
        if (tries++ > 70) {
            w.clearInterval(interval);
        }
        var p = fobj;
        noDisplayNone = true;
        while (p != null) {
            try {
                st = ch_get_style(p, "display");
                if (st == "none") {
                    noDisplayNone = false;
                    break;
                }
            } catch(e) {}
            p = p.parentNode;
        }
        try{ p = f.parentNode; } catch(e){return;}
        if (noDisplayNone) {
            w.clearInterval(interval);
            if (width && height) {
                fobj.width = width;
                fobj.height = height;
            } else {
                fobj.width = d[0];fobj.height = d[1];
            }
            if(typeof(fctr) != "undefined"){
                f.parentNode.insertBefore(fctr,f);
            }else{
                f.parentNode.insertBefore(fobj,f);
            }
            try{
                if(d[8] && d[8].length > 0) {
                    fobj.contentWindow.ch_extra_pins = d[8];
                    var ch_imp_pins = function() {
                        if(d[8] && d[8].length > 0 && fobj.contentWindow.ImportPins) {
                            fobj.contentWindow.ImportPins(d[8]);
                        }
                    }
                    if(window.attachEvent) {
                        fobj.attachEvent('onload', ch_imp_pins); 
                    } else if(window.addEventListener) {
                        fobj.contentWindow.addEventListener('load', ch_imp_pins, false);
                    } else {
                        try {
                            fobj.onload = ch_imp_pins;
                        }catch(e){}
                    }
                }
                // ch_follow
                if(d[9]) {
                    fctr.style.display = 'block';
                    var ch_follow = function () {
                        if(typeof(this.moving) == 'undefined') this.moving = false;
                        if(typeof(this.prevScreen) == 'undefined') this.prevScreen = 0;
                        if(typeof(this.c) == "undefined") this.c = 0;
                        this.position = ch_ad_locate(this);
                        var screenY = 0;
                        if(typeof(window.pageYOffset) == 'number') {
                            screenY = window.pageYOffset;
                        }else if(document.body && document.body.scrollTop) {
                            screenY = document.body.scrollTop;
                        }else if(document.documentElement && document.documentElement.scrollTop){
                            screenY = document.documentElement.scrollTop;
                        }
                        if(this.prevScreen == screenY && !this.moving) return false;
                        this.prevScreen = screenY;
                        var baseY = this.position.y - this.offsetTop;
                        var dest = screenY - baseY;
                        var diff = dest - this.offsetTop;
                        var pos = this.offsetTop + Math.ceil(diff/16);
                        if(window.ch_follow_bottom) {
                            var bottom = window.ch_follow_bottom - this.offsetHeight;
                            if(pos > (bottom-baseY)) pos = (bottom-baseY);
                        }
                        if(pos < 0) pos = 0;
                        this.style.top = '' + pos + 'px';
                        this.moving = ((diff != 0 && dest >= 0) || (dest <= 0 && pos != 0) ? 1 : 0);
                    }
                    fctr.ch_follow = ch_follow;
                }
                var fdoc = fobj.contentWindow.document;
                fdoc.open();
                fdoc.write(thehtml);
                // setTimeout for a bug fix; for some reason the document's onload event doesn't fire if the containing element has position set, unless I add a delay...
                setTimeout(function() { fdoc.close(); window.ch_pending_requests--; }, 16);
                if(typeof(fobj.ch_resize) != "undefined") {
                    fobj.ch_resize();
                }
                if(typeof(fctr.ch_follow) != 'undefined') {
                    setInterval(function() { fctr.ch_follow() }, 16);
                }
            }catch(e){}
        }
    }
    interval = w.setInterval(checkDisplay, 100);
}

function ch_write_external_pixels(snurl){
    window.onload = append_func(window.onload, function (e) {
            var cFrame = document.createElement("iframe");
            cFrame.setAttribute("src", snurl);
            cFrame.name = "chExternalPixel";
            cFrame.style.display = "none";
            cFrame.style.width = "1px";
            cFrame.style.height = "1px";
            document.body.appendChild(cFrame);
            });
}

function ch_decision(render) {
    var w = window;
    var r = w.ch_mmhtml["cb"];
    var thehtml = w.ch_mmhtml["output"];
    var thejs = w.ch_mmhtml["js"];
    var f = document.getElementById("ch_ad"+r);
    if (!f) {return;}

    if (w.ch_mmhtml['osnap']) {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', 'http://scripts.chitika.net/eminimalls/osnap.js');
        document.getElementsByTagName('head')[0].appendChild(s);
    }

    if (w.ch_mmhtml["hover"]) {

        var ch_pg_head = document.getElementsByTagName("head")[0];
        w.ch_hover_content = w.ch_mmhtml["hover"]["html"];
        if(w.ch_mmhtml["hover"]["height"]) w.ch_mobile_height = w.ch_mmhtml["hover"]["height"];
        if(w.ch_mmhtml["hover"]["width"]) w.ch_mobile_width = w.ch_mmhtml["hover"]["width"];
        if(w.ch_mmhtml["hover"]["padding"]) w.ch_mobile_padding = w.ch_mmhtml["hover"]["padding"];
        var mobileJS = document.createElement('script');
        mobileJS.type = 'text/javascript';

        if (w.ch_mmhtml["hover"]["type"] === 'hover-iphone2' || w.ch_mmhtml["hover"]["type"] === 'hover-iphone-call') {
            mobileJS.src = 'http://labs.chitika.com/sandbox/m.js';
        } else if (w.ch_mmhtml["hover"]["type"] === 'hover-ipad') {
            mobileJS.src = 'http://scripts.chitika.net/mobile/js/ipad.js';
        } else if (w.ch_mmhtml["hover"]["type"] === 'hover-pc') {
            mobileJS.src = 'http://scripts.chitika.net/mobile/js/pc.js';
        } else {
            mobileJS.src = 'http://labs.chitika.com/sandbox/m.js';
            var mobileCSS = document.createElement('link');
            mobileCSS.type = 'text/css';
            mobileCSS.rel = 'stylesheet';
            mobileCSS.href = 'http://labs.chitika.com/sandbox/m.css';
            ch_pg_head.appendChild(mobileCSS);
        }
        ch_pg_head.appendChild(mobileJS);

    }

    if (w.ch_mmhtml["pixelhtml"]) {
        ch_write_iframe(f, "<html><body>" + w.ch_mmhtml["pixelhtml"] + "</body></html>", null, r, 1, 1);
    }
    if (w.ch_mmhtml["snurl"]){
        ch_write_external_pixels(w.ch_mmhtml["snurl"]);
    }

    if (thehtml && render) {
        ch_write_iframe(f, thehtml, thejs, r, null, null);
    } else {
        w.ch_pending_requests--;
        f.style.display = "none";
        ch_chitika_loaded = false;

        if (w.ch_mmhtml["alturl"]){
            if (f){
                var d = w.ch_dim["ch_ad"+r];
                var fobj = document.createElement("iframe");
                fobj.src = w.ch_mmhtml["alturl"];
                fobj.border = "0";
                fobj.style.margin = fobj.style.padding = fobj.style.border= 0;
                fobj.padding = "0";
                fobj.frameBorder = 0;
                fobj.marginWidth = 0;
                fobj.marginHeight = 0;
                fobj.vspace = 0;
                fobj.hspace = 0;
                fobj.scrolling = "no";
                fobj.setAttribute("class", "chitikaAdBlock");
                fobj.width = d[0];
                fobj.height = d[1];
                f.parentNode.insertBefore(fobj,f);
            }
        }
        else if (w.ch_mmhtml["rtbhtml"] && w.ch_mmhtml["rtbhtml"] != ""){
            s=document.createElement("script");
            s.type = "text/javascript";
            s.src = w.ch_mmhtml["rtbhtml"];
            if (f){
                document.getElementsByTagName("head")[0].appendChild(s);
                window["bid_" + r] = function(data){
                    if (typeof data.result.ad == "string" && data.result.ad != ""){
                        var d = w.ch_dim["ch_ad"+r];
                        var fobj = document.createElement("iframe");
                        fobj.src = data.result.ad;
                        fobj.border = "0";
                        fobj.style.margin = fobj.style.padding = fobj.style.border= 0;
                        fobj.padding = "0";
                        fobj.frameBorder = 0;
                        fobj.marginWidth = 0;
                        fobj.marginHeight = 0;
                        fobj.vspace = 0;
                        fobj.hspace = 0;
                        fobj.scrolling = "no";
                        fobj.setAttribute("class", "chitikaAdBlock");
                        fobj.width = d[0];
                        fobj.height = d[1];
                        f.parentNode.insertBefore(fobj,f); 
                    }
                };
            }
        }
        w.ch_default_render_fallback(r);
    }
}

function ch_default_render_fallback(r) {
    var w = window;
    var d = document;
    if (w["ch_render_fallback"]) {
        return w.ch_render_fallback(r);
    }
    var ow,owl,di,dobj,content,s;
    ow = document.write;
    owl = document.writeln;
    var f = d.getElementById("ch_ad"+r);
    di = w.ch_dim["ch_ad"+r];
    if (typeof(di[2]) == "undefined") {
        di[2] = function () {};
    }
    w.ch_alternate_ad_js = di[3];
    w.ch_alternate_ad_html = di[4];
    w.ch_alternate_ad_blank = di[5];

    if (!w.ch_alternate_ad_js && !w.ch_alternate_ad_html && !d[2] && !w.ch_alternate_ad_blank) {
        return;
    }
    dobj = d.createElement("div");
    if (f) {
        f.parentNode.insertBefore(dobj,f);
    }
    var dio = function () {
        if (f) {
            d.write = function (c) {dobj.innerHTML += c;};
            d.writeln = function (c) {d.write(c+"\n");};
        }
    };
    var dif = function () {
        d.write = ow;
        d.writeln = owl;
    };
    var load;
    if (w.ch_alternate_ad_js) {
        if (f) {
            load = function (e) {
                dio();
                di[2]();
                s=d.createElement("script");
                s.type = "text/javascript";
                s.src = w.ch_alternate_ad_js;
                f.parentNode.insertBefore(s,f);
            };
        } else {
            load = function (e) {
                dio();
                di[2]();
                d.write(unescape("%3Cscript%20type%3D%22text/javascript%22%20src%3D%22"+escape(w.ch_alternate_ad_js)+"%22%3E%3C/script%3E"));
            };
        }
    } else if (w.ch_alternate_ad_html) {
        load = function (e) {
            dio();
            di[2]();
            d.write(w.ch_alternate_ad_html);
            dif();
        };
    } else if (w.ch_alternate_ad_blank) {
        load = function (e) {
            dio();
            di[2]();
            d.write(unescape("%3Cdiv%20style%3D%22width%3A%20"+d[0]+"px%3Bheight%3A%20"+d[1]+"px%3Bborder%3A0%3Bmargin%3A0%3B%22%3E%3C/div%3E"));
            dif();
        };
    } else {
        load = function (e) {
            dio();
            di[2]();
        }
    }
    if (!ch_loaded && f) {
        w.onload = append_func(w.onload, load);
        dif();
    } else {
        load(0);
        if (!f) {
            dif();
        }
    }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        //while (c.charAt(0)==" ") c = c.substring(1,c.length);
        c = c.ltrim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "";
}

function append_domain(w){
    var domain = window.location.hostname;
    if (domain != null){
        var ar1 = /([^\.]+)\.(com|net|org|info|mobi|co\.uk|org\.uk|ac\.uk|uk)$/.exec(domain);
        if (ar1 && ar1[1]){
            w.ch_client = w.ch_client + '_' + ar1[1];
        }
    }
}

function ch_mm() {
    var w = window;

    if (w.ch_client == 'byethost11') {
        return;
    }

    if(w.ch_pending_requests === undefined) { w.ch_pending_requests = 0; }
    w.ch_pending_requests++;
    w.ch_SAF = navigator.userAgent.toLowerCase().indexOf("safari") != -1;
    w.ch_referrer = document.referrer;

    var m = String(window.location.href).match(/#adpro-(.+?)_(.+)$/);
    if (m) {
        var wi = ch_def(w['ch_width'],'728');
        var he = ch_def(w['ch_height'],'90');
        var f = wi+'x'+he;
        var s = ch_def(w['ch_sid'], '-').toLowerCase();
        if (m[1] == f && unescape(m[2].toLowerCase()) == s) {
            document.write(unescape("%3Ciframe%20name%3D%22adprotest%22%20width%3D%22"+wi+"%22%20height%3D%22"+he+"%22%20frameborder%3D%220%22%20src%3D%22http%3A//scripts.chitika.net/static/adpro.html%22%20marginwidth%3D%220%22%20marginheight%3D%220%22%20vspace%3D%220%22%20hspace%3D%220%22%20allowtransparency%3D%22true%22%20scrolling%3D%22no%22%3E%3C/iframe%3E"));
            return;
        }
    }

    var m = String(window.location.href).match(/#chitikatest=(.+)/);
    w.ip = false;
    if (m) {
        w.ip = 'us';
        w.ch_referrer = "http://www.google.com/search?q="+m[1];
    } else if (String(window.location.href).match(/#chitikatest/)) {
        w.ip = 'us';
        w.ch_referrer = "http://www.google.com/search?q=mortgage";
    }
    if (w.ch_non_contextual == "4" && w.ch_vertical == "premium" && !w.ch_alternate_ad_url && !w.ch_backfill){
        w.ch_search_referral = 1;
    }

    if (w.ch_search_referral && typeof(w.ch_behavior_window) == "undefined")
        w.ch_behavior_window = 1800;

    w.onerror = w.ch_oeh;
    var amm_host = ch_def(w.ch_host, "mm.chitika.net");

    w.ch_ad_url = 'http://' + amm_host + '/minimall?w=' + w.ch_width + '&h=' + w.ch_height;

    if (w.ch_append_tracking){ w.ch_client = w.ch_client + "_" + w.ch_append_tracking; }
    else if (w.ch_client == 'epodunk') { append_domain(w); }

    ch_screen = "" + screen.width + "x" + screen.height;
    if(navigator.appName.indexOf("Microsoft") != -1)
    {
        ch_window = "" + document.body.offsetWidth + "x" + document.body.offsetHeight;
        ch_canvas = "" + document.body.clientWidth + "x" + document.body.clientHeight;
    }else{
        ch_window = "" + window.outerWidth + "x" + window.outerHeight;
        ch_canvas = "" + document.body.clientWidth + "x" + document.body.clientHeight;
    }

    w.ch_cid = ch_def(ch_def(w.ch_cid, w.ch_sid), 'default');

    ch_aue('client', w.ch_client);
    ch_aue('accountid', w.ch_accountid);
    ch_aue('noctxt', w.ch_non_contextual);
    ch_aue('partner', w.ch_partner);
    ch_aue('sid', w.ch_sid);
    ch_aue('cid', w.ch_cid);
    ch_aue('provider', w.ch_provider);
    ch_aue('nump', w.ch_nump);
    ch_aue('query', w.ch_query);
    ch_au('ip', w.ip);
    if (w.ip) {
        ch_au('test', '1');
    }
    if(w.ch_local_enabled) w.ch_type = "map";
    if (w.ch_type) {
        ch_aue('type', w.ch_type);
        if (w.ch_queries && w.ch_queries.constructor.toString().indexOf("Array") != -1) {
            ch_aue('mquery', w.ch_queries.join('|'));
        } else if (w.ch_query) {
            ch_aue('mquery', w.ch_query);
        }
    }
    ch_aue('nobanners', w.ch_no_banners);
    if (w.ch_adpro_button) {
        ch_au('target_cookie', 'grfrzjvIfB');
    }
    ch_aue('tptracker', w.ch_third_party_tracker);
    ch_aue('defaulttab', w.ch_default_tab);
    ch_aue('defaultcat', w.ch_default_category);
    ch_aue('filtercat', w.ch_filter_category);
    ch_aue('filterin', w.ch_filter_in);
    ch_aue('filterout', w.ch_filter_out);
    ch_aue('cttarget', w.ch_target);
    ch_aue('att', w.ch_att);
    ch_aue('nosearch', w.ch_nosearch);
    ch_aue('searchref', w.ch_search_referral); 
    ch_aue('noprice', w.ch_noprice);
    ch_aue('noborders', w.ch_noborders);
    ch_aue('backfill',w.ch_backfill);
    ch_aue('vertical', w.ch_vertical);
    ch_aue('cl_border', w.ch_color_border);
    ch_aue('cl_bg', w.ch_color_bg);
    ch_aue('cl_title', w.ch_color_title);
    ch_aue('cl_text', w.ch_color_text);
    ch_aue('cl_site_link', w.ch_color_site_link);
    ch_aue('fn_title', w.ch_font_title);
    ch_aue('fn_text', w.ch_font_text);
    ch_aue('alturl', w.ch_alternate_ad_url);
    ch_aue('altcss', w.ch_alternate_css_url);
    ch_aue('ecpmiwant', w.ch_ecpm_i_want);
    ch_aue('udq', w.ch_udq);
    ch_aue('behavioral_window', w.ch_behavioral_window);
    ch_aue('previous_format',w.ch_previous_format);
    ch_aue('premium_search',w.ch_premium_search);
    ch_aue('tab_click',w.ch_tab_click);
    ch_aue('prefill_search',w.ch_prefill_search);
    ch_aue('tp',w.ch_tp);
    ch_aue('must_fill',w.ch_must_fill);
    ch_aue('target_pixel',w.ch_target_pixel);
    ch_aue('theme',w.ch_theme);
    ch_aue('retarget',w.ch_retarget);
    ch_aue('select',w.ch_select);
    ch_aue('auid', w.auid);
    ch_aue('screenres', w.ch_screen);
    ch_aue('winsize', w.ch_window);
    ch_aue('canvas', w.ch_canvas);
    ch_aue('extra_poi', w.ch_poi);
    ch_aue('mobile', w.ch_mobile);
    ch_aue('where', w.ch_where);
    ch_aue('frm', w.top.location != document.location ? 'true' : 'false');
    ch_aue('history', history.length);
    ch_aue('metro_id', w.ch_metro_id);
    ch_aue('city', w.ch_city);
    ch_aue('state', w.ch_state);
    ch_aue('zip', w.ch_zip);
    ch_au('impsrc', 'amm'+w.ch_amm_version);
    ch_aue('url', w.ch_pu);
    ch_aue('ref', w.ch_referrer);

    for (var i in ch_meta_vars){
        var k = "ch_" + ch_meta_vars[i];
        if (typeof(w[k]) != "undefined"){
            ch_aue(ch_meta_vars[i],(w[k]));
        }
    }

    if (w.ch_demo_mode == 1) {
        ch_au('ip', '71.248.173.210');
        ch_au('demomode', '1');
    }

    var r = Math.round(Math.random() * 1000);
    ch_au('cb', r);

    if (typeof(w.ch_dim) == "undefined") {
        w.ch_dim = {};
    }
    if (typeof(w.ch_bright) == 'undefined') {
        w.ch_bright = {};
    }
    // For list units we pass a string for height, which IE just hates. So, if we're passing a string, we'll fake it out
    // by passing 0. Height is resized by fluidH anyway.
    _dHeight = (typeof(w.ch_height) == "string" || typeof(w.ch_height) == "undefined") ? 0 : w.ch_height;
    w.ch_dim["ch_ad"+r] = [w.ch_width, _dHeight, w.ch_alternate_js_callback, w.ch_alternate_ad_js, w.ch_alternate_ad_html, w.ch_alternate_ad_blank, w.ch_fluidW, w.ch_fluidH, w.ch_extra_pins,w.ch_follow];
    w.ch_bright['ch_ad'+r] = {
        client:         w.ch_client,
        cid:            w.ch_cid,
        width:          w.ch_width,
        height:         _dHeight,
        altjscb:        w.ch_alternate_js_callback,
        altjsad:        w.ch_alternate_ad_js,
        althtml:        w.ch_alternate_ad_html,
        altblank:       w.ch_alternate_ad_blank,
        fluidW:         w.ch_fluidW,
        fluidH:         w.ch_fluidH
    };

    if (w.ch_search_referral) {
        if (!w.ch_allow_pixel && (w.ch_alternate_ad_js || w.ch_alternate_js_callback) && !String(w.ch_referrer).match(/(google|search.yahoo|search.msn|search.live|ask|search.aol|bing).com/)) {
            ch_clear();
            return ch_default_render_fallback(r);
        }
        w.onload = append_func(w.onload, function (e) {window.ch_loaded = 1;});
        ch_aue("required_text", "overture");
    }

    if (w.ch_previous_format){
        w.ch_previous_format = w.ch_previous_format + "," + w.ch_width + "x" + w.ch_height;
    } else {
        w.ch_previous_format = w.ch_width + "x" + w.ch_height;
    }

    document.write('<div id="chitikaAdBeacon-'+r+'"></div>');
    var adBeacon = document.getElementById("chitikaAdBeacon-"+r);
    var adLoc = ch_ad_locate(adBeacon);
    ch_aue("loc", adLoc.x + "," + adLoc.y);

    w.ch_ad_url = w.ch_ad_url.substring(0, 2048);
    w.ch_ad_url = w.ch_ad_url.replace(/%\w?$/, '');

    ch_get_snippet();

    // This will make all ads 'premium' so they collapse. - Detzel, 5.12.10
    w.ch_ad_url += "&output=simplejs&callback=" + (w.ch_ecpm_i_want ? "ch_ad_render_ecpm" : "ch_ad_render_search");
    w.ch_width = w.ch_height = 0;
    if (w.ch_hq){
        var s=document.createElement("script");
        s.type = "text/javascript";
        s.src = 'http://scripts.chitika.net/static/hq/'+w.ch_client+'.js';
        s.ch_ad_url = w.ch_ad_url;
        s._fired = false;
        try {
            s.onload = function() {
                if(this._fired) return;
                ch_real_ad_url = this.ch_ad_url;
                ch_hq_execute();
                this._fired = true;
            }
            s.onreadystatechange = function() {
                if(this._fired) return;
                if(this.readyState == "complete" || this.readyState == "loaded") {
                    ch_real_ad_url = this.ch_ad_url;
                    ch_hq_execute();
                    this._fired = true;
                }
            }
        }catch(e){}
        document.getElementsByTagName("head")[0].appendChild(s);
    } else {
        var s=document.createElement("script");
        s.type = "text/javascript";
        s.src = w.ch_ad_url;
        document.getElementsByTagName("head")[0].appendChild(s);
    }
    if(!w.ch_ad_urls) w.ch_ad_urls = [];
    w.ch_ad_urls['ch_ad'+r] = w.ch_ad_url;
    w.ch_last_ad_url = w.ch_ad_url;

    w.ch_ad_url = "about:blank";

    document.write('<ifr' + 'ame' + ' id="ch_ad'+r+'" name="ch_ad'+r+'"' + ' width=' + dq(w.ch_width) + ' height=' + dq(w.ch_height) + ' frameborder="0"' + ' src=' + dq(w.ch_ad_url) + ' marginwidth="0"' + ' marginheight="0"' + ' vspace="0"' + ' hspace="0"' + ' allowtransparency="true"' + ' scrolling="no">' + '</ifr' + 'ame>');
    ch_clear();
}

function ex_normal_op(){
    var s=document.createElement("script");
    s.type = "text/javascript";
    s.src = window.ch_real_ad_url;
    document.getElementsByTagName("head")[0].appendChild(s);
} 

function ch_eh(m,u,l) {
    ch_mm();
    return true;
}

function ch_clear() {
    var w = window;
    w.ch_pu = null;
    //w.ch_ad_url = null;
    w.ch_query = null;
    w.ch_type = null;
    w.ch_alternate_css_url = null;
    w.ch_alternate_ad_url = null;
    w.ch_sid = null;
    w.ch_cid = null;
    w.ch_nosearch = null;
    w.ch_noprice = null;
    w.ch_noborders = null;
    w.ch_backfill = null;
    w.ch_default_tab = null;
    w.ch_default_category = null;
    w.ch_filter_category = null;
    w.ch_vertical = null;
    w.ch_ecpm_i_want = null;
    w.ch_search_referral = null;
    w.ch_filter_in = null;
    w.ch_filter_out = null;
    w.ch_udq = null;
    w.ch_behavioral_window = null;
    w.ch_adpro_button = null;
    w.ch_post = null;
    w.ch_premium_search = null;
    w.ch_tab_click = null;
    w.prefill_search = null;
    w.ch_append_tracking = null;
    w.ch_tp = null;
    w.ch_must_fill = null;
    w.ch_target_pixel = null;
    w.ch_theme = null;
    w.ch_select = null;
    w.ch_auid = null;
    w.ch_local_enabled = null;
    w.ch_fluidW = null;
    w.ch_fluidH = null;
    w.ch_where = null;
    w.ch_city = null;
    w.ch_state = null;
    w.ch_zip = null;
    w.ch_extra_pins = null;
    w.ch_metro_id = null;
    w.ch_follow = null;
    w.ch_nump = null;

    for (var i in ch_meta_vars){
        var k = "ch_" + ch_meta_vars[i];
        if (typeof(w[k]) != "undefined"){
            w[k] = null;
        }
    }      
}

window.onerror = ch_eh;

if (window.ch_pu == null) {
    ch_pu = "" + document.location;
    if (window.ch_post != null){
        var post = document.getElementById(window.ch_post);
        if (post == null){ /* try reading the name? */ }
        else{
            if (post.value != null){    post = post.value;      }
            else{                       post = post.innerHTML;  }
        }
        if (post != null){
            post = post.replace(/\n/g,',').replace(/\s/g,' ');
            if (ch_pu.indexOf("?") >= 0){
                ch_pu = ch_pu + '&' + window.ch_post + '=' + escape(post);
            }
            else{
                ch_pu = ch_pu + '?' + escape(post);
            }
        }
    }
} else {
    ch_loc = document.location;
}

ch_mm();
