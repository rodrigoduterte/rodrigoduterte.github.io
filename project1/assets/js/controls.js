var currentDate = moment().format("MM-DD-YYYY");
var datepicker = document.querySelector(".datepicker");
console.log(modal1constraints);
console.log(Object.keys(validate({firstname:"Connor", leadstatus: "interested"}, modal1constraints)).length);
var formvariables = {
  customer: {
    firstname: "",
    lastname: "",
    businessname: "",
    businessaddress: "",
    workphone: "",
    mobilephone: "",
    leadstatus: ""
  },
  followups: { status: "", action: "", date: "", note: "" }
};

var nextCounter = 0;
var lastCounter = 0;
var startInterval;
var startInterval2;

$(document).ready(function() {
  Object.getOwnPropertyNames(statActs).forEach(e => {
    $("#followup-status").append("<option>" + e + "</option>");
  });

  $("#followup-action").append(
    "<option>" + statActs["Customer is Busy"] + "</option>"
  );

  ///initialize all modals
  $(".modal").modal();
  //initialize option selection within form
  $("select").formSelect();

  $("#followup-status").on("change", function() {
    // your function here
    // console.log($("#ollowup-status option:selected").text());
    $("#followup-action").empty();
    var selected = $("#followup-status :selected").text();
    console.log(statActs[selected]);
    if (Array.isArray(statActs[selected])) {
      statActs[selected].forEach(e => {
        $("#followup-action").append("<option>" + e + "</option>");
      });
    } else {
      $("#followup-action").append(
        "<option>" + statActs[selected] + "</option>"
      );
    }
    $("select").formSelect();
  });

  $('#lead-added').on('click',function(){
    startInterval = setInterval(checkModal1Fields,1000);
  });

  //initialize date picker
  $("#next-follow-up-date").datepicker({
    minDate: new Date()
  });

  //pickadate.js
  // $('#next-follow-up-date').pickadate({
  //     minDate: new Date()
  // });

  ///please change this code
  M.Datepicker.init(datepicker, {
    minDate: new Date() /// prevents the user from selecting dates before today
  });

  // console.log($(".modal").modal());

  $("#date").html(currentDate);

  $("#nextDay").on("click", function() {
    nextCounter++;

    newDate = moment()
      .add(nextCounter, "day")
      .format("MM-DD-YYYY");
    $("#date").html(newDate);
    console.log(newDate);

    $("#today").show();
  });

  $("#today").on("click", function() {
    $("#date").html(currentDate);
    nextCounter = 0;
    $("#today").hide();
  });
  $("#close-button1").on("click", function() {
    clearFieldsOnModal1();
  });

  $("#new-lead-confirmed").on("click", function() {
    clearInterval(startInterval);
    $("#new-lead-confirmed").attr("disabled", "true");
    formvariables.saveCustomer(true);
    displayCustomerOnFollowUpModal();
    clearFieldsOnModal1();
    startInterval2 = setInterval(checkModal2Fields,1000);
  });
  $("#new-lead-confirmed").attr("disabled", "true");
  $("#follow-up-confirmed").on("click", function() {
    $("#follow-up-confirmed").attr("disabled", "true");
    formvariables.saveFollowup(true);
    addCustomer();
    clearFieldsOnModal2();
    clearInterval(startInterval2);
  });
  $("#follow-up-confirmed").attr("disabled", "true");
  
});

formvariables.saveCustomer = function(cansave) {
  if (cansave) {
    formvariables.customer.firstname = $("#first-name").val();
    formvariables.customer.lastname = $("#last-name").val();
    formvariables.customer.businessname = $("#business-name").val();
    formvariables.customer.businessaddress = $("#addressInput").val();
    formvariables.customer.workphone = $("#work-phone").val();
    formvariables.customer.mobilephone = $("#mobile-phone").val();
    formvariables.customer.leadstatus = $("#lead-status option:selected").val();
  }
};

formvariables.saveFollowup = function(cansave) {
  if (cansave) {
    formvariables.followups.status = $("#followup-status option:selected").text();
    formvariables.followups.action = $("#followup-action option:selected").text();
    formvariables.followups.date = $("#next-follow-up-date").val(),
    formvariables.followups.note = $("#memo").val();
  }
};

function displayCustomerOnFollowUpModal() {
  $("#show-lead-status").text(formvariables.customer.leadstatus);
  $("#show-business-name").text(formvariables.customer.businessname);
  $("#show-customer-name").text(formvariables.customer.firstname + " " + formvariables.customer.lastname);
  $("#show-work-phone").text(formvariables.customer.workphone);
  $("#show-mobile-phone").text(formvariables.customer.mobilephone);
}

function clearFieldsOnModal1() {
  $("#lead-status option:first").prop("selected", true);
  $("#first-name").val("");
  $("#last-name").val("");
  $("#business-name").val("");
  $("#addressInput").val("");
  $("#work-phone").val("");
  $("#mobile-phone").val("");
}

function clearFieldsOnModal2() {
  $("#followup-status option:first").prop("selected", true);
  $("#followup-action").empty();
  $("#memo").val("");
}

function checkModal1Fields() {
  var m10 = $('.m1').get(0).value == "" ? null : $('.m1').get(0).value; //first-name
  var m11 = $('.m1').get(1).value == "" ? null : $('.m1').get(1).value; //last-name
  var m12 = $('.m1').get(2).value == "" ? null : $('.m1').get(2).value; //business-name
  var m13 = $('.m1').get(3).value == "" ? null : $('.m1').get(3).value; //addressInput
  var m14 = $('.m1').get(4).value == "" ? null : $('.m1').get(4).value; //work-phone
  var m15 = $('.m1').get(5).value == "" ? null : $('.m1').get(5).value; //mobile-phone
  if(validate({firstname:m10 , lastname:m11, businessname: m12, address: m13, workphone: m14, mobilephone: m15}, modal1constraints)=== undefined){
    $("#new-lead-confirmed").removeAttr("disabled");  
  }
  
}
//, mobilephone: m15
function checkModal2Fields() {
  var m20 = $('.m2').get(0).value == "" ? null : $('.m2').get(0).value;; //date
  var m21 = $('.m2').get(1).value == "" ? null : $('.m2').get(0).value;; //memo
  if(validate({date:m20 , memo:m21}, modal2constraints)=== undefined){
    $("#follow-up-confirmed").removeAttr("disabled");  
  }
}