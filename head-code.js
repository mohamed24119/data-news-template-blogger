const supportsTouch = window.matchMedia("(pointer:coarse)").matches;
let first_mouse_move = false;
let empty_event = false;
let touch_start = false;
let scroll_status = false;

let items_group = "",
	post_title = "",
	post_url = "",
	post_thumbnail = "",
	post_published = "",
	convert_date = "",
	check_month_number = "",
	AM,
	PM,
	week,
	month_m,
	hour_system_24 = false;
const new_date = new Date();
if(document.documentElement.lang == "ar"){
AM = "ص";
PM = "م";
week = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
month_m = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
} else  {
AM = "AM";
PM = "PM";
week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
month_m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
}




function fun_blogger_variables(data,item) {
	post_title = item.title.$t;
    post_url = item.link[4].href;
	if(item.media$thumbnail){post_thumbnail = item.media$thumbnail.url}
	else{post_thumbnail = default_thumbnail;}
	post_published = item.published.$t;
	convert_date = post_published.split("T")[0].split("-");
	if (convert_date[1] < 10) {check_month_number = convert_date[1].split("")[1]-1;} 
	else { check_month_number = convert_date[1]+1;}
}
function fun_items_group(data,item){
 items_group += `
       <div class="col">
        <article class="article-posts">
         <div class="article-posts-img">
          <a href="${post_url}"><img data-src="${post_thumbnail}" alt="${post_title}"></a>
         </div>
         <div class="article-posts-body">
          <h2 class="line posts-headding"><a class="posts-title" href="${post_url}">${post_title}</a></h2>
          <time class="post-published" data-time="${post_published}">
           <i class="fa-regular fa-calendar-days"></i>
           ${convert_date[2]} ${month_m[check_month_number]} ${convert_date[0]}
          </time>
         </div>
        </article>
       </div>
 `;
}



function get_file_css(_select_element, _link) {
    let create_link = document.createElement("link");
    create_link.setAttribute("rel", "stylesheet");
    create_link.setAttribute("href", _link);
    document.querySelector(_select_element).appendChild(create_link);
}


function get_file_script(_select_element, _link) {
    let create_script_src = document.createElement("script");
    create_script_src.setAttribute("src", _link);
    document.querySelector(_select_element).appendChild(create_script_src);
}

console.table({
"اسم القالب":"داتا نيوز التيمت",
"الإصدار":"2.0.0",
"تاريخ اخر تحديث":"29/9/2023",
"المنصة":"بلوجر",
"السعر":"5$",
"برمجة":"Mohamed Refaat",
"صفحة المطور":"https://www.facebook.com/mohamed24119",
"الناشر":"الفنان ويب",
"صفحة الناشر":"https://alfanan-developer-wep.blogspot.com"
});
