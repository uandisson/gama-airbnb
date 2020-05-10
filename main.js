var domReady = function(ready){
    if (document.readyState != 'loading') return ready();
    document.addEventListener('DOMContentLoaded', ready);
    function _ready() {
        document.removeEventListener('DOMContentLoaded', ready);
        ready();
    }
}

domReady(function() {
    
    try{
        var loader = new XMLHttpRequest();
    }catch (err){
        var loader = new ActiveXObject('Microsoft.XMLHTTP');
    }

    var quartosStr = '';
    var api = [];

    loader.onreadystatechange = function (){

        if (this.status == 200 && this.readyState == 4){
            api = JSON.parse(this.responseText);
            localStorage.setItem('api', JSON.stringify(api));
            
            api.forEach(function(api){
                quartosStr += `<div class="quartos-page"> 
                    <div class="photo-quartos"> 
                        <img src="${api.photo}">
                    </div>
                    <div class="home-description">
                        <div class="tipo">${api.property_type}</div>
                        <div class="descript-quartos">${api.name}</div>
                        <div class="valor-quartos">
                            <span class="valor-diaria">Diária de: R$ ${api.price}</span>
                        </div>
                    </div>
                </div> `;
            });
            
            document.getElementById('container').innerHTML = quartosStr;            
        }
    }
    loader.open('GET', 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72', true);
    loader.send();
});
