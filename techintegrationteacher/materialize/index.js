document.addEventListener("DOMContentLoaded", init);


function init(){
  var grid = document.getElementById("grid");
  var gridItems = grid.querySelectorAll("div");
  console.log(gridItems);

  gridItems[1].addEventListener("click", admin);
  gridItems[2].addEventListener("click", children);
  gridItems[4].addEventListener("click", showResume);
  gridItems[5].addEventListener("click", showCurriculum);

  function showResume(){
    window.location.assign("zach_brewer_resume.pdf");
  }

  function showCurriculum(){
    window.location.assign("K-5_Technology_Curriculum_Grid.pdf");
  }

  function admin(){
    window.location.assign("https://drive.google.com/open?id=0B28VHBgl_MZeQmJfMEVqSkIyM2c");
  }

  function children(){
    window.location.assign("https://drive.google.com/open?id=0B28VHBgl_MZeYjIxUTJJNV9Fb00");
  }



}
