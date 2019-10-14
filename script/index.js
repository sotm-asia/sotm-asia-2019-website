"use strict";





//
function submitFormData() {
    let url = "https://script.google.com/macros/s/AKfycbzB2-Xue2sbiBfx8ANUNGmfe_4FmBxz5hxCP1Q2fyejFuMVCe0/exec";
    let form = document.getElementById('form').querySelector('form');

    let firstName      = document.getElementsByName('first_name'   )[0].value;
    let lastName       = document.getElementsByName('last_name'    )[0].value;
    let gender         = document.getElementsByName('gender'       )[0].value;
    let email          = document.getElementsByName('email'        )[0].value;
    let phone          = document.getElementsByName('phone'        )[0].value;
    let city           = document.getElementsByName('city'         )[0].value;
    let country        = document.getElementsByName('country'      )[0].value;
    let speaking       = document.getElementsByName('speaking'     )[0].value;
    let ticketType     = document.getElementsByName('ticket_type'  )[0].value;
    let numTickets     = document.getElementsByName('num_of_ticket')[0].value;
    let coupon         = document.getElementsByName('coupon'       )[0].value;
    let p1Diet         = document.getElementsByName('p1_diet'      )[0].value;
    let p1TShirt       = document.getElementsByName('p1_tshirt'    )[0].value;
    let p2DietFields   = document.getElementsByName('p2_diet'      );
    let p2TShirtFields = document.getElementsByName('p2_tshirt'    );
    let p3DietFields   = document.getElementsByName('p3_diet'      );
    let p3TShirtFields = document.getElementsByName('p3_tshirt'    );
    let orgFields      = document.getElementsByName('organization' );

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

    let data = "first_name="     + firstName
        + "&" + "last_name="     + lastName
        + "&" + "gender="        + gender
        + "&" + "email="         + email
        + "&" + "phone="         + phone
        + "&" + "city="          + city
        + "&" + "country="       + country
        + "&" + "speaking="      + speaking
        + "&" + "ticket_type="   + ticketType
        + "&" + "num_of_ticket=" + numTickets
        + "&" + "ticket_price="  + priceAfterDiscount
        + "&" + "p1_diet="       + p1Diet
        + "&" + "p1_tshirt="     + p1TShirt
        + "&" + "p2_diet="       + ( p2DietFields.length   > 1 ? p2DietFields[0].value   : "" )
        + "&" + "p2_tshirt="     + ( p2TShirtFields.length > 1 ? p2TShirtFields[0].value : "" )
        + "&" + "p3_diet="       + ( p3DietFields.length   > 1 ? p3DietFields[0].value   : "" )
        + "&" + "p3_tshirt="     + ( p3TShirtFields.length > 1 ? p3TShirtFields[0].value : "" )
        + "&" + "organization="  + ( orgFields.length      > 1 ? orgFields[0].value      : "" )
        + "&" + "coupon="        + coupon;
        
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
