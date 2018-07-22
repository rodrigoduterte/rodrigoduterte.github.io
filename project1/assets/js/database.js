var config = {
  apiKey: "AIzaSyD-clEmCVscqOXmVSgKciWDVhz1xZt-Nw4",
  authDomain: "project1-2b99c.firebaseapp.com",
  databaseURL: "https://project1-2b99c.firebaseio.com",
  projectId: "project1-2b99c",
  storageBucket: "project1-2b99c.appspot.com",
  messagingSenderId: "213514987735"
};
firebase.initializeApp(config);

var database = firebase.database();
var customerID = database.ref("counter/customer");
var followupID = database.ref("counter/followup");
var customers = database.ref("customers/");
var statActs = {
  "Customer is Busy": "Call back",
  "Call but no answer": "Call back",
  "Need to discuss": ["Follow-Up", "Change lead status to Dropped"],
  "Already purchased": ["Follow-Up", "Change lead status to Dropped"],
  "No longer Need": ["Follow-Up", "Change lead status to Dropped"],
  "Not purchase now": "Change lead status to Potential",
  "Follow up Sales Order": [
    "Request shipping Date",
    "Waiting to Ship",
    "Check Inventory"
  ],
  Shipped: "No Action needed",
  "Order Completed": "No Action needed"
};
var leadstats = {
  potential: 0,
  interested: 0,
  purchased: 0,
  dropped: 0
};

// var data = new google.visualization.DataTable();
// data.addColumn("string", "Status");
//   data.addColumn("number", "Clients");
//   data.addRows([
//     ["Potential", leadstats["potential"]],
//     ["Interested", leadstats["interested"]],
//     ["Purchased", leadstats["purchased"]],
//     ["Dropped", leadstats["dropped"]]
//   ]);

database.ref('leadstats/').once('value',function(snap){
  leadstats = snap.val();
});
///////////////////// add event listeners for database references
customers
  .orderByKey()
  .limitToLast(5)
  .on("value", function(snapshot) {
    $("#lead-table").empty();
    snapshot.forEach(e => {
      $("#lead-table").append(
        "<tr><td>" +
          e.key +
          "</td><td>" +
          e.val().firstname +
          " " +
          e.val().lastname +
          "</td><td>" +
          e.val().businessname +
          "</td></tr>"
      );
    });
  });

customers.on("child_added", function(snapshot) {
  var markup = `
    <div class="card blue-grey darken-3">
    <div class="card-content blue-grey lighten-5">
      <h4 class="card-title" id="custName">${snapshot.val().businessname}</h4>
      <h6 class="card-title">${snapshot.val().firstname + " " + snapshot.val().lastname}</h6>
        <ul>
          <li><b>Action:</b> ${snapshot.val().followups.action}</li>
          <li><b>Note:</b> ${snapshot.val().followups.note}</li>
          <br>
          <li><b>Due Date:</b> ${snapshot.val().followups.date}</li>
          <li><b>Work Phone:</b> ${snapshot.val().workphone}</li>
          <li><b>Business Address:</b> ${snapshot.val().businessaddress}</li>
        </ul>
    <div class="card-action">

        <button data-target="modal2" class="btn-small right modal-trigger orange darken-4 fp" href="#modal2">Follow Up</button>

    </div>
  </div>
  </div>`;
  $(".fp").attr("disabled", "true");
  $("#calendar").prepend(markup);
  drawChart();
});

///////////////////// add event listeners for database references
///////////////////// functions that add records to the database
function addCustomer() {
  customerID.transaction(
    function(customer) {
      //customerID.transaction executes the callback function twice
      //@ first call customer === null
      //@ second call customer === counter/customer.val()
      if (customer === null) {
        return customer + 1;
      } else {
        return customer + 1;
      }
    },
    function(error, committed, snapshot) {
      if (error) {

      } else if (committed) {
        customers.child(snapshot.val()).set({
          firstname: formvariables.customer.firstname,
          lastname: formvariables.customer.lastname,
          businessname: formvariables.customer.businessname,
          businessaddress: formvariables.customer.businessaddress,
          workphone: formvariables.customer.workphone,
          mobilephone: formvariables.customer.mobilephone,
          leadstatus: formvariables.customer.leadstatus,
          followups: {
            status: formvariables.followups.status,
            action: formvariables.followups.action,
            date: formvariables.followups.date,
            note: formvariables.followups.note
          }
        });
        leadstats[formvariables.customer.leadstatus]++;
        database.ref('leadstats/').set(leadstats);
      }
    }
  );
}

///////////////////// functions that add records to the database
