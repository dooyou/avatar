var signaturesSwiper = null;

$(document).ready(function(){
	createNumeric(".numericGroup");
	var schCheck = "Y";
	var replayGbn = "I";
	var privateInfoUseYn = "Y";

	if(schCheck == "Y"){
		var replyBoxOffsetTop = $('#reply_box').offset().top;
		if(replayGbn == "I") {
			replyBoxOffsetTop = replyBoxOffsetTop - 100;
		}

		$('html, body').animate({
			scrollTop: replyBoxOffsetTop
		}, 'fast');
	}

	if(replayGbn == "T") {
		// 텍스트 댓글 초기화
		if(privateInfoUseYn == "Y") {
			//전체동의 체크 및 해제
			$('input[name=checkboxAll]').click(function(){
				var chkstatus = $('input[name=checkboxAll]').is(":checked");
				if(chkstatus){
			    	$('input[name=agreeChk]').prop('checked', true);
				}else{
			    	$('input[name=agreeChk]').prop('checked', false);
				}
			});

			//동의 체크박스 각각씩 다 누르면 전체동의 체크박스 선택됨
			$("input[name=agreeChk]").click(function(){
		        if($("input[name=agreeChk]").length==$("input[name=agreeChk]:checked").length){
		            $("input[name=checkboxAll]").prop("checked",true);
		        }else{
		            $("input[name=checkboxAll]").prop("checked",false);
		        }
		 	});
		}

		// 댓글 내용 focus 이벤트
		$("#replyDesc").click(function(){
			var nomemberYn = $("#nomemberYn").val();

			if(nomemberYn == "N"){

			}
		});

		// 댓글 내용 입력 글자 수 제한
		$("#replyDesc").bind("change keyup input",function (e){
			var replyDesc = $(this).val();

			if(replyDesc.length > 200){
				alert("댓글은 200자 이내로 작성해 주세요.");
				$("#replyDesc").val($("#replyDesc").val().substring(0, 200));
				$("#counter").html($("#replyDesc").val().length + "/200");
	     		$("#replyDesc").focus();
	     		return false;
			}else{
				$("#counter").html(replyDesc.length + "/200");
			}
		});
	} else if(replayGbn == "I") {
		// 이미지 댓글 초기화
		if(privateInfoUseYn == "Y") {
			//전체동의 체크 및 해제
			$('input[name=checkboxAllImg]').click(function(){
				var chkstatus = $('input[name=checkboxAllImg]').is(":checked");
				if(chkstatus){
			    	$('input[name=agreeChkImg]').prop('checked', true);
				}else{
			    	$('input[name=agreeChkImg]').prop('checked', false);
				}
			});

			//동의 체크박스 각각씩 다 누르면 전체동의 체크박스 선택됨
			$("input[name=agreeChkImg]").click(function(){
		        if($("input[name=agreeChkImg]").length==$("input[name=agreeChkImg]:checked").length){
		            $("input[name=checkboxAllImg]").prop("checked",true);
		        }else{
		            $("input[name=checkboxAllImg]").prop("checked",false);
		        }
		 	});
		}

		// 댓글 제목 입력 글자 수 제한
		$("#replyTitle").bind("change keyup input",function (e){
			var replyTitle = $(this).val();

			if(replyTitle.length > 22){
				alert("댓글은 22자 이내로 작성해 주세요.");
				$("#replyTitle").val($("#replyTitle").val().substring(0, 22));
				$("#counterTitle").html($("#replyTitle").val().length + "/22");
	     		$("#replyTitle").focus();
	     		return false;
			}else{
				$("#counterTitle").html(replyTitle.length + "/22");
			}
		});

		// 댓글 내용 입력 글자 수 제한
		$("#replyDesc").bind("change keyup input",function (e){
			var replyDesc = $(this).val();

			if(replyDesc.length > 100){
				alert("댓글은 100자 이내로 작성해 주세요.");
				$("#replyDesc").val($("#replyDesc").val().substring(0, 100));
				$("#counterDesc").html($("#replyDesc").val().length + "/100");
	     		$("#replyDesc").focus();
	     		return false;
			}else{
				$("#counterDesc").html(replyDesc.length + "/100");
			}
		});

		$(".event-popup-close").click(function(){
			$(".wrap-eventpop").hide();
			$(".pop-agree").hide();
			$("input[class=agree]").prop("checked",false);
			$("body").css({"overflow-y":"auto"});

			$('#imgReplyForm').trigger("reset");
			$("#filebox").empty();
		});

		$(".event-view-close").click(function(){
			$(".wrap-eventpop-view").css({"position":"absolute","top":"-100000000000px"});
			$("body").css({"overflow-y":"auto"});

			signaturesSwiper.removeAllSlides();
			signaturesSwiper.update();
		});

		$(".btn-popup-privacy").click(function(){
	        $(".eventpop-privacy").show();
		});

		$(".close-privacy").click(function(){
			$(".eventpop-privacy").hide();
		});

		$(".btn-popup-infor").click(function(){
	        $(".eventpop-infor").show();
		});

		$(".close-infor").click(function(){
			$(".eventpop-infor").hide();
		});

		//popup swiper
		signaturesSwiper = new Swiper(".swiper-container.swipereventpop", {
			slidesPerView: 1,
			speed: 50,
			navigation: {
				nextEl: ".swiper-button-next-eventpop",
				prevEl: ".swiper-button-prev-eventpop",
			},
			lazy: {
				loadPrevNext:true,
				loadPrevNextAmount:1
			}
		});

		//popup swiper
	}
});

