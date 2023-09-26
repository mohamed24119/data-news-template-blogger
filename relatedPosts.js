function get_related_posts(class_name,posts_count, max_results, label_name, widget_title) {
	let $related_posts = document.querySelector("#related-posts");
	if($related_posts !== null && (posts_count !== undefined || posts_count !== "")) {
		let $fetch_url = "";
		$fetch_url = `https://www.blogger.com/feeds/${blog_id}/posts/default/-/${label_name}?alt=json&max-results=${max_results}&start-index=1`;
		fetch($fetch_url)
		.then(function(response) {return response.json()})
		.then(function(data) {
			let items_group = "";
			let items_array = [];
			let items = data.feed.entry;
			while(items_array.length < posts_count && items_array.length < items.length) {
				let random_index = Math.floor(Math.random() * items.length);
				let item = items[random_index];
				if(!items_array.includes(random_index)) {
					items_array.push(random_index);
					let post_title = item.title.$t;
					let post_url = item.link[4].href;
					if(item.media$thumbnail && item.media$thumbnail.url) {post_thumbnail = item.media$thumbnail.url.replace("s72-c", "w200-h112-p-k-no-nu");} 
					else {post_thumbnail = default_thumbnail;}
					let post_published = item.published.$t;
					convert_date = post_published.split("T")[0].split("-");
					if(convert_date[1] < 10) {check_month_number = convert_date[1].split("")[1] - 1;} 
					else {check_month_number = convert_date[1] + 1;}
					if(window.location.href === post_url) {continue;}
					items_group += `<div class="col">
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
                    </div>`;
				}
			}
			if(items.length > 1) {
				$related_posts.innerHTML = `<div class="widget">
				    <div class="widget-header"><div class="widget-title"><i class="icon fa-solid fa-random"></i> ${widget_title}</a></div></div>
           		    <div class="widget-body blog-posts ${class_name}">${items_group}</div>
				</div>`;
			}
		})
	}
}
