let busc = ""; 

function fetchVideo(buscar, token = ""){
    
  let url = "";
  
  if (token === ""){

    url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${buscar}&key=AIzaSyCxDo8Sq5SGLkWVKydvD1PjBrwIR7ery58`;

  } else {
    url = `https://www.googleapis.com/youtube/v3/search?pageToken=${token}&part=snippet&maxResults=10&q=${buscar}&key=AIzaSyCxDo8Sq5SGLkWVKydvD1PjBrwIR7ery58` ;

  }

  $.ajax({
    url : url,
    method : "GET",
    dataType : "json", 
    success : function( responseJSON ){
        
      displayResults( responseJSON );
      
    },
    error : function( error ){
      console.log( error );
    }
  });
}

function displayResults( responseJSON ){
  let results = $( "#results" );
  let botones = $( "#botones" );
  let video = responseJSON.items;
  let siguiente = responseJSON.nextPageToken;
  let antes = responseJSON.prevPageToken;
  console.log(responseJSON);
  
  results.empty();
 
  
  for (let i = 0; i< video.length; i++) {

    results.append(`<div id="result">
                      <a target="_blank" href="https://www.youtube.com/watch?v=${video[i].id.videoId}">
                        <p>${video[i].snippet.title}</p>
                        <img class="dimension" src="${video[i].snippet.thumbnails.high.url}"/>
                      </a>
                    </div>`);
  } 

  botones.empty();


  if (antes != null){
    botones.append(`<button class="boton" id="antes" value="${antes}">Antes</button>`);
   
  }

  if (siguiente != null){
    botones.append(`<button class="boton" id="despues" value="${siguiente}">Siguiente</button>`);
  }

 

}

function buttons(){
  $("#botones").on("click","#antes", (event)=>{
   fetchVideo(busc, $(event.target).val());
   scroll(0,0);
   
  
  })

  $("#botones").on("click","#despues", (event)=>{
    fetchVideo(busc, $(event.target).val());
    scroll(0,0);
  })
}



function watchForm(){
  
  $("#video").on( 'submit' , ( event ) => {
    event.preventDefault();
    let buscar = $("#buscar").val();
    busc = buscar;
    if(buscar === ""){
      console.log("No hay busqueda");
      return;
    }

    fetchVideo(buscar);  
    $("#buscar").val("");

  });

}

function init(){
  watchForm();
  buttons();
  
  
}
  
init();