"use strict";





//
function submitFormData() {
    let url = "https://script.google.com/macros/s/AKfycbzB2-Xue2sbiBfx8ANUNGmfe_4FmBxz5hxCP1Q2fyejFuMVCe0/exec";
    let form = document.getElementById('form').querySelector('form');

    let ticketType = document.getElementsByName('ticket_type')[0].value;
    let numTickets = document.getElementsByName('num_of_ticket')[0].value;
    let firstName = document.getElementsByName('first_name')[0].value;

    let priceBeforeDiscount = ticketType=="individual"
        ? (numTickets * 20)
        : ticketType=="community"
            ? (numTickets * 40)
            : ticketType=="corporate"
                ? (numTickets * 200)
                : 0;

    let priceAfterDiscount = ticketType=="individual"
        ? (priceBeforeDiscount * 15)
        : ticketType=="community"
            ? (priceBeforeDiscount * 10)
            : ticketType=="corporate"
                ? (priceBeforeDiscount * 5)
                : 0;


    let data = "first_name=" + firstName
        + "&" + "last_name=" + document.getElementsByName('last_name')[0].value
        + "&" + "gender=" + document.getElementsByName('gender')[0].value
        + "&" + "email=" + document.getElementsByName('email')[0].value
        + "&" + "phone=" + document.getElementsByName('phone')[0].value
        + "&" + "country=" + document.getElementsByName('country')[0].value
        + "&" + "speaking=" + document.getElementsByName('speaking')[0].value
        + "&" + "ticket_type=" + ticketType
        + "&" + "num_of_ticket=" + numTickets
        + "&" + "ticket_price=" + priceAfterDiscount
        + "&" + "p1_diet=" + document.getElementsByName('p1_diet')[0].value
        + "&" + "p1_tshirt=" + document.getElementsByName('p1_tshirt')[0].value
        + "&" + "p2_diet=" + (document.getElementsByName('p2_diet').length>1? document.getElementsByName('p2_diet')[0].value : "")
        + "&" + "p2_tshirt=" + (document.getElementsByName('p2_tshirt').length>1? document.getElementsByName('p2_tshirt')[0].value : "")
        + "&" + "p3_diet=" + (document.getElementsByName('p3_diet').length>1? document.getElementsByName('p3_diet')[0].value : "")
        + "&" + "p3_tshirt=" + (document.getElementsByName('p3_tshirt').length>1? document.getElementsByName('p3_tshirt')[0].value : "")
        + "&" + "organization=" + (document.getElementsByName('organization').length>1? document.getElementsByName('organization')[0].value : "")
        + "&" + "coupon=" + document.getElementsByName('coupon')[0].value;
        
    let xHReq = new XMLHttpRequest();

    xHReq.onreadystatechange = function () {
        if (this.readyState==4 && this.status==200) {
            let response = JSON.parse(xHReq.response);
            location.href = "http://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=PAY&SESSIONKEY=" + response.sessionkey;
        }
    }

    xHReq.open("GET", (url + "?" + data), true);
    xHReq.send();
}





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
