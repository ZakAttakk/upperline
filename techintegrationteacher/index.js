document.addEventListener("DOMContentLoaded", checkWidth);

function checkWidth(){
  if (screen.width <= 700){
    document.getElementById("grid").style.height = "70vh";
    document.getElementById("grid").style.width = "96vw";
    //console.log("mobile");
    document.getElementById("item1").style.fontSize = "5.5rem";
    document.getElementById("item2").style.fontSize = "3rem";
    document.getElementById("item3").style.fontSize = "3rem";
    document.getElementById("item4").style.fontSize = "3rem";
    document.getElementById("item5").style.fontSize = "3rem";
    document.getElementById("item6").style.fontSize = "3rem";

    document.getElementById("item2").style.backgroundColor = "rgba(239, 229, 218, 0.65)";
    document.getElementById("item3").style.backgroundColor = "rgba(239, 229, 218, 0.65)";
    document.getElementById("item4").style.backgroundColor = "rgba(239, 229, 218, 0.70)";
  }
  init();
}

function init(){
  var grid = document.getElementById("grid");
  var gridItems = grid.querySelectorAll("div");
  console.log(gridItems);

  gridItems[1].addEventListener("click", admin);
  gridItems[2].addEventListener("click", children);
  gridItems[3].addEventListener("click", coding);
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

  function coding(){
    window.location.assign("http://www.techintegrationteacher.com/p5/p5-lesson/index.html");
  }

  function children(){
    window.location.assign("https://drive.google.com/open?id=0B28VHBgl_MZeYjIxUTJJNV9Fb00");
  }

  // document.getElementById("test").innerHTML = screen.width;

  function checkWidth(){
    if (screen.width <= 700){
      document.getElementById("grid").style.height = "70vh";
      document.getElementById("grid").style.width = "96vw";
      //console.log("mobile");
      document.getElementById("item1").style.fontSize = "5.0rem";
      document.getElementById("item2").style.fontSize = "2.8rem";
      document.getElementById("item3").style.fontSize = "2.8rem";
      document.getElementById("item4").style.fontSize = "2.8rem";
      document.getElementById("item5").style.fontSize = "2.8rem";
      document.getElementById("item6").style.fontSize = "2.8rem";

      document.getElementById("item2").style.backgroundColor = "rgba(239, 229, 218, 0.65)";
      document.getElementById("item3").style.backgroundColor = "rgba(239, 229, 218, 0.65)";
      document.getElementById("item4").style.backgroundColor = "rgba(239, 229, 218, 0.70)";
    }
  }
  checkWidth();

  // document.getElementById("test").innerHTML = window.innerWidth;

}