// 목록
function goList(){
	var frm = document.eventForm;
	frm.action = "/w/promotion/event/eventList.do";
	frm.submit();
}

// 다른 이벤트 이동
function changeEvent(){
	var pLinkYn = $("#eventSel option:selected").attr("attr-yn");
	var pLinkUrl = $("#eventSel option:selected").attr("attr-url");
	var pLinkFlag = $("#eventSel option:selected").attr("attr-flag");
	var promotionIdx = $("#eventSel option:selected").val();

	if(pLinkYn == "Y"){
		if(pLinkFlag == "N"){
			var openWindow = window.open("about:blank");

			openWindow.location.href=pLinkUrl;
		}else{
			document.location.href=pLinkUrl;
		}

	}else{
		$("#promotionIdx").val(promotionIdx);

		if($("#eventSel").val() != ""){
			var frm = document.eventForm;
			frm.action = "/w/promotion/event/eventView.do?promotionIdx="+promotionIdx;
			frm.submit();
		}
	}
}

// 댓글 저장
function replySave(){
	var nomemberYn = $("#nomemberYn").val();
	var ssMemberFlag = "Y";
	var replyGbn = $("#replyGbn").val();
	var privateInfoUseYn = $("#privateInfoUseYn").val();

	if(replyGbn == "T") {
		// 텍스트 댓글 처리
		if(ssMemberFlag != "Y"){
			if(nomemberYn == "N"){
				if(confirm("로그인이 필요합니다.") == true){
					location.href="/w/login/loginPage.do?refererYn=Y";
					return false;
				}else{
					return false;
				}
			}else{
				if($.trim($("#regNm").val()) ==""){
					alert("이름을 입력 해 주세요.");
					$("#regNm").focus();
					return false;
				}

				if($.trim($("#regTel").val()) ==""){
					alert("휴대폰 번호를 입력 해 주세요.");
					$("#regTel").focus();
					return false;
				}else{
					if($.trim($("#regTel").val()).length != 11 && $.trim($("#regTel").val()).length != 10){
						alert("휴대폰 번호 10자리 혹은 11자리를 입력 해 주세요.");
						$("#regTel").focus();
						return false;
					}
				}

				if($.trim($("#replyPw").val()) ==""){
					alert("비밀번호를 입력 해 주세요.");
					$("#replyPw").focus();
					return false;
				}else{
					if($.trim($("#replyPw").val()).length != 4){
						alert("비밀번호 4자리를 입력 해 주세요.");
						$("#replyPw").focus();
						return false;
					}
				}

				if($("#nomemberAgreeChk").is(":checked") == false){
					alert("개인정보수집에 동의 해 주세요.");
					return false;
				}
			}
		} else if(ssMemberFlag == "Y" && privateInfoUseYn == "Y") {
			if($("input[name=agreeChk]").eq(0).is(":checked") == false) {
				alert("개인정보 수집 및 이용에 동의 해 주세요.");
				return false;
			};
			if($("input[name=agreeChk]").eq(1).is(":checked") == false) {
				alert("개인정보 처리 및 위탁에 동의 해 주세요.");
				return false;
			};
		}

		if($.trim($("#replyDesc").val()) ==""){ // 내용
			alert("댓글 내용을 입력 해 주세요.");
			$("#replyDesc").focus();
			return false;
		}
		if($.trim($("#replyDesc").val().length) < 10){ // 내용 길이
			alert("댓글은 10자 이상 작성해 주세요.");
			$("#replyDesc").focus();
			return false;
		}
		if($.trim($("#replyDesc").val().length) > 200){ // 내용 길이
			alert("댓글은 200자 이내로 작성해 주세요.");
			$("#replyDesc").focus();
			return false;
		}

		if(confirm("등록 하시겠습니까?") == true){
			$.ajax({
				url: "/w/ajax/promotion/replySave.do",
				data: {
							"promotionIdx"	:	$("#promotionIdx").val(),
							"replyDesc" 	:	$("#replyDesc").val(),
							"nomemberYn"	:	$("#nomemberYn").val(),
							"replyDupYn"	:	$("#replyDupYn").val(),
							"regNm"			:	$("#regNm").val(),
							"regTel"		:	$("#regTel").val(),
							"regEmail"		:	$("#regEmail").val(),
							"replyPw"		:	$("#replyPw").val(),
							"memberFlag"	:	ssMemberFlag,
							"replyGbn"      :   $("#replyGbn").val()
						 },
				type: "POST",
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				error: function(request, status, error){
			 		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				},
				success: function(flag){
					if(Number(flag) > 0){
						alert("등록 되었습니다.");
					}else if(Number(flag)==-1){
						alert("이미 등록 하셨습니다.");
					}else if(Number(flag) == -100) {
						alert("로그인이 필요합니다.");
						location.href="/w/login/loginPage.do?refererYn=Y";
					}else{
						alert("오류가 발생 하였습니다.");
					}
					document.location.reload();
				}
			});
		}
	} else {
		// 이미지 댓글 처리
		if($.trim($("#replyTitle").val()) ==""){ // 제목
			alert("댓글 제목을 입력 해 주세요.");
			$("#replyTitle").focus();
			return false;
		}

		if($.trim($("#replyTitle").val().length) > 22){ // 내용 길이
			alert("댓글 제목은 22자 이내로 작성해 주세요.");
			$("#replyTitle").focus();
			return false;
		}

		if($.trim($("#replyTitle").val().length) < 5){ // 내용 길이
			alert("댓글 제목은 5자 이상 작성해 주세요.");
			$("#replyTitle").focus();
			return false;
		}

		if($.trim($("#replyDesc").val()) !=""){ // 내용
			if($.trim($("#replyDesc").val().length) > 200){ // 내용 길이
				alert("댓글은 200자 이내로 작성해 주세요.");
				$("#replyDesc").focus();
				return false;
			}
		}

    	var cnt = $("#filebox > li").length;
    	if (cnt == 0 ) {
    		alert("사진을 첨부해 주세요.");
    		return;
    	}

		if(privateInfoUseYn == "Y") {
			if($("input[name=agreeChkImg]").eq(0).is(":checked") == false) {
				alert("개인정보 수집 및 이용에 동의 해 주세요.");
				return false;
			};
			if($("input[name=agreeChkImg]").eq(1).is(":checked") == false) {
				alert("개인정보 처리 및 위탁에 동의 해 주세요.");
				return false;
			};
		}

		if(confirm("등록 하시겠습니까?") == true){
			var params = $("form[name=imgReplyForm]").serialize();

			$.ajax({
				url: "/w/ajax/promotion/replySave.do",
				data: params,
				type: "POST",
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				error: function(request, status, error){
			 		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				},
				success: function(flag){
					if(Number(flag) > 0){
						alert("등록 되었습니다.");
					}else if(Number(flag)==-1){
						alert("이미 등록 하셨습니다.");
					}else if(Number(flag) == -100) {
						alert("로그인이 필요합니다.");
						location.href="/w/login/loginPage.do?refererYn=Y";
					}else{
						alert("오류가 발생 하였습니다.");
					}
					document.location.reload();
				}
			});
		}
	}
}

