
const selectEstados = document.getElementById("estados");
const selectMunicipios = document.getElementById("municipios");

function popularEstados(){
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(dados=>dados.json())
    .then(dados=>{
        //console.log(JSON.stringify(dados));
        dados.forEach(estado=>{
            console.log(estado);
            const option = document.createElement("option");
            option.value = estado.id;
            option.innerHTML = estado.nome;
            selectEstados.appendChild(option);
        });
        popularMunicipios(selectEstados.value);//adicionado para carregar os municipios de primeira
    })
}

//recebe o nome do Estado e busca os municipios dele via API PÚBLICA (SITE SERVIÇOS DADOS IBGE)
function popularMunicipios(estado){
    console.log(estado);
    selectMunicipios.innerHTML = "";
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
    .then(dados=>dados.json())
    .then(dados=>{
        //console.log(JSON.stringify(dados));
        dados.forEach(municipio=>{
            console.log(municipio);
            const option = document.createElement("option");
            option.value = municipio.nome;
            option.innerHTML = municipio.nome;
            selectMunicipios.appendChild(option);
        });
    })
}

// Evento: quando mudar o estado selecionado, chama a função popularMunicipios passando 
//o nome do estado selecionado

selectEstados.addEventListener("change",function(){
    popularMunicipios(this.value)

});

//chamar a função ao carregar a página
popularEstados();
