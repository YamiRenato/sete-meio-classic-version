$(document).ready(function(){
	
	//Definindo as Cartas do Jogo e os Seus Valores

	var cards = [[[],[]] , [[],[]], [[],[]], [[],[]], [[],[]], [[],[]], [[],[]], [[],[]]];
	
	/* Todas as Variações das Figuras */
	
	cards[0][0][0] = ['black_joker','red_joker','jack_of_clubs2','jack_of_diamonds2','jack_of_hearts2','jack_of_spades2','queen_of_clubs2','queen_of_diamonds2','queen_of_hearts2','queen_of_spades2','king_of_clubs2','king_of_diamonds2','king_of_hearts2','king_of_spades2'];
	
	cards[0][0][1] = [0.5];
	
	/* Todas as Variações do A */
	
	cards[1][0][0] = ['ace_of_clubs','ace_of_diamonds','ace_of_hearts','ace_of_spades']; 
	cards[1][0][1] = [1]; 
	
	/* Todas as Variações do 2 */

	cards[2][0][0] = ['2_of_clubs','2_of_diamonds','2_of_hearts','2_of_spades'];
	
	cards[2][0][1] = [2];
	
	/* Todas as Variações do 3 */

	cards[3][0][0] = ['3_of_clubs','3_of_diamonds','3_of_hearts','3_of_spades'];
	
	cards[3][0][1] = [3];
	
	/* Todas as Variações do 4 */

	cards[4][0][0] = ['4_of_clubs','4_of_diamonds','4_of_hearts','4_of_spades'];
	
	cards[4][0][1] = [4];
	
	/* Todas as Variações do 5 */

	cards[5][0][0] = ['5_of_clubs','5_of_diamonds','5_of_hearts','5_of_spades'];
	
	cards[5][0][1] = [5];
	
	/* Todas as Variações do 6 */
	
	cards[6][0][0] = ['6_of_clubs','6_of_diamonds','6_of_hearts','6_of_spades'];
	
	cards[6][0][1] = [6];
	
	/* Todas as Variações do 7 */

	cards[7][0][0] = ['7_of_clubs','7_of_diamonds','7_of_hearts','7_of_spades'];
	cards[7][0][1] = [7];
	
	//Definindo Variaveis para Amarzenar Informações do Jogo
	
	var i = 0;
	
	var playerAtual = 1;
	
	var victoriesPlayer1 = 0;
	
	var scorePlayer1 = 0;
	
	var victoriesMachine = 0;
	
	var firstCard = '';
	
	firstPoint = 0;
	
	var scoreMachine = 0;
	
	var stop = false;
	
	var stopGame = false;
	
	//Function para Ocultar/Mostrar Botões
	
	$.fn.hideShowBtn = function(acao)
	{
		if (acao == 1)
		{
			$('#buttons').hide();
		}
		else
		{
			$('#message').hide();
			
			$('#buttons').show();
		}
	}
	
	//Function para Resetar o Jogo
	
	$.fn.resetGame = function()
	{
		scorePlayer1 = 0;
		
		scoreMachine = 0;
		
		playerAtual = 1;
		
		stop = false;
		
		stopGame = false;
		
		$('#cards-j1').html('');
		
		$('#cont-points-j1').html('0 Pontos(s)');
		
		$('#cards-machine').html('');
		
		$('#status').html('');
		
		$('#cont-points-machine').html('0 Pontos(s)');
		
		$('#points').html('');
		
		$.fn.hideShowBtn(2);
		
		$('#newcard').hide();
		
		$('#skipgame').hide();
		
		$('#newgame').show();
	}
	
	//Function para Sortear Carta
	
	$.fn.randomCard = function()
	{
		var numrand = Math.ceil(Math.random() * 8) - 1;

		var nipe = Math.ceil(Math.random() * 4) - 1;
		
		var card = cards[numrand][0][0][nipe];
		var points = cards[numrand][0][1][0];
		
		var dados = [card,points];
		
		return dados;
	}
	
	//Function para Somar Total de Vitórias
	
	$.fn.somaVitorias = function(player)
	{
		if (player == 1)
		{
			$('#message').show();
			
			$('#status').html('<font>Player 1 Ganhou!</font>');
			
			victoriesPlayer1 += 1;
		
			$('#cont-victories-j1').html('<font>' + victoriesPlayer1 + ' Vitória(s)</font>');
		}
		else
		{
			$('#message').show();
	
			$('#status').html('<font>Machine Ganhou!</font>');			
			
			victoriesMachine += 1;
			
			$('#cont-victories-machine').html('<font>' + victoriesMachine + ' Vitória(s)</font>');
		}
	}
	
	//Function para Verificar se houve Algum Ganhador ou deu Empate
	
	$.fn.checkResult = function()
	{
		$('#m-1').html('<img src="img/Cards/' + firstCard + '.png" /></div>');
		
		$.fn.hideShowBtn(1);
		
		if (scorePlayer1 > scoreMachine)
		{
			$.fn.somaVitorias(1);
			
			stopGame = true;
			
			stop = true;
			
			setTimeout(function(){ $.fn.resetGame(); }, 3000);
		}
		else if (scorePlayer1 < scoreMachine)
		{
			$.fn.somaVitorias(2);
			
			stopGame = true;
			
			stop = true;
			
			setTimeout(function(){ $.fn.resetGame(); }, 3000);
		}
		else
		{
			$('#message').show();
			
			$('#status').html('<font>Empate!</font>');
			
			stopGame = true;
			
			stop = true;
			
			setTimeout(function(){ $.fn.resetGame(); }, 3000);
		}
	}
	
	//Lógica da Machine
	
	$.fn.machineLogic = function()
	{
		if (playerAtual == 2)
		{
			stop = false;
			
			if (scoreMachine >= 6.5)
			{
				var num = Math.ceil(Math.random() * 6);
				
				if (num > 1)
				{
					$('#cont-points-machine').html('<font>' + scoreMachine +' Ponto(s)</font><br/><br/>');
					
					stop = true;
				}
			}
			
			if (stop == false)
			{
				var dados = $.fn.randomCard();
				
				scoreMachine += dados[1];
			
				if (scoreMachine == 7.5)
				{
					$('#cards-machine').append('<div class="cards"><img src="img/Cards/' + dados[0] + '.png" /></div>');
					
					$('#cont-points-machine').html('<font>' + scoreMachine +' Ponto(s)</font><br/><br/>');
					
					$.fn.somaVitorias(2);
					
					$.fn.hideShowBtn(1);
					
					stopGame = true;
				
					stop = true;
					
					$('#m-1').html('<img src="img/Cards/' + firstCard + '.png" /></div>');
					
					setTimeout(function(){ $.fn.resetGame(); }, 3000);
				}
				else if (scoreMachine > 7.5)
				{
					$('#cards-machine').append('<div class="cards"><img src="img/Cards/' + dados[0] + '.png" /></div>');
					
					$('#cont-points-machine').html('<font>' + scoreMachine +' Ponto(s)</font><br/><br/>');
					
					$.fn.somaVitorias(1);
					
					$.fn.hideShowBtn(1);
					
					stopGame = true;
					
					stop = true;
					
					$('#m-1').html('<img src="img/Cards/' + firstCard + '.png" /></div>');
					
					setTimeout(function(){
						$.fn.resetGame(); 
					}, 3000);
				}
				else
				{
					$('#cards-machine').append('<div class="cards"><img src="img/Cards/' + dados[0] + '.png" /></div>');
					
					$('#cont-points-machine').html('<font>' + (scoreMachine - firstPoint) +' Ponto(s)</font><br/><br/>');
					
					$('#m-1').css('margin-right', '0')
					
					if (scoreMachine > 4 && scoreMachine < 7)
					{
						var num = Math.ceil(Math.random() * 6);
						
						if (num > 3)
						{
							$('#cont-points-machine').html('<font>' + scoreMachine +' Ponto(s)</font><br/><br/>');
							
							stop = true;
						}
					}
					else if (scoreMachine == 7)
					{
						var num = Math.ceil(Math.random() * 6);
						
						if (num > 1)
						{
							$('#cont-points-machine').html('<font>' + scoreMachine +' Ponto(s)</font><br/><br/>');
							
							stop = true;
						}
					}
				}
			}
			
			if (stop == false)
			{
				setTimeout(function(){ 
					$.fn.machineLogic();
				}, 2000);
			}
			else
			{
				if (stopGame == false)
				{
					$.fn.checkResult(); 
				}
			}
		}
	}
	
	//Function para Puxar Nova Carta e Verificar a Condição Atual do Jogo
	
	$.fn.newCard = function()
	{
		if (playerAtual == 1 && stop == false)
		{
			var dados = $.fn.randomCard();
	
			scorePlayer1 += dados[1];
		
			if (scorePlayer1 == 7.5)
			{
				$('#cards-j1').append('<div class="cards"><img src="img/Cards/' + dados[0] + '.png" /></div>');
				
				$('#cont-points-j1').html('<font>' + scorePlayer1 +' Ponto(s)</font><br/><br/>');
				
				$.fn.somaVitorias(1);
				
				$.fn.hideShowBtn(1);
				
				stopGame = true;
				
				stop = true;
				
				setTimeout(function(){ $.fn.resetGame(); }, 3000);
			}
			else if (scorePlayer1 > 7.5)
			{
				$('#cards-j1').append('<div class="cards"><img src="img/Cards/' + dados[0] + '.png" /></div>');
				
				$('#cont-points-j1').html('<font>' + scorePlayer1 +' Ponto(s)</font><br/><br/>');
				
				$.fn.somaVitorias(2);
				
				$.fn.hideShowBtn(1);
				
				stop = true;
				
				stopGame = true;
				
				setTimeout(function(){ 
					$.fn.resetGame(); 
				}, 3000);
			}
			else
			{
				$('#cards-j1').append('<div class="cards"><img src="img/Cards/' + dados[0] + '.png" /></div>');
			
				$('#cont-points-j1').html('<font>' + scorePlayer1 +' Ponto(s)</font><br/><br/>');
			}
		}
	}
	
	//Function para Começar um Novo jogo
	
	$.fn.newGame = function()
	{
		$('#newgame').hide();
		
		var dadosP1 = $.fn.randomCard();
		
		scorePlayer1 += dadosP1[1];
		
		$('#cards-j1').append('<div id="j-1" class="cards"><img src="img/Cards/' + dadosP1[0] + '.png" style="margin-right: 8px;" /></div>');
		
		$('#cont-points-j1').html('<font>' + scorePlayer1 +' Ponto(s)</font><br/><br/>');
		
		var dadosP2 = $.fn.randomCard();
	
		firstPoint = dadosP2[1];
		
		firstCard = dadosP2[0];
		
		scoreMachine += dadosP2[1];
		
		$('#cards-machine').append('<div class="cards" id="m-1"><img src="img/Cards/Cover.png" style="margin-right: 11px;" /></div>');
		
		$('#cont-points-machine').html('<font>-- Ponto(s)</font><br/><br/>');
		
		$('#newcard').show();
		
		$('#skipgame').show();
	}
	
	$('#newcard').on('click touchstart', function(){
		if (stopGame == false)
		$.fn.newCard();
	});
	
	$('#skipgame').on('click touchstart', function(){
		if (stopGame == false)
		{
			if (playerAtual == 1)
			{
				$('#newcard').hide();
				$('#skipgame').hide();
				stop = true;
				playerAtual = 2;
				$.fn.machineLogic();
			}
		}
	});
	
	$('#newgame').on('click touchstart', function(){
		$.fn.newGame();
	});
	
});