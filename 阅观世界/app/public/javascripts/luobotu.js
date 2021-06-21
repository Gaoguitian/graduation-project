var shangdiv = document.querySelectorAll('.imgitem')   
		  var prebtn = document.querySelector('.btn')
		  var nextbtn = document.querySelector('.btn1')
		  var circleDivv = document.querySelectorAll('.circle .circleDiv')

		  console.log(circleDivv)
		  var currentimg = 0;
		  function lunbofenzhuang(){
				shangdiv.forEach(function(item,i){
			  item.classList.remove('active')
		   }
		   )
		   circleDivv.forEach(function(item1,i){
			  item1.classList.remove('active')
		   }
		   )
		   shangdiv[currentimg].classList.add('active')
		   circleDivv[currentimg].classList.add('active')
			  }
		  nextbtn.onclick = function () {
			  currentimg = currentimg + 1;
			  if(currentimg >= shangdiv.length){
				  currentimg = 0;
			  }
             lunbofenzhuang()

		  }
		  prebtn.onclick = function () {
			  currentimg = currentimg -1;
			  if(currentimg < 0){
				  currentimg = shangdiv.length - 1;
			  }
              lunbofenzhuang()
		  }
		  circleDivv.forEach(function(item,i){
			  item.onclick=function(){
				  console.log(item)
				  var index = parseInt(item.id[1])
				  currentimg = index;
				  lunbofenzhuang()
			  }
		  })
		  var tie = setInterval(function(){
			  currentimg++;
			  if(currentimg >= shangdiv.length){
				  currentimg = 0;
			  }
			  lunbofenzhuang();
		  },2000)
		  var lunb = document.querySelector('.lunbotupic')
		  lunb.onmouseover = function(){
			  clearInterval(tie)
			  prebtn.classList.add('shang')
			  nextbtn.classList.add('xia')
		  }
		  lunb.onmouseout = function(){
			prebtn.classList.remove('shang')
			nextbtn.classList.remove('xia')
			 tie = setInterval(function(){
			  currentimg++;
			  if(currentimg >= shangdiv.length){
				  currentimg = 0;
			  }
			  lunbofenzhuang();
		  },2000)
		  }