var login = document.querySelector('.logins')
		var header = document.querySelector('.navlist')
		var index = 0;
		login.onclick = function(){
			if(index == 0){
            var zhezhao = document.createElement('div')
			zhezhao.innerHTML = `
			<div style = 'width:100px;height:30px; text-align: center;font-size:14px'><a href="/backstage/1/2/3/4/5/6/7/8">后台管理页</a></div>
			<div style = 'width:100px;height:30px; text-align: center;font-size:14px'><a href="/loginOut">退出</a></div>
			`
			zhezhao.className = 'zhezhao'
			header.appendChild(zhezhao)
			index = 1;
			}else if(index == 1){
			var zhezhao = document.querySelector('.zhezhao')
            header.removeChild(zhezhao)
			index = 0;
			}
			
		}