function myFunction() {
    var x = document.getElementById("myText").value;
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "/api/v1/items?player="+x);
    oReq.responseType = "json";
    oReq.send();
  }

  function reqListener () {
    const resp = this.response;
    clearAll();
    if (resp["status"] == "fail") {
      console.log(resp);
      M.toast({html: resp["data"]})
    }
    else if (resp["status"] == "success") {
      resp["data"].forEach(function (item, index) {
        document.getElementsByClassName("s"+item["Slot"]).item(0).classList.add("hoverable")
        var tmpelem = document.createElement("img")
        document.getElementsByClassName("s"+item["Slot"]).item(0).removeChild(document.getElementsByClassName("s"+item["Slot"]).item(0).lastChild)
        document.getElementsByClassName("s"+item["Slot"]).item(0).appendChild(tmpelem)
        $.get('static/images/'+item["id"].split(":")[1]+".png")
          .done(function() { 
        // Do something now you know the image exists.
          tmpelem.src = 'static/images/'+item["id"].split(":")[1]+".png";
          }).fail(function() { 
        // Image doesn't exist - do something else.
          tmpelem.src = 'static/images/error.png'
        })
        tmpelem.className = "img-fill";
        if (item["Count"]>1) {
          var tmpcount = document.createElement("div")
          tmpcount.innerHTML = item["Count"]
          tmpcount.className = "text-br";
          document.getElementsByClassName("s"+item["Slot"]).item(0).appendChild(tmpcount)
        }
        if (item["Enchanted"]) {
          document.getElementsByClassName("s"+item["Slot"]).item(0).classList.add("accent-3")
          document.getElementsByClassName("s"+item["Slot"]).item(0).classList.add("purple")
        }
      });
      document.getElementsByClassName("model")[0].removeChild(document.getElementsByClassName("model")[0].lastChild)
      var playerRender = document.createElement("img")
      document.getElementsByClassName("model")[0].appendChild(playerRender)
      playerRender.src = "https://crafatar.com/renders/body/"+resp["uuid"]+"?overlay=true"
    } else {
      console.log("Something went really wrong :/ ")
    }
  }
  function clearAll() {
    var boxes = document.getElementsByClassName("inv")
    console.log(boxes)
    for (let item of boxes){
      while (item.firstChild) {
        item.removeChild(item.lastChild);
      }
      item.classList.remove("accent-3")
      item.classList.remove("purple")
      item.classList.remove("hoverable")
      var emptyImg = document.createElement("img")
      item.appendChild(emptyImg)
      emptyImg.src = 'static/images/empty.png';
      emptyImg.className = "img-fill";
    };
  }
