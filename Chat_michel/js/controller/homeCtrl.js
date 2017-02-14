var app = angular.module("app", ["firebase"]);

    
  app.controller("appCtrl", function($scope, $firebaseArray, $http, $interval){

  window.onunload = Sair;
  function Sair()
  {
    $scope.addMessage('finalizado');
    var statusCliente = new Firebase("https://chatmichel.firebaseio.com/statusCliente/"+URLrandom); 
    var gravar = $firebaseArray(statusCliente);
    gravar.$add({
          
          //Nome: $scope.Nome,
          situacao: 'finalizado',
          data:  data.getHours()+'h '+data.getMinutes()+'m '+ data.getSeconds()+'s',     
          formato: "red",
             
        });

  }
  
  var random = Math.floor((Math.random() * 999) + 1); 
  var data = new Date();      
  var dia = data.getDate();
  var horas = data.getHours();
  var minutos = data.getMinutes();
  var segundos = data.getSeconds();
  var URLrandom =  horas+''+minutos+''+segundos+'_'+dia;
  console.log(URLrandom);
  //console.log(minutos);
  //console.log(segundos);
  //console.log(dia);
  //var URLrandom =  random+'_'+dia;
 
  var ref = new Firebase("https://chatmichel.firebaseio.com/batepapo/"+URLrandom);
  var statusC = new Firebase("https://chatmichel.firebaseio.com/statusChat"); 
  
  $scope.messages = $firebaseArray(ref);
  var statusChat = $firebaseArray(statusC);
  $scope.admChat = [];
  var janelaChat = 0;
  var quantidadeAdmOnline = 0;
  var usuarioChat = 0;
  var quemOnline = [];
  var verificaDados = 0;
  var testedostestes = [];
  var contaMensagem = 0;
  var janelaMensagem = document.getElementById("corpoMensagemID");
 

 ref.on("child_added", function(snapshot, prevChildKey){
      var newPost = snapshot.val();
      var teste1 = newPost.data;
      var teste2 = newPost.texto;
      testedostestes.push({data:teste1,texto:teste2});
 
     if(testedostestes.length > contaMensagem){
         
         contaMensagem += 1;
         btnExitChat();
         console.log(contaMensagem);
         
         //ativaPlay();
         scrollAuto();
     }

});

var scrollAuto = function(){

  var campoMSG = document.getElementById("corpoMensagemID").scrollHeight;
  var scrollmsg = 200;
  soma = campoMSG + scrollmsg;
  console.log(campoMSG);
  console.log(scrollmsg);
  console.log(soma);
  document.getElementById("corpoMensagemID").scrollTop = soma;
  //console.log("teste para saber se esta funcionando o btnExitChat");

}
    
var audio = document.getElementById('audio');

var ativaPlay =  function(){
    audio.play();
}      
      

  statusChat.$loaded()
    .then(function(){
      
        angular.forEach(statusChat, function(adm){
            
            $scope.admChat.push({nomeAdministrador: adm.nome, status: adm.status});
            //console.log(adm);
            
        })
        
        verificarAdmOnline();
    });
     
  $scope.addMessage = function(action){

    if(action == 'finalizado'){

      scrollAuto();
        contaMensagem -=1;
        var data = new Date();
        //document.getElementById("coletaDadosCliente").style.display = "nome";
        $scope.messages.$add({
          
          //Nome: $scope.Nome,
          texto: 'finalizado',
          data:  data.getHours()+'h '+data.getMinutes()+'m '+ data.getSeconds()+'s',     
          formato: "classRight",
             
        });

    }else{

      if(verificaDados == 1){

        document.getElementById("coletaDadosCliente").style.display = "block";
        verificaDados +=1;

    }else{
        
        scrollAuto();
        contaMensagem -=1;
        var data = new Date();
        //document.getElementById("coletaDadosCliente").style.display = "nome";
        $scope.messages.$add({
          
          //Nome: $scope.Nome,
          texto: $scope.msg,
          data:  data.getHours()+'h '+data.getMinutes()+'m '+ data.getSeconds()+'s',     
          formato: "classRight",
             
        });
        
        $scope.msg = "";
    }

    }
    
  };

 var ativaChat = function(){

            for(var i = 0; i < quemOnline.length; i++){

                    if(quemOnline.length > 0){
                        
                        document.getElementById("batePapoID").style.display = "block";
                        //criarUrlChat();

                    }else{
                        
                        alert("Corretores indiponiveis no momento!");
                    }

       }

}

var criarUrlChat = function(quemOnline){
    
    var NOVOCHAT = new Firebase("https://chatmichel.firebaseio.com/batepapo/"+URLrandom);
    
    NOVOCHAT.push({ 'nome':quemOnline[0].nomeAdministradorOn , 'texto': 'Ola, meu nome é' +quemOnline[0].nomeAdministradorOn+ 'como posso ajudalo','formato':'classLeft','status':'conversando'});

    console.log(quemOnline[0].nomeAdministradorOn);

}

var verificarAdmOnline = function(){
    
    for(var i = 0; i < $scope.admChat.length; i++){
        
        if($scope.admChat[i].status == "ligado"){
            
            
            quemOnline.push({nomeAdministradorOn: $scope.admChat[i].nomeAdministrador});

            //criarUrlChat(quemOnline); ---- descomentar essa function ---------------- ATIVO --------------------
            //console.log(quemOnline);
            document.getElementById("batePapoID").style.display = "block";
            document.getElementById("statuschat").style.backgroundColor = "green";
            document.getElementById("chatTXT1").innerHTML = "Estamos Online";
            //document.getElementsByClassName("corpoMensagem").scrollTo(0,document.body.scrollHeight);
            
            //document.getElementById("batePapoID").style.display = "block";
        }
        
    }
}

$scope.enviarDadosCli = function(){


  document.getElementById("coletaDadosCliente").style.display = "none";

  var dadosC = new Firebase("https://chatmichel.firebaseio.com/dadoscliente/"+URLrandom);



  if($scope.nome == ""){

      $scope.nome = "NUll";

  }else if($scope.telefone == ""){

    $scope.telefone = "Null";

  }else if($scope.email2 == ""){

     $scope.email2 = "Null";

  }else{
  //var dadosDoCliente = $firebaseArray(dadosC);


        dadosC.set({
          
          Nome: $scope.nome,
          ip: "Null",
          local : "Null",
          data:  "Null",
          email : $scope.email2,
          telefone: $scope.telefone,
          cidade : "Null",
          anota : "Null",
          atende : "Null",
          sala: URLrandom,    
            
             
        }); 

      }  
        console.log("https://chatmichel.firebaseio.com/dadoscliente/"+URLrandom);

}


//$scope.btnExitChat = function(){

  //document.getElementById("batePapoID").style.display = "none";

//}

$scope.chatTXT1CHAT = function(){

  if(quemOnline.length > 0){

    document.getElementById("batePapoID").style.display = "block";

  } else{


  }

  
}


$scope.controlaPlanos = function(){
    
var fredRef = new Firebase('https://chatmichel.firebaseio.com/batepapo/193_11');
    
fredRef.remove();
        

}



//$interval(btnExitChat, 1000);


      
});
    