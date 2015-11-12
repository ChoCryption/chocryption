window.onload = function () {
  document.getElementById("pasteTarget").
  addEventListener("paste", handlePaste);
};

var handlePaste = function (e) {
  var item = e.clipboardData.items[0];
  decryptMessage(item.getAsFile());
};


var encryptMessage = function (message, callback) {
  $.ajax({
    method: 'POST',
    data: message,
    url: '/api/encrypt',
    success: function (data) {
      callback(data);
    }
  });
};

var decryptMessage = function (file, callback) {
  $.ajax({
    method: 'POST',
    data: file,
    url: '/api/decrypt',
    success: function (data) {
      callback(data);
    }
  });
};
