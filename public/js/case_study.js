window.onload = function () {
  this.getdata();
}


function getdata() {
  firebase.database().ref('case_study/').once('value').then(function (snapshot) {
    //get your posts div
    var posts_div = document.getElementById('case_study');
    //remove all remaining data in that div
    posts_div.innerHTML = "";
    //get data from firebase
    var data = snapshot.val();
    //now pass this data to our posts div
    //we have to pass our data to for loop to get one by one
    let loopIndex = 0;
    for (let [key, value] of Object.entries(data)) {

      posts_div.innerHTML = "<a " + `${loopIndex == 0 ? "id='w-node-470d3160ab99-3d151751'" : " "}` + "href='https://us-central1-finsense-wealth-minimal.cloudfunctions.net/app/case_study/" + key + "'" +
        "class='div-block-33 w-inline-block'>" +
        "<div class='div-block-34' style='background-image:url(" + value.imageURL + ")'></div>" +
        "<div class='div-block-35'>" +
        "<div class='div-block-36'>" +
        "<h2 class='heading-15'>" + value.heading + "</h2>" +
        "<p class='paragraph-5'>" + value.description + "</p>" + "</div>" +
        "<div class='div-block-37'>" +
        "<h4 class='heading-16'>" + value.category + "</h4>" +
        "<h4 class='heading-17'>Read More</h4>" +
        "</div></div></a>" + posts_div.innerHTML;

      loopIndex++;
    }


  });
}