const body = document.querySelector("body");
const header = document.querySelector("header");
let navWrap = document.querySelector(".navWrap");
let btnClose = document.querySelector(".btnClose");
let btnMenu = document.querySelector(".btnMenu");
let dim = document.querySelector(".dim");
let modal;

// header
function scrollHeaderOn() {
	if (document.documentElement.scrollTop > 0) {
		header.classList.add("on");
	}else{
		header.classList.remove("on");
	}
}

// pc menu
function toggleMenuPc() {
	//jqeury
	$("ul[data-value='depth01'] > li").on("mouseenter focusin",function(){
		$(this).addClass("active");
		$(this).find("ul[data-value='depth02']").stop().slideDown();
	}).on("mouseleave focusout",function(){
		$(this).removeClass("active");
		$(this).find("ul[data-value='depth02']").stop().slideUp();
	});
	$("ul[data-value='depth02'] > li > a").on("focusin",function(){ 
		$(this).parent("li").addClass("active");
	}).on("focusout",function(){
		$(this).parent("li").removeClass("active");
	});
}

// mobile menu
function openMenuMo(){
	btnMenu.addEventListener("click",() => {
		moSlideAni();
		btnClose.style.display = "inline-block";
		btnMenu.style.display = "none";
		body.style.overflow = "hidden";
	});
}
function closeMenuMo(){
	btnClose.addEventListener("click",() => {
		moSlideAni();
		btnClose.style.display = "none";
		btnMenu.style.display = "inline-block";
		body.style.overflow = "hidden auto";
	});
}
function moSlideAni(){
	let leftDecrease = 100;
	let leftIncrease = 0;

	function executionAni(){
		if (btnMenu.style.display === "none") { // 메뉴 닫힐때 실행
			leftDecrease--;
			navWrap.style.left = leftDecrease + "%"; // left100 만큼 위치 변경
			if (leftDecrease === 0) { // left100이 0 일 때
				clearInterval(id); // 중지
			}
		} else { // 메뉴 열릴때 실행
			leftIncrease++;
			navWrap.style.left = leftIncrease + "%"; // left0 만큼 위치 변경
			if (leftIncrease === 100) { // left100이 100 일 때
				clearInterval(id); // 중지
			}
		}
	}
	let id = setInterval(executionAni,0); // 실행
}

// modal popup
function openModal(modalNum){
	modal = document.querySelector("div[data-value='"+modalNum+"']")
	openModalAni();
}
function closeModal(modalNum){
	modal = document.querySelector("div[data-value='"+modalNum+"']")
	closeModalAni();
}
function dimAction(){
	modal = document.querySelector(".popupWrap");
	dim.addEventListener("click",() => {
		closeModalAni();
	})
}
function openModalAni(){
	modal.classList.add("on");
	dim.style.display = "inline-block";
	body.style.overflow = "hidden";
}
function closeModalAni(){
	modal.classList.remove("on");
	dim.style.display = "none";
	if(btnMenu.style.display === "none"){
		body.style.overflow = "hidden";
	}else{
		body.style.overflow = "hidden auto";
	}
}

// reviewAcitve
function reviewAcitve(){
	let reviewTabTarget = document.querySelectorAll(".reviewContWrap > ol > li");

	reviewTabTarget.forEach((el) => { 
		el.addEventListener("focusin", function(){
			let reviewNum = Array.from(reviewTabTarget).indexOf(this) + 1;
			let reviewNumFind = document.querySelector(".reviewContWrap > ul > li:nth-child("+reviewNum+")"); // eq 메소드와 동일
			let allListItems = document.querySelectorAll(".reviewContWrap > ol > li, .reviewContWrap > ul > li");
	
			allListItems.forEach((el2) => {
				el2.classList.remove("active");
			});
			this.classList.add("active");
			reviewNumFind.classList.add("active");
		});
	});
}

// scrollActive
function scrollActive() {
	// jquery 기존
	let windowScroll = $(window).scrollTop();
	let windowHeight = $(window).height() / 2
	let headerHeight = $("header").height();
	let menu = $("nav > ul > li"),
		action = $(".action"),
		title = $(".secTitWrap");

	for (let i = 0; i < action.length; i++){
		if(windowScroll >= action.eq(i).offset().top - headerHeight){
			menu.removeClass("active");
			menu.eq(i).addClass("active");
		};

		if(windowScroll >= action.eq(i).offset().top - windowHeight){
			action.eq(i).addClass("on");
		}else{
			action.eq(i).removeClass("on");
		};
		
		if(windowScroll >= title.eq(i).offset().top - windowHeight){
			title.eq(i).addClass("on");
		}else{
			title.eq(i).removeClass("on");
		};
	}
}

$(document).ready(function(){
	scrollHeaderOn(); // on class 추가하여 header 밑줄 추가
	scrollActive(); // nav에 active class와 본문 컨텐츠 영역에 on class 추가
	toggleMenuPc(); // pc header hover, focus 시 depth01, depth02 모션
	openMenuMo(); // 모바일 메뉴 열기
	closeMenuMo(); // 모바일 메뉴 닫기
	dimAction() // dim 클릭 시 팝업 닫기
	reviewAcitve(); // 리뷰 list 영역 focus 시 active
});

window.addEventListener("scroll", function(e){
	scrollHeaderOn(); // scroll 시 on class 추가하여 header 밑줄 추가
	scrollActive(); // scroll 시 nav에 active class와 본문 컨텐츠 영역에 on class 추가
});


