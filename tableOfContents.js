function get_table_of_contents(el, select) {
	if(document.querySelector(el)) {
		let elementSelect = document.querySelector(el);
		let headding = elementSelect.querySelectorAll(select);
		if(headding.length > 0) {
			let toc_box = document.createElement("div");
			toc_box.className = "toc-box";
			let toc_button = document.createElement("button");
			toc_button.className = "toc-button active";
			toc_button.id = "toc_button";
			let toc_button_text = "";
			if(document.dir === "rtl") {
				toc_button_text = document.createTextNode("جدول المحتويات");
			} else {
				toc_button_text = document.createTextNode("Table Of Contents");
			}
			toc_button.appendChild(toc_button_text);
			toc_box.appendChild(toc_button);
			let toc_body = document.createElement("div");
			toc_body.className = "toc-body toggle";
			toc_body.id = "toc-body";
			toc_box.appendChild(toc_body);
			let ol = document.createElement("ol");
			ol.className = "toc-list";
			for(i = 0; i < headding.length; i++) {
				if(headding[i].textContent !== "") {
					headding[i].setAttribute("id", `headding-${i}`);
					let li = document.createElement("li");
					li.className = `headding-${headding[i].nodeName.toLowerCase()}`;
					let a = document.createElement("a");
					a.href = `#headding-${i}`;
					a.innerHTML = headding[i].textContent;
					li.appendChild(a);
					ol.appendChild(li);
				}
			}
			for(o = 0; o < headding.length; o++) {
				toc_body.appendChild(ol);
				headding[0].before(toc_box);
				toc_button.addEventListener("click", function() {
					toc_body.classList.toggle("toggle");
					this.classList.toggle("active");
				});
			}
		}
	}
}
/*
	** By Mohamed Refaat
	** https://www.facebook.com/mohamed24119
	** https://github.com/mohamed24119
*/
