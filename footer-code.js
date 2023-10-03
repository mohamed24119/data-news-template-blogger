/* السنة الحالية */
const footYear = document.querySelector("#footYear");
footYear.innerText = new_date.getFullYear();

/* الوقت والتاريخ الحالي */
const current_date_text = document.querySelector("#current_date_text");
const time_now_number = document.querySelector("#time_now_number");
if (current_date_text !== null) {
    current_date_text.innerHTML = `${week[new_date.getDay()]} ${new_date.getDate()} ${month_m[new_date.getMonth()]} ${new_date.getFullYear()}`;
}
if (time_now_number !== null) {
    function update_time() {
        const currentTime = new Date();
        let hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        let amPm = "";
        if (hour_system_24 === false) {
            amPm = hours >= 12 ? PM : AM;
            hours = hours % 12;
            hours = hours ? hours : 12;
        }
        if (hour_system_24 === false) {
            let check_minutes = `${minutes < 10 ? "0" : ""}${minutes}`;
            let check_seconds = `${seconds < 10 ? "0" : ""}${seconds}`;
            time_now_number.textContent = `${hours}:${check_minutes}:${check_seconds} ${amPm}`;
        } else {
            time_now_number.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }
    setInterval(update_time, 1000);
    update_time();
}

/* فتح قائمة الأقسام */
navbarOpen.addEventListener("click", function () {
    navbar.classList.add("active"), navbarClose.classList.add("active");
});
/* إغلاق قائمة الأقسام */
navbarClose.addEventListener("click", function () {
        navbar.classList.remove("active"), this.classList.remove("active");
});

/* قائمة منسدلة */
const dropdowns = document.querySelectorAll(".dropdown");
if (dropdowns !== null) {
    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener("click", function (event) {
            if (dropdown.classList.contains("active")) {
                dropdown.classList.remove("active");
            } else {
                dropdown.classList.add("active");
            }
        });
    });
}

/* فتح وإغلاق صندوق البحث */
const search_site = document.querySelector("#search-site");
const search_close = document.querySelector("#close-search");
searchOpen.addEventListener("click", function () {
    search_site.classList.add("active");
});

search_close.addEventListener("click", function () {
    search_site.classList.remove("active");
});


/* زر الصعود لأعلى */
const up_button = document.querySelector("#up_button");
function top_page_toggle_active() {64 < document.documentElement.scrollTop ? up_button.className = "active" : up_button.classList.remove("active")}
window.addEventListener("scroll", function() {top_page_toggle_active()});
up_button.addEventListener("click", function() {document.documentElement.scrollTop = 0});

/* إزالة المشاركة المميزة إذا كانت هي الصفحة الحالية */
const widgetFeaturedPost_empty = document.querySelector(".widget-featured-post");
if (widgetFeaturedPost_empty !== null) {
    if (widgetFeaturedPost_empty.childElementCount == 0) {
        widgetFeaturedPost_empty.parentElement.remove();
    }
}





/* تأجيل الصور والإطارات */
function get_lazyload() {
    const data_src = document.querySelectorAll("[data-src]");
    if (data_src != null) {
        for (let i = 0; i < data_src.length; i++) {
            if (data_src[i].getBoundingClientRect().top < window.innerHeight) {
                data_src[i].setAttribute("src", data_src[i].getAttribute("data-src"));
                data_src[i].removeAttribute("data-src");
            }
        }
    }
}



