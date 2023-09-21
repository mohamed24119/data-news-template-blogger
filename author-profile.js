function fun_get_card_author_des(current_post_id) {
    const card_author_img = document.querySelector("#card-author-img");
    const card_author_des = document.querySelector("#card-author-des");
    if(card_author_img !== null){
	    const url_author_img = `https://www.blogger.com/feeds/${$blog_id}/posts/default/${current_post_id}?alt=json`;
	    fetch(url_author_img)
        .then(function(response) {return response.json()})
        .then(function(data) {
		    card_author_img.src = data.entry.author[0].gd$image.src;
	    });
    }
	if(card_author_des !== null){
	    let lines = card_author_des.textContent.split("\n");
	    let line_one = lines[0].trim();
	    let links = "";
	    for(let i = 1; i < lines.length; i++) {
		    let line = lines[i].trim();
		    if(line !== "") {
			    let line_split = line.split("*");
			    let link = line_split[0];
			    let icon = line_split[1];
			    let class_link = line_split[2];
			    links += `<li><a class="bg-${class_link}" href="${link}" target="_blank" aria-label="${class_link}" title="${class_link}"><span class="icon ${icon}"></span></a></li>`;
            }
	    }
	    card_author_des.innerHTML = `<p>${line_one}</p><ul class="author-social">${links}</ul>`;
    }
}
