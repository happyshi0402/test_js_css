// JavaScript Document
//SweetAlert弹窗 Start

//message提示信息
document.querySelector('button.message').onclick = function(){
  swal("请选择至少一个样本！");
};

//success成功提示,几秒后弹框消失
document.querySelector('button.success').onclick = function(){
  //swal("Good job!", "You clicked the button!", "success");
    swal({
        title: "操作成功!",
        text: "窗口将在2秒后消失",
        type: "success",
        timer: 2000,
        showConfirmButton: false
    });
};

//Delete删除提示
document.querySelector('button.warning.confirm').onclick = function(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this imaginary file!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false
  },
  function(){
    swal("Deleted!", "Your imaginary file has been deleted!", "success");
  });
};

//警告提示
document.querySelector('button.warning.cancel').onclick = function(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this imaginary file!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: "No, cancel plx!",
    closeOnConfirm: false,
    closeOnCancel: false
  },
  function(isConfirm){
    if (isConfirm){
      swal("Deleted!", "Your imaginary file has been deleted!", "success");
    } else {
      swal("Cancelled", "Your imaginary file is safe :)", "error");
    }
  });
};

//SweetAlert弹窗 End