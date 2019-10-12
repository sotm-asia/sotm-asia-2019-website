"use strict";





// $(document).ready(function() {
//     let url = "https://script.google.com/macros/s/AKfycbzB2-Xue2sbiBfx8ANUNGmfe_4FmBxz5hxCP1Q2fyejFuMVCe0/exec";
//     $('#form').on('submit', function(e) {
//         console.log(form);
//         e.preventDefault();
//         let $form = $(e.target);
//         console.log($form);
//         let jqxhr = $.post(url, $form.serialize(), function(data) {
//             console.log("Success! Data: " + data.statusText);
//             $(location).attr('href', 'venue.html');
//         })
//         .fail(function(data) {
//             console.warn("Error! Data: " + data.statusText);
//         });
//     });
// });





//
function submitFormData() {
    let url = "https://script.google.com/macros/s/AKfycbzB2-Xue2sbiBfx8ANUNGmfe_4FmBxz5hxCP1Q2fyejFuMVCe0/exec";
    let form = document.getElementById('form').querySelector('form');
    let data = new FormData(form);

    let xHReq = new XMLHttpRequest();

    xHReq.onreadystatechange = function () {
        if (this.readyState==4 && this.status==200) {
            let response = JSON.parse(xHReq.response);
            console.log(response);
        }
    }

    xHReq.open("POST", url, true);
    xHReq.setRequestHeader('Access-Control-Allow-Origin', '*');
    xHReq.setRequestHeader('Content-type','application/json; charset=utf-8');
    // xHReq.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xHReq.send(data);
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
