"use strict";





// Check if entered coupon is valid or invalid.
function checkCouponValidity() {
    let ticketType = document.getElementsByName('ticketType')[0].value;
    let coupon = document.getElementsByName('coupon')[0].value;

    let url = "https://script.google.com/macros/s/AKfycbxGigKrqWnJNBZHoDAHftZgzYRFAFFnAkTeKnxCTeTudIgi6Wo/exec";
    let data = "ticket_type=" + ticketType + "&" + "coupon=" + coupon;

    let xHReq = new XMLHttpRequest();

    xHReq.onreadystatechange = function () {
        if (this.readyState==4 && this.status==200) {
            let response = JSON.parse(xHReq.response);
            let isValid = response.hasOwnProperty("status") && response.status=="valid";
            showCouponValidationMessage(isValid);
        }
    };

    xHReq.open("GET", (url + "?" + data), true);
    xHReq.send();
}





// Change input field style based on whether coupon is valid or not.
function showCouponValidationMessage(isValid) {
    let couponField = document.getElementsByName('coupon')[0];

    // Reset coupon field style, for typing again after invalid message.
    couponField.addEventListener('focus', function () {
        couponField.classList.remove("error");
        couponField.placeholder = "";
    });

    if (isValid) {
        couponField.classList.remove("error");
        couponField.classList.add("success");
    } else {
        couponField.classList.add("error");
        couponField.value = "";
        couponField.placeholder = "Invalid coupon!";
    }
}
