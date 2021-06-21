var getSearch = document.querySelector('.pic')
getSearch.onclick = function(){
      
      var black = document.createElement('div')
      black.className = "tankuang1"
      black.innerHTML=`
      <div class='tankuang'>
 <img src="/images/close.svg" class="close">
 <div class="search">
    <input type="text" class="text">
    <button class="button">查询</button>
 </div>
 
</div>
      `
      var body = document.querySelector("body")
      body.appendChild(black)
      var guanbi = document.querySelector('.close')
      guanbi.onclick = function(){
        var body = document.querySelector("body")
        body.removeChild(black)
      }
      var search = document.querySelector('.button')
      search.onclick = function(){
          var text = document.querySelector('.text').value;
          location.href = "http://localhost:3000/seach/"+text+"/page/1"
      }

      let tank = document.querySelector('.tankuang');
		let localstorage = window.localStorage
		if(localstorage.getItem('flag')){
			var flag = localstorage.getItem('flag');
			console.log(flag);
			if(flag==0){
				tank.style.backgroundImage = 'url(/images/909.gif)'
			}
			if(flag==1){
            tank.style.backgroundImage = 'url(/images/wenliku.com-679-plaid.jpg)'
		}
		if(flag == 2){
			tank.style.backgroundImage = 'url(/images/2.png)'
		}
		if(flag == 3){
			tank.style.backgroundImage = 'url(/images/3.gif)'
		}
		}else{
			var flag = 0;
      tank.style.backgroundImage = 'url(/images/909.gif)'
		}
		// let btn = document.querySelector('.btn');
        // btn.onclick = function(){
		// flag++;
		// if(flag==1){
        //     tank.style.backgroundImage = 'url(/images/wenliku.com-679-plaid.jpg)'
		// }
		// if(flag == 2){
		// 	tank.style.backgroundImage = 'url(/images/2.png)'
		// }
		// if(flag == 3){
		// 	body.style.backgroundImage = 'url(/images/3.gif)'
		// }
        // if(flag == 4){
		// 	flag=0
		// 	body.style.backgroundImage = 'url(/images/909.gif)'
		// }
		// if(localstorage){
		// 	localstorage.removeItem('flag')
		// }
		// localstorage.setItem('flag',flag)
        // }
      }