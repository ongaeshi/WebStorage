//
// @file 
// @brief
// @author ongaeshi
// @date   2011/02/25

addEvent(window, "load", function() {
  // �ۑ������f�[�^��ݒ�
  document.getElementById("ta").value = window.localStorage.getItem('HTML5_Step_Tutorial.Page_04.value');

  // �Z�[�u�f�[�^�̕ۑ�
  addEvent(document.getElementById("ta"), 'keyup', function () {
    window.localStorage.setItem('HTML5_Step_Tutorial.Page_04.value', document.getElementById("ta").value);
    window.localStorage.setItem('HTML5_Step_Tutorial.Page_04.timestamp', (new Date()).getTime());
  });
});



