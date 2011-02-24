//
// @file 
// @brief
// @author ongaeshi
// @date   2011/02/25

addEvent(window, "load", function() {
  // 保存したデータを設定
  document.getElementById("ta").value = window.localStorage.getItem('HTML5_Step_Tutorial.Page_04.value');

  // セーブデータの保存
  addEvent(document.getElementById("ta"), 'keyup', function () {
    window.localStorage.setItem('HTML5_Step_Tutorial.Page_04.value', document.getElementById("ta").value);
    window.localStorage.setItem('HTML5_Step_Tutorial.Page_04.timestamp', (new Date()).getTime());
  });
});



