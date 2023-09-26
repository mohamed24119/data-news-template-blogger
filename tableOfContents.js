function get_table_of_contents(el, select) {
	if (document.querySelector(el)) {
		let elementSelect = document.querySelector(el);
		let headding = elementSelect.querySelectorAll(select);
		if (headding.length > 0) {
			let headdingBox = document.createElement("div");
			headdingBox.className = "headding-box";
			let headdingTitleEl = document.createElement("button");
			headdingTitleEl.className = "headding-title active";
			headdingTitleEl.id = "headdingTitle";
			let headdingText = "";
			if(document.dir === "rtl"){headdingText = document.createTextNode("جدول المحتويات");}
			else {headdingText = document.createTextNode("Table Of Contents");}
			headdingTitleEl.appendChild(headdingText);
      		headdingBox.appendChild(headdingTitleEl);
      		let headdingBoxBody = document.createElement("div");
      		headdingBoxBody.className = "headdig-box-body toggle";
      		headdingBoxBody.id = "headdigBoxBody";
      		headdingBox.appendChild(headdingBoxBody);
      		let ol = document.createElement("ol");
      		ol.className = "numbered-list";
      		for (i = 0; i < headding.length; i++) {
        		if (!headding[i].matches(".accordion-header") && !headding[i].matches(".card-title") && headding[i].textContent != "") {
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
      		for (o = 0; o < headding.length; o++) {
        		if (!headding[o].matches(".accordion-header") && !headding[o].matches(".card-title")) {
          			headdingBoxBody.appendChild(ol);
          			headding[0].before(headdingBox);
          			headdingTitleEl.addEventListener("click", function () {
            			headdingBoxBody.classList.toggle("toggle");
            			this.classList.toggle("active");
          			});
        		}
        		break;
      		}
		}
	}
}
