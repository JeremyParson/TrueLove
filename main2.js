let data;
fetch('https://randomuser.me/api?results=500')
.then(function(response){
    return response.json();
})
.then(function(myjson){
    data = myjson;
    console.log(data);

for (let i=0; i<data.results.length;i++){ 
    let nameBox= document.createElement("div"); 
    nameBox.id = data.results[i].name.first;
    nameBox.className="namebox"
    let name = data.results[i].name.first.substring(0,1).toUpperCase()+data.results[i].name.first.substring(1); 
    let last_name= data.results[i].name.last.substring(0,1).toUpperCase()+data.results[i].name.last.substring(1); 
    console.log(name); 
    let imageURL=data.results[i].picture.large
    nameBox.innerHTML+=name + " "+ last_name; 
    let imageElement= document.createElement("img"); 
    imageElement.src= imageURL;
    nameBox.appendChild(imageElement);
 
    let locations = data.results[i].location.street
    let locationss= document.createElement("div") 
    locationss.className = "location"
    locationss.innerHTML += locations 
    let locationsss= data.results[i].location.city 
    locationss.innerHTML+= "<br> " + locationsss 
    let locationssss=data.results[i].location.state
    locationss.innerHTML+= '<br>'+ locationssss 
    nameBox.appendChild(locationss)
    document.body.appendChild(nameBox);
    let loveMePlz = document.createElement('button');
    // loveMePlz.onclick = `"window.location.href=./index2.html?index = ${i}"`;
    loveMePlz.setAttribute('onclick', `window.location.href="./index2.html?index=${i}&dataSeed=${data.info.seed}"`);
    loveMePlz.innerText = "Love Me";
    nameBox.appendChild(loveMePlz);
 }
 
 
 function alertDateMe(){
    alert("You have found your true love <3");
 }


 let searchButton = document.getElementById("search");
 searchButton.addEventListener('click', search);

 window.scroll({
    top: 2500, 
    left: 0, 
    behavior: 'smooth' 
  });
  
  // Scroll certain amounts from current position 
  window.scrollBy({ 
    top: 100, // could be negative value
    left: 0, 
    behavior: 'smooth' 
  });
  let target;
 function search(event){
    event.preventDefault();    
      // Scroll to a certain element
      target = document.getElementById('search-bar').value;
      if(document.getElementById(target) != null){
      console.log(target);
      console.log(document.getElementById(`${target}`).innerHTML);
      document.getElementById(target).scrollIntoView({ 
        behavior: 'smooth' 
      });
      document.getElementById(target).className = "target";
    }else{

        console.log("Searching for a location");
        
      for(let i in data.results){
        targetCity = document.getElementById("search-bar").value;
        target = document.getElementById(data.results[i].name.first);
          let targetName;
            if(data.results[i].location.city == targetCity){
                console.log("found a matching location!");
                target.remove();
                $( "#the-chosen-ones" ).prepend( target );
            }else{
                console.log("Did not find a matching location");
            }
      }
    }
 }

});