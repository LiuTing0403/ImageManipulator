var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

var manipulator = {
  process: function(e){
    var img = e.target;
    this.getGrayImage(img);
    this.whiteImg();
  },
  getGrayImage: function(img){
    var img_data;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img_data =  ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < img_data.data.length; i += 4) {
      var red = img_data.data[i];
      var green = img_data.data[i + 1];
      var blue = img_data.data[i + 2];
      var alpha = img_data.data[i + 3];
      var gray = (red * .3086 + green * .6094 + blue * .0820);
      img_data.data[i] = gray;
      img_data.data[i + 1] = gray;
      img_data.data[i + 2] = gray;
      img_data.data[i + 3] = gray;

    }
    ctx.putImageData(img_data, 0, 0);
  },
  whiteImg: function(){
    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    $("#manipulator").append($(img));
  }

};
var preloader = {
  srcs: ["images/1.jpg", "images/2.jpg", "images/3.jpg"],
  createImg: function(src) {
    var $img = $("<img />", { src: src });
    $("#preloader").append($img);
    $img.on("load", manipulator.process.bind(manipulator));
  },
  run: function() {
    this.srcs.forEach(this.createImg);
  }
};
$(preloader.run.bind(preloader));