// 댓글 삭제
function replyDelete(idx){
	var ssMemberFlag = "Y";

	if(ssMemberFlag != "Y"){
		if($.trim($("#replyPwChk"+idx).val()) ==""){
			alert("비밀번호를 입력 해 주세요.");
			$("#replyPwChk"+idx).focus();
			return false;
		}
	}

	if(confirm("삭제 하시겠습니까?") == true){
		$.ajax({
			url: "/w/ajax/promotion/replyDeleteAjax.do",
			data: {
						"promotionReplyIdx"	:	idx,
						"nomemberYn"		:	$("#nomemberYn").val(),
						"replyPw"			:	$("#replyPwChk"+idx).val(),
						"memberFlag"		:	ssMemberFlag
					 },
			type: "POST",
			async: false,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			error: function(request, status, error){
		 		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			},
			success: function(flag){
				if(Number(flag) > 0){
					alert("삭제 되었습니다.");
					document.location.reload();
				}else if(Number(flag) == 0){
					alert("비밀번호가 일치하지 않습니다.");
					$("#replyPwChk"+idx).val("");
				}else{
					alert("오류가 발생 하였습니다.");
					$("#replyPwChk"+idx).val("");
				}
			}
		});
	}
}

// 댓글 좋아요 하기
function replyLike(idx) {
	var ssMemberFlag = "Y";

	if(ssMemberFlag != "Y"){
		if(confirm("로그인이 필요합니다.") == true){
			location.href="/w/login/loginPage.do?refererYn=Y";
			return false;
		}else{
			return false;
		}
	}

	$.ajax({
		url: "/w/ajax/promotion/replyLikeAjax.do",
		data: {"promotionReplyIdx"	:	idx},
		type: "POST",
		async: false,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		error: function(request, status, error){
	 		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		success: function(flag){
			if(Number(flag) > 0){
				alert("좋아요 처리되었습니다.");
				document.location.reload();
			}else if(Number(flag)==-1){
				alert("이미 투표한 게시물입니다.");
			}else if(Number(flag)==-2){
				alert("본인은 투표할 수 없습니다.");
			}else{
				alert("오류가 발생 하였습니다.");
			}
		}
	});
}

function imgReplyPopup() {
	var nomemberYn = $("#nomemberYn").val();
	var ssMemberFlag = "Y";


		alert('접수가 마감되었습니다.');
		return;


	if(ssMemberFlag != "Y"){
		if(nomemberYn == "N"){
			if(confirm("로그인이 필요합니다.") == true){
				location.href="/w/login/loginPage.do?refererYn=Y";
				return false;
			}else{
				return false;
			}
		}
	} else {
        $(".wrap-eventpop").show();
        $("body").css({"overflow-y":"hidden"});
	}
}

function closeImgReplyPop() {
	$(".wrap-eventpop").hide();
	$(".pop-agree").hide();
	$("input[class=agree]").prop("checked",false);
	$("body").css({"overflow-y":"auto"});

	$('#imgReplyForm').trigger("reset");
	$("#filebox").empty();
}


function imgReplyViewPopup(idx) {
	$.ajaxSetup({cache:false});
	$.ajax({
		url: "/w/ajax/promotion/replySelectAjax.do",
		data: {"promotionReplyIdx":idx},
		type: "POST",
		async: false,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		error: function(request, status, error){
	 		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		success: function(data){
			if (data.result != true) {
				alert(data.msg);
			} else {
				var ssMemberFlag = "Y";
				var memberId = "adidas0331";
				var info = data.resultMap;

				$("#popReplyTitle1").text(info.replyTitle);
				$("#popReplyTitle2").html(info.replyTitle + "<span id='popLikeCnt'>" + info.likeCnt + "</span>");

				if(info.img1 != null && info.img1 != "") {
					signaturesSwiper.appendSlide("<div class='swiper-slide'><img src='https://d1bg8rd1h4dvdb.cloudfront.net/upload/imgServer/eventreply/" + info.promotionIdx + "/" + info.img1 + "' alt=''></div>");
				}
				if(info.img2 != null && info.img2 != "") {
					signaturesSwiper.appendSlide("<div class='swiper-slide'><img src='https://d1bg8rd1h4dvdb.cloudfront.net/upload/imgServer/eventreply/" + info.promotionIdx + "/" + info.img2 + "' alt=''></div>");
				}
				if(info.img3 != null && info.img3 != "") {
					signaturesSwiper.appendSlide("<div class='swiper-slide'><img src='https://d1bg8rd1h4dvdb.cloudfront.net/upload/imgServer/eventreply/" + info.promotionIdx + "/" + info.img3 + "' alt=''></div>");
				}
				if(info.img4 != null && info.img4 != "") {
					signaturesSwiper.appendSlide("<div class='swiper-slide'><img src='https://d1bg8rd1h4dvdb.cloudfront.net/upload/imgServer/eventreply/" + info.promotionIdx + "/" + info.img4 + "' alt=''></div>");
				}
				if(info.img5 != null && info.img5 != "") {
					signaturesSwiper.appendSlide("<div class='swiper-slide'><img src='https://d1bg8rd1h4dvdb.cloudfront.net/upload/imgServer/eventreply/" + info.promotionIdx + "/" + info.img5 + "' alt=''></div>");
				}
				$("#popReplyDesc").html(info.replyDesc);

				if(info.ansDesc != null && info.ansDesc != "") {
					$("#popReplyAns").show();
					$("#popAnsDt").html(info.ansDt);
					$("#popAnsDesc").html(info.ansDesc);
				} else {
					$("#popReplyAns").hide();
				}

				if(ssMemberFlag == "Y") {
					if(memberId == info.regId) {



								$("#popReplyBtn").html("<a href='javascript:void(0);' class='btn-good' onclick='replyLike(" + info.promotionReplyIdx + ");'>좋아요</a>");


					} else {
						$("#popReplyBtn").html("<a href='javascript:void(0);' class='btn-good' onclick='replyLike(" + info.promotionReplyIdx + ");'>좋아요</a>");
					}
				} else {
					$("#popReplyBtn").html("<a href='javascript:void(0);' class='btn-good' onclick='replyLike(" + info.promotionReplyIdx + ");'>좋아요</a>");
				}

				signaturesSwiper.update();

			    $(".wrap-eventpop-view").css({"position":"fixed","top":"0","left":"0"});
			    $(".wrap-eventpop-view").css({"visibility":"visible"});
			    $("body").css({"overflow-y":"hidden"});
			}
		}
	});
}

// 댓글 페이지 이동
function goPage(page){
	$("#pageNo").val(page);
	$("#schCheck").val("Y");
	var promotionIdx = $("#promotionIdx").val();

	var frm = document.eventForm;
	frm.action = "/w/promotion/event/eventView.do?promotionIdx="+promotionIdx;
	frm.submit();
}

// 정렬순서 변경
function goChangeOrder(){
	$("#schCheck").val("Y");
	var promotionIdx = $("#promotionIdx").val();

	var frm = document.eventForm;
	frm.action = "/w/promotion/event/eventView.do?promotionIdx="+promotionIdx;
	frm.submit();
}

function goMyReply(myReplyYn) {
	$("#schCheck").val("Y");
	var promotionIdx = $("#promotionIdx").val();

	if(myReplyYn =="Y") {
		$("#myReplyYn").val("N");
	} else {
		$("#myReplyYn").val("Y");
	}

	var frm = document.eventForm;
	frm.action = "/w/promotion/event/eventView.do?promotionIdx="+promotionIdx;
	frm.submit();
}

// SNS 공유
function snsShare(snsType){
	// F : 페이스북, K : 카카오스토리
	var nowPage = document.location.href;
	var title = "MONAMI PLUSPEN ART CONTEST";	// 쌍따옴표 HTML 인코딩
 	var size = 'width=550 height=550';
	var url = "";

	if(snsType == "F"){
		url = '//www.facebook.com/sharer/sharer.php?u='+nowPage+'&t='+title;
	}else if(snsType == "K"){
		url = 'https://story.kakao.com/share?url='+encodeURIComponent(nowPage);
	}
	window.open(url,'_blank', size);
}

// URL 공유
function urlShare(){
	var nowPage = document.location.href;
	var isIe = !!document.documentMode;
	if(isIe) {
		window.clipboardData.setData('Text', nowPage);
	    alert('클립보드에 복사가 되었습니다. \n\n\'Ctrl+V를 눌러 붙여넣기 해주세요.');
	} else {
		prompt('아래 주소를 복사 해주세요', nowPage);
	}
}

// 댓글 삭제 버튼 토글 제어
function toggleReply(idx){
	if($("#password-area"+idx).hasClass("active") === true){
		$("#password-area"+idx).removeClass("active");
	}else{
		$("#password-area"+idx).addClass("active");
	}
}

//전체선택 체크박스 상태에 따라 각각의 동의 체크박스도 선택/해제 됨
function allChk(bool){
    var chks = document.getElementsByName("agreeChk");
    for(var i=0; i<agreeChk.length; i++){
    	agreeChk[i].checked=bool;
    };
};

//전체선택 체크박스 상태에 따라 각각의 동의 체크박스도 선택/해제 됨
function allChkImg(bool){
    var chksImg = document.getElementsByName("agreeChkImg");
    for(var i=0; i<agreeChkImg.length; i++){
    	agreeChkImg[i].checked=bool;
    };
};

// 첨부파일 삭제
function deleteFile(t) {
	 $(t).closest('li').remove();
}

<!-- 스크롤 -->

    (function($){
        $(window).on("load",function(){
        	$(".wrap-scroll").mCustomScrollbar({
				autoHideScrollbar:true
			});

        });
    })(jQuery);
