
		var btn = document.querySelector('.fabiao')
		var text = document.querySelector('.text1')
		var commentDiv = document.querySelector('.commentDiv')
		var arr = [];
		'<%if (userInfo){%>'
	    btn.onclick = function(){
			// location.href = "/comment/"+'<%-bookid%>/'+'<%-userInfo[0].username%>/'+text.value;
			var text1= text.value
			var xhr = new XMLHttpRequest();
			xhr.open('get',"/comment/"+'<%-bookid%>/'+'<%-userInfo[0].username%>/'+text.value)
			xhr.send()
			xhr.onload = function(){
			 console.log(JSON.parse(xhr.responseText))
			 arr = JSON.parse(xhr.responseText);
			 console.log(arr)
			var comment = document.createElement('div')
			var br = document.createElement('br')
			comment.innerHTML=`<span class="com1">`+arr[arr.length-1].com1+`</span>
			<h6 style="color: black;text-indent: 10px;font-size: 14px;">（读者用户）<%-userInfo[0].username%>：</h6>
					<h6 style="color: black;text-indent: 115px;font-size: 14px;">`+arr[arr.length-1].content+`</h6>
					<button class="del">删除</button>`
					commentDiv.appendChild(comment)
					alert('发表成功')
			let del = document.querySelectorAll('.del')
		    del.forEach(function(item,i){
            item.onclick = function(){
			// console.log(item.parentNode.children[0].innerText.substring(6,item.parentNode.children[0].innerText.length-1))
			// location.href = '/del/'+'<%-bookid%>/'+item.parentNode.children[0].innerText.substring(6,item.parentNode.children[0].innerText.length-1)+'/'+item.parentNode.children[1].innerText
			//创建ajax对象
			commentDiv.removeChild(item.parentNode)
			var xhr = new XMLHttpRequest();
			xhr.open('GET','/del/'+item.parentNode.children[0].innerText)
			xhr.send();
			xhr.onload = function() {
				alert(xhr.responseText)
			}
		
		}
		})
			}
			
		
			text.value = ''
		}
		'<%}else{%>'
		text.placeholder= '未登录，无法评论'
		text.disabled='true'
		'<%}%>'
		let del = document.querySelectorAll('.del')
		del.forEach(function(item,i){
        item.onclick = function(){
			// console.log(item.parentNode.children[0].innerText.substring(6,item.parentNode.children[0].innerText.length-1))
			// location.href = '/del/'+'<%-bookid%>/'+item.parentNode.children[0].innerText.substring(6,item.parentNode.children[0].innerText.length-1)+'/'+item.parentNode.children[1].innerText
			//创建ajax对象
			commentDiv.removeChild(item.parentNode)
			var xhr = new XMLHttpRequest();
			xhr.open('GET','/del/'+item.parentNode.children[0].innerText)
			xhr.send();
			xhr.onload = function() {
				alert(xhr.responseText)
			}
		
		}
		})