var app = angular.module("sistema", ["firebase"]);
  	
  app.controller("sistemaCtrl", function($scope, $firebaseArray, $interval, $http) {
	
  $scope.trocaURL;

  var ref;
  $scope.urlBatepapo = new Firebase("https://chatmichel.firebaseio.com/batepapo/"); 
  var urlBatepapo = new Firebase("https://chatmichel.firebaseio.com/batepapo/");  
  $scope.urlBatepapo = $firebaseArray($scope.urlBatepapo);
  $scope.userOnline = [];
  $scope.sdc;
  $scope.messages;
  $scope.baseClienet; 
  var remove;         
  $scope.TodosdadosCliente = [

      {Nome: $scope.nome},
      {ip: "null"},
      {local : "null"},
      {data:  $scope.dataConversa},
      {email : $scope.email},
      {telefone: $scope.telefone},
      {cidade : $scope.cidade},
      {anota : $scope.anotacao},
      {atende : $scope.atendente},
      {sala: $scope.trocaURL}


  ]; 
  var newPost;    

 $scope.desativaChat = function(statusUsuario){
      
      var troca = new Firebase("https://chatmichel.firebaseio.com/statusChat/-KCLco8MuBut_sOmyh8v");

      if(statusUsuario == 'ligado'){

        troca.set({ nome: 'admin2', processo: 'livre', status: statusUsuario });
        document.getElementById("btnStatusChatUsario").style.background = "#59B459";
        document.getElementById("btnStatusChatUsario").style.color = "white";
        document.getElementById("btnStatusChatUsario").innerHTML = "Status chat - Onlie";

      }else if(statusUsuario == 'desligado'){

        troca.set({ nome: 'admin2', processo: 'livre', status: statusUsuario });
        document.getElementById("btnStatusChatUsario").style.background = "#D24844";
        document.getElementById("btnStatusChatUsario").style.color = "white";
        document.getElementById("btnStatusChatUsario").innerHTML = "Status chat - Off";

      }else{}
      
      
  }      
 
  $scope.StatusChat = function(){
      
      $http.get("https://chatmichel.firebaseio.com/statusChat/-KCLco8MuBut_sOmyh8v.json").success(function(data){
        //console.log(data);
        if(data.status == "ligado"){
            
            document.getElementById("btnStatusChatUsario").style.background = "#59B459";
            document.getElementById("btnStatusChatUsario").style.color = "white";
            document.getElementById("btnStatusChatUsario").innerHTML = "Status chat - Onlie";
            
        }else{
            
            document.getElementById("btnStatusChatUsario").style.background = "#D24844";
            document.getElementById("btnStatusChatUsario").style.color = "white";
            document.getElementById("btnStatusChatUsario").innerHTML = "Status chat - Off";
            
        }
      });
      
  }   
   
  $scope.StatusChat();
  
 var Carrega = function(){
    var todosOsDadosCli;
    var SalasCliente;
    var quantConversa = 0;
    var quantideOnline = 0;
       function carregaDadosSala(){ 
        $http.get("https://chatmichel.firebaseio.com/batepapo.json").success(function(data){
            quantConversa = data;
            $scope.userOnline = [];
            
            angular.forEach(data, function(adm, value){

             $http.get("https://chatmichel.firebaseio.com/statusCcliente/"+value+'.json').success(function(data){

                //console.log(data);
                if(data == null){

                    console.log('sala é nulla' + data);

                }else{

                    console.log('sala não é nulla'+ data);
                }

              });
              
            $scope.userOnline.push({batepapo: value, dados: adm});
            quantideOnline = $scope.userOnline.length;
            console.log(quantideOnline);
            //for(var i = 0; i < $scope.userOnline.batepapo)  

            //console.log(value);
            SalasCliente = data;

          });
            //todosOsDadosCli = data;
            var dstDiv = angular.element(document.querySelector('#div0'));
            dstDiv.html('Teste');
            //console.log(document.querySelector('#div0'));
            teste1();

        });
    }

    carregaDadosSala();
} 
      
  $scope.addMessage = function() {
      
      var data = new Date(); 
    
   $scope.messages.$add({
    	
      Nome: "administrador",
      texto: $scope.msg,
      data:  data.getHours()+'h '+data.getMinutes()+'m '+ data.getSeconds()+'s',
      formato: "classLeft",
      
      
    });

   $scope.msg = "";
  };
      
      
  $scope.SalvarDadosDoCliente = function() {
   //var sdc;      
   var refDadosCli = new Firebase('https://chatmichel.firebaseio.com/dadoscliente/'+$scope.trocaURL); 
   //$scope.sdc = $firebaseArray(refDadosCli);      
      
   var nome1 = document.getElementById("nome1").value;
   var email1 = document.getElementById("email1").value;
   var atendente1 = document.getElementById("atendente1").value;
   var data1 = document.getElementById("data1").value;
   var telefone1 = document.getElementById("telefone1").value;
   var cidade1 = document.getElementById("cidade1").value;
   var anotacao = document.getElementById("anotacao").value;
      
   refDadosCli.set({
      
      Nome: nome1,
      ip: "null",
      local : "null",
      data:  data1,
      email : email1,
      telefone: telefone1,
      cidade : cidade1,
      anota : anotacao,
      atende : atendente1,
      sala: $scope.trocaURL 
      
      
    });
      
      
      
      remove = $scope.trocaURL+'/'+$scope.baseClienet;
      console.log('https://chatmichel.firebaseio.com/dadoscliente/'+$scope.trocaURL+'/'+$scope.baseClienet);
      

  };
      
 $scope.trocaSala = function(sala){
      
      
      $scope.TodosdadosCliente;
      $scope.trocaURL = sala.users.batepapo;
      //console.log($scope.trocaURL);
      //$scope.urlBatepapo = new Firebase("https://bdchatmarcelo.firebaseio.com/batepapo/"+sala.users.batepapo);
      var ref = new Firebase("https://chatmichel.firebaseio.com/batepapo/"+sala.users.batepapo);
      $scope.messages = $firebaseArray(ref);
      
      var refDadosCli = new Firebase('https://chatmichel.firebaseio.com/dadoscliente/'+sala.users.batepapo);

      $http.get("https://chatmichel.firebaseio.com/dadoscliente/"+sala.users.batepapo+'.json').success(function(data){

        $scope.TodosdadosCliente = data;

        console.log(data.Nome);
        console.log(data.anota);
        console.log(data.atende);
        console.log(data.cidade);
        console.log(data.data);
        console.log(data.sala);


        if(data.atende == "Null"){

          document.getElementById("atendente1").disabled = false;
          document.getElementById("atendente1").style.background = 'blue';
        
        }else{

          document.getElementById("atendente1").disabled = true;
          document.getElementById("atendente1").style.background = 'yellow';


        }

      });
     
     
  }     

$scope.finalizarConversa = function(){
    
    var dadosfinalizado;
    //var urlDeleta = 'https://bdchatmarcelo.firebaseio.com/dadoscliente/'+$scope.trocaURL+'/'+$scope.baseClienet;
    var urlDeleta = new Firebase('https://chatmichel.firebaseio.com/batepapo/'+$scope.trocaURL);
    var urlFinalizados = new Firebase('https://chatmichel.firebaseio.com/finalizados/'+$scope.trocaURL);
    urlDeleta.on("value", function(snapshot){
      dadosfinalizado = snapshot.val();      
      console.log(dadosfinalizado);
           
});
    urlFinalizados.set(dadosfinalizado);
    urlDeleta.remove();
}

$scope.transferirParaRetorno = function(){

    var dadosRetorna;
    //var urlDeleta = 'https://bdchatmarcelo.firebaseio.com/dadoscliente/'+$scope.trocaURL+'/'+$scope.baseClienet;
    var urlDeleta1 = new Firebase('https://chatmichel.firebaseio.com/batepapo/'+$scope.trocaURL);

    var urlRetorna = new Firebase('https://chatmichel.firebaseio.com/retorna/'+$scope.trocaURL);

    //console.log('https://bdchatmarcelo.firebaseio.com/batepapo/'+$scope.trocaURL);
    //console.log('https://bdchatmarcelo.firebaseio.com/retorna/'+$scope.trocaURL);
    
    urlDeleta1.on("value", function(snapshot){
      dadosRetorna = snapshot.val();      
      console.log(dadosRetorna);
           
    });
    urlRetorna.set(dadosRetorna);
    urlDeleta1.remove();

}


var carregaFinalizados = function(){
  
  $scope.clientesFinalizados = [];
  var urlCliFinalizado = new Firebase('https://chatmichel.firebaseio.com/finalizados');
  var caracas = $firebaseArray(urlCliFinalizado);

  caracas.$loaded()
    .then(function(){
        angular.forEach(caracas, function(adm){   
         $scope.clientesFinalizados.push({sala:adm.$id});
           //console.log(adm.$id);    
        })
      });
}

var carregaRetornarCli = function(){
  
  $scope.clientesRetornar = [];
  var urlCliRetornar = new Firebase('https://chatmichel.firebaseio.com/retorna');
  var caracas1 = $firebaseArray(urlCliRetornar);

  caracas1.$loaded()
    .then(function(){
        angular.forEach(caracas1, function(adm){
         $scope.clientesRetornar.push({sala:adm.$id});
           //console.log(adm.$id);    
        })
      });
} 

$scope.trocaFina = function(finalizadosSala){
$scope.trocaURL = finalizadosSala.usersFinalizado.sala;
//var ref2 = new Firebase("https://bdchatmarcelo.firebaseio.com/finalizados/"+teste.usersFinalizado.sala);
$http.get("https://chatmichel.firebaseio.com/finalizados/"+finalizadosSala.usersFinalizado.sala+'.json').success(function(data){
    $scope.messages = data;
  });
$http.get("https://chatmichel.firebaseio.com/dadoscliente/"+finalizadosSala.usersFinalizado.sala+'.json').success(function(data){
    $scope.TodosdadosCliente = data;
  });
}


$scope.trocaRetorno = function(retorno){

  $scope.trocaURL = retorno.usersRetorna.sala;
  //console.log($scope.trocaURL);
  $http.get("https://chatmichel.firebaseio.com/retorna/"+retorno.usersRetorna.sala+'.json').success(function(data){
    $scope.messages = data;
  });
$http.get("https://chatmichel.firebaseio.com/dadoscliente/"+retorno.usersRetorna.sala+'.json').success(function(data){
    $scope.TodosdadosCliente = data;
  });


}

$scope.excluirDoSistema = function(qualGuia,id){

   var urlDadosConversaExcluida = new Firebase('https://chatmichel.firebaseio.com/conversaExcluida/'+id);
   var dadosConversaFinaliza;
   var dadosConversaRetorna;

   if(qualGuia == "finalizado"){

      var urlDeletaFinalizados = new Firebase('https://chatmichel.firebaseio.com/finalizados/'+id);

      $http.get('https://chatmichel.firebaseio.com/finalizados/'+id+'.json').success(function(data){

         var dadosConversaFinaliza = data;
         urlDadosConversaExcluida.set(dadosConversaFinaliza);
         urlDeletaFinalizados.remove();
         //console.log(dadosConversaFinaliza);

      });
      //urlDadosConversaExcluida.set(dadosConversaFinaliza);
      //urlDeletaFinalizados.remove();
      //console.log(dadosConversaFinaliza);


    }else if(qualGuia == "retorna"){

      var urlDeletaRetorno = new Firebase('https://chatmichel.firebaseio.com/retorna/'+id);
      $http.get('https://chatmichel.firebaseio.com/retorna/'+id+'.json').success(function(data){
        dadosConversaRetorna = data;

        urlDadosConversaExcluida.set(dadosConversaRetorna);
        urlDeletaRetorno.remove();
      });
      


    }else{

        return false;
    }

}

function teste1(){

  //document.querySelector('#div0').innerHTML = "20";
}
/*urlBatepapo.on("value", function(snapshot) {
  console.log(snapshot.val());
  //$scope.userOnline.push({batepapo: snapshot.val()});
  $scope.userOnline = snapshot.val();
  console.log($scope.userOnline);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});*/
    Carrega();
    //$interval(Carrega, 5000);
    $interval(carregaFinalizados, 5000);
    $interval(carregaRetornarCli, 5000);
    //Carrega();
    //Carrega1();
    
});