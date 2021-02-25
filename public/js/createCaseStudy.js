function upload() {
  //get blog heading
  var heading = document.getElementById('heading').value;
  //get blog description
  var description = document.getElementById('description').value;
  //get blog category
  var category = document.getElementById('category').value;
  //get your image
  var imagePost = document.getElementById('imagePost').files[0];
  //get your image
  var image = document.getElementById('image').files[0];
  //get image alt tag
  var imageAlt = document.getElementById('imageAlt').value;
  //get your blog text
  var summernote = document.getElementById('summernote').value;
  //get image name
  var imageName = image?.name;
  var imagePostName = imagePost?.name;
  var imagePostNew, imageThumbnail;
  //firebase storage reference
  //it is the path where your image will be stored
  var images = [];
  var downloadURLs = [];
  var promiseArray = [];
  images.push(imagePost);
  images.push(image);

  let promise, storageRef;
  //get your image download url here and upload it to databse
  for (var imageElement of images) {
    //make sure you pass image here
    storageRef = firebase.storage().ref('images/' + imageElement?.name); //Change the folder name
    promise = storageRef.put(imageElement).then(snapshot => {
      return snapshot.ref.getDownloadURL().then(downloadURL => {
        downloadURLs.push(downloadURL);
        return downloadURL;
      });
    })
    promiseArray.push(promise);
  }

  Promise.all(promiseArray).then(data => {

    //our path where data is stored ...push is used so that every post have unique id
    firebase.database().ref('case_study/').push().set({
      heading: heading,
      description: description,
      category: category,
      text: summernote,
      imagePostURL: downloadURLs[0], //mismatch in names
      imageURL: downloadURLs[1],
      imageAlt: imageAlt
    }, function (error) {
      if (error) {
        alert("Error while uploading");
      } else {
        alert("Successfully uploaded");
        //now reset your form
        document.getElementById('post-form').reset();
        document.getElementById('summernote').summernote('reset');
        getdata();
      }
    });
  });

}

window.onload = function () {
  this.getdata();
}


function getdata() {
  firebase.database().ref('case_study/').once('value').then(function (snapshot) {
    //get your posts div
    var posts_div = document.getElementById('posts');
    //remove all remaining data in that div
    posts.innerHTML = "";
    //get data from firebase
    var data = snapshot.val();
    //now pass this data to our posts div
    //we have to pass our data to for loop to get one by one
    //we are passing the key of that post to delete it from database
    if (!data) {
      return;
    }
    for (let [key, value] of Object.entries(data)) {
      var headSub = value.heading.substr(0, 50);
      var temp = document.createElement("div");
      temp.innerHTML = value.description;
      temp = temp.textContent || temp.innerText || "";
      temp = temp.substr(0, 50);
      posts_div.innerHTML = "<div class='col-sm-4 mt-2 mb-1'> " +
        "<div class='card h-100'>" +
        "<a href='https://us-central1-finsense-wealth-minimal.cloudfunctions.net/app/case_study/" + key + "'>" +
        "<img src='" + value.imageURL + "' style='height:200px;'> </a>" +
        "<div class='card-body'><a href='https://us-central1-finsense-wealth-minimal.cloudfunctions.net/app/case_study/" + key + "'><h4 class='card-title'>" + headSub + "</h4>" +
        "<p class='card-text'>" + temp + "</p></a>" +
        "<button class='btn btn-danger' id='" + key + "' onclick='delete_post(this.id)'>Delete</button>" +
        "</div></div></div>" + posts_div.innerHTML;
    }

  });
}

function delete_post(key) {
  firebase.database().ref('case_study/' + key).remove();
  getdata();

}