/* الأقسام المخصصة في الرئيسية */
const $parent_element = document.querySelectorAll("[data-posts-count]");
if($parent_element.length > 0) {
	for(let i = 0; i < $parent_element.length; i++) {
		let data_posts_count = $parent_element[i].getAttribute("data-posts-count");
		if(data_posts_count > 0) {
			function fun_fetch_posts(){
				let data_start_index = "",
					data_max_results = "",
                    data_class_name = "",
                    $fetch_url = "",
                    data_label_name = "",
                    widget_header = "";
					
				if($parent_element[i].hasAttribute("data-start-index")) {data_start_index = $parent_element[i].getAttribute("data-start-index");} 
				else {data_start_index = 1;}

				if($parent_element[i].hasAttribute("data-max-results")) {max_results = $parent_element[i].getAttribute("data-max-results");} 
				else {data_max_results = 100;}

				if($parent_element[i].hasAttribute("data-class-name")) {data_class_name = $parent_element[i].getAttribute("data-class-name");} 
				else {data_class_name = "grid grid-3";}

				let data_widget_title = $parent_element[i].getAttribute("data-widget-title");

				if($parent_element[i].classList.contains("last-posts")) {
				    if($parent_element[i].hasAttribute("data-random-posts") && $parent_element[i].getAttribute("data-random-posts") == "true") {
						let data_random_posts = $parent_element[i].getAttribute("data-random-posts");
						$fetch_url = `${location.origin}/feeds/posts/default/?alt=json&max-results=${data_max_results}&start-index=${data_start_index}`;
	
						if($parent_element[i].hasAttribute("data-widget-title") && data_widget_title != "") {
							widget_header = `<div class="widget-header"><a class="widget-title" href="${window.location.origin}/search/">
							<i class="icon fa-solid fa-random"></i> ${data_widget_title}</a></div>`;
						} 
					}
					else {
						$fetch_url = `${location.origin}/feeds/posts/default/?alt=json&max-results=${data_posts_count}&start-index=${data_start_index}`;
						if($parent_element[i].hasAttribute("data-widget-title") && data_widget_title != "") {
							widget_header = `<div class="widget-header"><a class="widget-title" href="${window.location.origin}/search/">
							<i class="icon fa-solid fa-arrows-rotate"></i> ${data_widget_title}</a></div>`;
						}
					}
				}
				
				else if($parent_element[i].classList.contains("last-posts-label")) {
					data_label_name = $parent_element[i].getAttribute("data-label-name");

					function fun_check_label_name($icon){
						if($parent_element[i].hasAttribute("data-widget-title") && data_widget_title != "") {
							widget_header = `<div class="widget-header"><a class="widget-title" href="${window.location.origin}/search/label/${data_label_name}">
							<i class="${$icon}"></i> ${data_widget_title}</a></div>`;
						} else {
							widget_header = `<div class="widget-header"><a class="widget-title" href="${window.location.origin}/search/label/${data_label_name}">
							<i class="${$icon}"></i> ${data_label_name}</a></div>`;
						}
					}
					if($parent_element[i].hasAttribute("data-random-posts") && $parent_element[i].getAttribute("data-random-posts") == "true") {
						let data_random_posts = $parent_element[i].getAttribute("data-random-posts");
						$fetch_url = `${location.origin}/feeds/posts/default/-/${data_label_name}?alt=json&max-results=${data_max_results}&start-index=${data_start_index}`;
						fun_check_label_name("icon fa-solid fa-random");

					}
					else {
						$fetch_url = `${location.origin}/feeds/posts/default/-/${data_label_name}?alt=json&max-results=${data_posts_count}&start-index=${data_start_index}`;
						fun_check_label_name("icon fa-solid fa-tag");
					}
				}
				
				fetch($fetch_url).then(function(response) {return response.json()})
				.then(function(data) {
					items_group = "";
					let items = data.feed.entry;
					if($parent_element[i].hasAttribute("data-random-posts") && $parent_element[i].getAttribute("data-random-posts") == "true") {
						let itemsArray = [];
						while(itemsArray.length < data_posts_count && itemsArray.length < items.length) {
							let randomIndex = Math.floor(Math.random() * items.length);
							let randomItem = data.feed.entry[randomIndex];
							if(!itemsArray.includes(randomItem)) {
								itemsArray.push(randomItem);
								fun_blogger_variables(data, randomItem);
								fun_items_group(data, randomItem);
							}
						}
					}
	
					else {
						for(let i = 0; i < data.feed.entry.length; i++) {
							let item = data.feed.entry[i];
							fun_blogger_variables(data, item);
							fun_items_group(data, item);
						}
					}
	
					$parent_element[i].style.minHeight = "auto";
					$parent_element[i].innerHTML = `<div class="widget">${widget_header}<div class="widget-body blog-posts ${data_class_name}">${items_group}</div></div>`;
					console.log(data);
					get_lazyload();
				});
			} // fun_fetch_posts

				if ($parent_element[i].getBoundingClientRect().top < window.innerHeight) {fun_fetch_posts();} 
				else {
					function fun_posts_lazyload() {
						let element_lazyload = $parent_element[i].getBoundingClientRect();
						let window_height = window.innerHeight;
						if (element_lazyload.top < window_height) {fun_fetch_posts();document.removeEventListener("scroll", handleScrollEvent);}
					}
					fun_posts_lazyload();
					function handleScrollEvent() { fun_posts_lazyload() }
					document.addEventListener("scroll", handleScrollEvent);
				}



		} // end if
	} // end for
} // end if


/*--------------- قص الصور ---------------*/ 
function crop_thumbnails(){
	let blog_posts = document.querySelectorAll(".blog-posts");
	for (let i = 0; i < blog_posts.length; i++) {
	    let article_posts_img = blog_posts[i].querySelectorAll(".article-posts-img img");
	    for (let u = 0; u < article_posts_img.length; u++) {
	        let img_width = article_posts_img[u].parentElement.parentElement.clientWidth;
	        let img_height = article_posts_img[u].parentElement.parentElement.clientHeight;
	        article_posts_img[u].src = article_posts_img[u].src.replace("s72-c",`w${img_width}-rw-h${img_height}-rw-p-k-no-nu`);
	        article_posts_img[u].width = img_width;
	        article_posts_img[u].height = img_height;
	    }
	}
}
