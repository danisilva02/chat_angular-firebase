window.onload = function(){



//=================== ativa tabelas =======================//

var modal = document.getElementById("modal_topo");
var tabelaPopup1 = document.getElementById("popup_plano1");
var tabelaPopup2 = document.getElementById("popup_plano2");
var tabelaPopup3 = document.getElementById("popup_plano3");
var tabelaPopup4 = document.getElementById("popup_plano4");


document.getElementById("tabela1").addEventListener('click' , function(){

	tabelaPopup1.style.display = "block";
	modal.style.display = "block";

});
document.getElementById("tabela2").addEventListener('click' , function(){

	tabelaPopup2.style.display = "block";
	modal.style.display = "block";

});
document.getElementById("tabela3").addEventListener('click' , function(){

	tabelaPopup3.style.display = "block";
	modal.style.display = "block";

});
document.getElementById("tabela4").addEventListener('click' , function(){

	tabelaPopup4.style.display = "block";
	modal.style.display = "block";

});

document.getElementById("btnExitpopup1").addEventListener('click' , function(){

	tabelaPopup1.style.display = "none";
	tabelaPopup2.style.display = "none";
	tabelaPopup3.style.display = "none";
	tabelaPopup4.style.display = "none";
	modal.style.display = "none";

});

document.getElementById("btnExitpopup2").addEventListener('click' , function(){

	tabelaPopup1.style.display = "none";
	tabelaPopup2.style.display = "none";
	tabelaPopup3.style.display = "none";
	tabelaPopup4.style.display = "none";
	modal.style.display = "none";

});

document.getElementById("btnExitpopup3").addEventListener('click' , function(){

	tabelaPopup1.style.display = "none";
	tabelaPopup2.style.display = "none";
	tabelaPopup3.style.display = "none";
	tabelaPopup4.style.display = "none";
	modal.style.display = "none";

});

document.getElementById("btnExitpopup4").addEventListener('click' , function(){

	tabelaPopup1.style.display = "none";
	tabelaPopup2.style.display = "none";
	tabelaPopup3.style.display = "none";
	tabelaPopup4.style.display = "none";
	modal.style.display = "none";

});



//=================== fim tabelas =======================//

//=========================== btn telefones ================== //	

var aberto = 0;

document.getElementById("contato_topo_id").addEventListener('click', function(){

	if(aberto == 0){
    
    document.documentElement.classList.add("ativa_todos_telefones");
    aberto +=1;

    }else{

    document.documentElement.classList.remove("ativa_todos_telefones");
    aberto -=1;	

    }
    
});

//=========================== FIM btn telefones ================== //

    
}    