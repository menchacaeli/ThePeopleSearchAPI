const uri = "api/user";
let users = null;

$(document).ready(function () {
  getData();
});

function getData() {
  $.ajax({
    type: "GET",
    url: uri,
    cache: false,
    success: function (data) {
      const tBody = $("#users");
      $(tBody).empty();

      $("#progressbar").animate({
        width: "100%"
      }, 1000, function () {
        $(this).closest('.progress').fadeOut();
      });

      getCount(data.length);

      $.each(data, function (key, user) {
        const lg = $("<div></div>").addClass("list-group list-group-flush user-list")
          .append($("<a></a>").addClass("list-group-item")
            .append($("<span></span>").addClass("user-name").text(user.firstName + ' ' + user.lastName))
            .append($("<i><i/>").addClass(user.imagePath))
            .append(
              $("<button>Details</button>").on("click", function () {
                userDetail(user.id);
              }).addClass("btn btn-info detail").attr({
                "data-toggle": "modal",
                "data-target": "#detailModalCenter"
              })
            )
            .append(
              $("<button>Delete</button>").on("click", function () {
                deleteUser(user.id);
              }).addClass("btn btn-danger delete")
            )
            .append(
              $("<button>Edit</button>").on("click", function () {
                editUser(user.id);
              }).addClass("btn btn-secondary edit").attr({
                "data-toggle": "modal",
                "data-target": "#editModalCenter"
              })
            )
          )
        lg.appendTo(tBody);
      });
      users = data;
    }
  });
}

function addUser() {
  const user = {
    firstName: $("#add-firstname").val(),
    lastName: $("#add-lastname").val(),
    address: $("#add-address").val(),
    age: $("#add-age").val(),
    interest: $("#add-interest").val(),
    imagePath: $("#add-image").val()
  };

  $.ajax({
    type: "POST",
    accepts: "application/json",
    url: uri,
    contentType: "application/json",
    data: JSON.stringify(user),
    error: function (jqXHR, textStatus, errorThrown) {
      alert("Something went wrong!");
    },
    success: function (result) {
      getData();
      $("#add-firstname").val("");
      $("#add-lastname").val("");
      $("#add-address").val("");
      $("#add-age").val("");
      $("#add-interest").val("");
      $("#add-image").val("");
    }
  });
}

function deleteUser(id) {
  $.ajax({
    url: uri + "/" + id,
    type: "DELETE",
    success: function (result) {
      getData();
    }
  });
}

function editUser(id) {
  $.each(users, function (key, user) {
    if (user.id === id) {
      $("#edit-firstname").val(user.firstName);
      $("#edit-lastname").val(user.lastName);
      $("#edit-address").val(user.address);
      $("#edit-age").val(user.age);
      $("#edit-interest").val(user.interest);
      $("#edit-image").val(user.imagePath);
      $("#edit-id").val(user.id);
    }
  });
}

function userDetail(id) {
  $.each(users, function (key, user) {
    if (user.id === id) {
      $("#detail-fullname").text("Full Name: " + user.firstName + " " + user.lastName);
      $("#detail-address").text("Address: " + user.address);
      $("#detail-age").text("Age: " + user.age);
      $("#detail-interest").text("Interest: " + user.interest);
    }
  });
}

function getCount(data) {
  const el = $("#counter");
  let name = "User";
  if (data) {
    if (data > 1) {
      name = "Users";
    }
    el.text(data + " " + name);
  } else {
    el.text("No " + name);
  }
}

$("#filter").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $(".list-group-item").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

$(".my-form").on("submit", function () {
  const user = {
    firstName: $("#edit-firstname").val(),
    lastName: $("#edit-lastname").val(),
    address: $("#edit-address").val(),
    age: $("#edit-age").val(),
    interest: $("#edit-interest").val(),
    imagePath: $("#edit-image").val(),
    id: $("#edit-id").val()
  };

  $.ajax({
    url: uri + "/" + $("#edit-id").val(),
    type: "PUT",
    accepts: "application/json",
    contentType: "application/json",
    data: JSON.stringify(user),
    success: function (result) {
      getData();
    }
  });
  return false;
});