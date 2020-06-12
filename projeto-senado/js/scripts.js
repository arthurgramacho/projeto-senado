$(document).ready( function () {
    var parlamentares;
	var comissoes;

	
	$.get( "http://legis.senado.leg.br/dadosabertos/senador/lista/atual.json", function(data) {
		parlamentares = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
				
		var dataSet = [];
		$.each(parlamentares, function(index,data){
			dataSet.push([
				'<img style="max-width:100px" class="img" src="'+data.IdentificacaoParlamentar.UrlFotoParlamentar+'">',
				data.IdentificacaoParlamentar.NomeParlamentar,
				data.IdentificacaoParlamentar.UfParlamentar,
				data.IdentificacaoParlamentar.SiglaPartidoParlamentar,
				data.IdentificacaoParlamentar.MembroMesa,
				data.IdentificacaoParlamentar.MembroLideranca,
				'<a href="'+data.IdentificacaoParlamentar.UrlPaginaParlamentar+'" target="_blank">Página Oficial</a>',
				getTotalComissoesTitular(data.IdentificacaoParlamentar.CodigoParlamentar),
				getTotalComissoesSuplente(data.IdentificacaoParlamentar.CodigoParlamentar)
			]);
		});
		$('#tb-senadores').DataTable({
		  data: dataSet,
		  columns: [
			{ title: 'Foto' },
			{ title: 'Nome' },
			{ title: 'Estado' },
			{ title: 'Partido' },
			{ title: 'Membro da Mesa' },
			{ title: 'Membro da Liderança' },
			{ title: 'Página Oficial' },
			{ title: 'Total Comissões Titular' },
			{ title: 'Total Comissões Suplente' }
		  ]
		});	
			
	});
	
	function getTotalComissoesTitular(codigoParlamentar){
		//comissoes = {};
		totalTitular = 0;
		/*$.get( "http://legis.senado.leg.br/dadosabertos/senador/"+codigoParlamentar+"/comissoes.json", function retorno(data2) {
			comissoes = data2.MembroComissaoParlamentar.Parlamentar.MembroComissoes.Comissao;
			//console.log(comissoes);
			if(comissoes){	
			totalTitular = 0;
				for(var i = 0; i < comissoes.length; i++){
					if(comissoes[i].DescricaoParticipacao == "Titular"){
						totalTitular++;
					}
					//console.log(comissoes[i].DescricaoParticipacao);
					//console.log(totalTitular);		
				}					
			}
			return comissoes;
		});	*/
		jQuery.ajax({

			url: "http://legis.senado.leg.br/dadosabertos/senador/"+codigoParlamentar+"/comissoes.json", //?id="+idUltimo,
			dataType: "json",
			async : false,
			success: function(data) {
				comissoes = data.MembroComissaoParlamentar.Parlamentar.MembroComissoes.Comissao;
				
				if(comissoes){	
				totalTitular = 0;
					for(var i = 0; i < comissoes.length; i++){
						if(comissoes[i].DescricaoParticipacao == "Titular"){
							totalTitular++;
						}		
					}					
				}
			}
		});	
		return totalTitular;
	}
	
	function getTotalComissoesSuplente(codigoParlamentar){
		totalSuplente = 0;
		
		jQuery.ajax({

			url: "http://legis.senado.leg.br/dadosabertos/senador/"+codigoParlamentar+"/comissoes.json", //?id="+idUltimo,
			dataType: "json",
			async : false,
			success: function(data) {
				comissoes = data.MembroComissaoParlamentar.Parlamentar.MembroComissoes.Comissao;
				
				if(comissoes){	
				totalSuplente = 0;
					for(var i = 0; i < comissoes.length; i++){
						if(comissoes[i].DescricaoParticipacao == "Suplente"){
							totalSuplente++;
						}		
					}					
				}
			}
		});	
		return totalSuplente;
	}
	
	
	
	
	
	
	
	
} );