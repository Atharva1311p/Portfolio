// ==============================
// 		HEADER
// ==============================

$(document).ready(function() {
	$("ul.nav li a").click(function() {
		$("ul.nav li a").removeClass("active");
		$(this).addClass("active"); 
	});    
});

$(document).ready(function() {
	setTimeout(function(){
		$('body').addClass('loaded');
	}, 1000);
});

$(document).ready(function() {
	$('#nav-toggle').click(function()  {
		$('body').toggleClass('nav-open');
	});
});
// ==============================
// 		HOME
// ==============================

const typedTextSpan = document.querySelector("#typed-text");
		const cursorSpan = document.querySelector("#cursor");

		const textArray = ["Web Developer", "Web Designer"];
		const typingDelay = 200;
		const erasingDelay = 100;
		const newTextDelay = 2000; // Delay between current and next text
		let textArrayIndex = 0;
		let charIndex = 0;

		function type() {
		  if (charIndex < textArray[textArrayIndex].length) {
			if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
			typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
			charIndex++;
			setTimeout(type, typingDelay);
		  } 
		  else {
			cursorSpan.classList.remove("typing");
			setTimeout(erase, newTextDelay);
		  }
		}

		function erase() {
		  if (charIndex > 0) {
			if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
			typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
			charIndex--;
			setTimeout(erase, erasingDelay);
		  } 
		  else {
			cursorSpan.classList.remove("typing");
			textArrayIndex++;
			if(textArrayIndex>=textArray.length) textArrayIndex=0;
			setTimeout(type, typingDelay + 1100);
		  }
		}

		document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
		  if(textArray.length) setTimeout(type, newTextDelay + 250);
		});
		
// ==============================
// 		PORTFOLIO
// ==============================

	var grid = document.querySelector('.grid');
var msnry;

var imgAll = document.querySelectorAll('.grid-item');
var imgNy = document.querySelectorAll('.newYork');
var imgFlowers = document.querySelectorAll('.flowers');
var imgOthers = document.querySelectorAll('.others');

const tabsUl = document.getElementById('buttonGroup');
const lis = tabsUl.children;
const gridItems = grid.children;

imagesLoaded(grid, function(){
	msnry = new Masonry( grid, {
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});
});

function toggleClass(parentElem, childElems, className){
	for(let i = 0; i <childElems.length; i++){
		if(childElems[i]==parentElem){
			childElems[i].classList.add(className);
		}
		else{
			childElems[i].classList.remove(className);
		}
	}
}

function showImages(showImg, hideImg1, hideImg2){
	for(let i = 0; i < showImg.length; i++){
			showImg[i].style.display = "block";
		}
		for(let i = 0; i < hideImg1.length; i++){
			hideImg1[i].style.display = "none";
		}
		for(let i = 0; i< hideImg2.length; i++){
			hideImg2[i].style.display = "none";
		}
}


tabsUl.addEventListener('click', (event) =>{
	let tabLi = event.target.parentNode;
	
	toggleClass(tabLi, lis, 'is-active');
	
	if(event.target.id == "all"){
		for(let i = 0; i< imgAll.length; i++){
			imgAll[i].style.display = "block";
		}
	}

	if(event.target.id == "newYork"){
		showImages(imgNy, imgFlowers, imgOthers);
	}

	if(event.target.id == "flowers"){
		showImages(imgFlowers, imgNy, imgOthers);
	}
	
	if(event.target.id == "others"){
		showImages(imgOthers, imgFlowers, imgNy);
	}
	
	msnry.layout();
});

grid.addEventListener('click',function(event){
	let imgContainer = event.target.parentNode;
	toggleClass(imgContainer, gridItems, 'grid-item__expanded');
	msnry.layout();
});