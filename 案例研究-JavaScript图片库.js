function insertAfter(newElement,targetElement){//在已有元素之后添加子元素
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
function addLoadEvent(func){//页面加载完毕后立即执行函数的添加函数
	var oldonload=window.onload;
	if (typeof window.onload!="function") {
		window.onload=func;
	}
	else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}
function preparePlaceholder(){//添加图片占位符和图片文字说明
		if (!document.createElement) {return false;}
		if (!document.createTextNode) {return false;}
		if (!document.getElementById) {return false;}
		if (!document.getElementById("imagegallery")) {return false;}
		var placeholder=document.createElement("img");
		placeholder.setAttribute("id","placeholder");
		placeholder.setAttribute("src","images/MyImageGallery.png");
		placeholder.setAttribute("alt","my image gallery");
		var description=document.createElement("p");
		description.setAttribute("id","description");
		var desctext=document.createTextNode("Choose an image");
		description.appendChild(desctext);
		var gallery=document.getElementById("imagegallery");
		insertAfter(placeholder,gallery);
		insertAfter(description,placeholder);
	}
function prepareGallery(){
	if (!document.getElementById) {return false;}//检测浏览器是否支持该DOM语句
	if (!document.getElementsByTagName) {return false;}//检测浏览器是否支持该DOM语句
	if (!document.getElementById('imagegallery')) {return false;}//检测文档中是否存在id值为imagegallery的元素
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(i=0;i<links.length;i++){
		links[i].onclick=function(){
			return !showpic(this);
		}
	}
}
function showpic(whichpic){
	if (!document.getElementById("placeholder")) {return false;}
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	if (placeholder.nodeName!="IMG") {return false;}
	placeholder.setAttribute("src",source);
	if (document.getElementById("description")) {
		if(whichpic.getAttribute("title")){
			var text=whichpic.getAttribute("title");
		}
		else{
			var text="";
		}
		var description=document.getElementById("description");
		// description.innerHTML=text;此种方法也可行
		if (description.firstChild.nodeType==3) {
			description.firstChild.nodeValue=text;
		}
	}
	return true;
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);



