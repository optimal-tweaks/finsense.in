window.onload = function () {
  this.getdata();
}


function getdata() {
  firebase.database().ref('blogs/').once('value').then(function (snapshot) {
    //get your suggestions div
    var posts_div = document.getElementById('suggestions');
    //remove all remaining data in that div
    posts_div.innerHTML = "";
    //get data from firebase
    var data = snapshot.val();
    //now pass this data to our suggestions div
    //we have to pass our data to for loop to get one by one
    var keys = Object.keys(data);
    var duplicate = keys;
    var temp = duplicate.splice(0, 3);
    let suggestionBlogId = ['w-node-c3049dfafa21-0d643f12', 'w-node-c3049dfafa2b-0d643f12', 'w-node-c3049dfafa35-0d643f12'];
    let suggestionBlogDataId = ['e85f37d2-f5f4-dd91-1c7f-c3049dfafa21', 'e85f37d2-f5f4-dd91-1c7f-c3049dfafa2b', 'e85f37d2-f5f4-dd91-1c7f-c3049dfafa35'];
    var content = "<div class='tab-wrapper w-container'>";
    for (var j = 0; j < temp.length; j++) {
      content += "<a id='" + suggestionBlogId[j] + "' data-w-id='" + suggestionBlogDataId[j] + "' href='https://us-central1-finsense-wealth-minimal.cloudfunctions.net/app/post/" + temp[j] + "' aria-current='page' class='tab-block w-inline-block w--current'>" +
        "<div class='div-block-14' style='background-image:url(" + data[temp[j]].imageURL + ")'></div>" +
        "<div style='background-color:rgb(247,248,249)' class='div-block-15'>" +
        "<div class='div-block-50'>" +
        "<h3 style='color:rgb(0,0,0)' class='cta-card-headings'>" + data[temp[j]].heading + "</h3>" +
        "<p style='color:rgb(66,66,66)' class='paragraph_16-px centre-justified dark-slate-grey'>" + data[temp[j]].description + "</p>" +
        "</div>" +
        "<div style='transform: translate3d(0px, 0px, 0px) scale3d(0, 0, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; class='cta-arrow'><img src='../images/-1.svg' alt='' class='image-44'></div>" +
        "</div></a>";
    }
    posts_div.innerHTML = content + "</div>";
  });
}