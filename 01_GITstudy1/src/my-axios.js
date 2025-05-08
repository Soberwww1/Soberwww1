const myAxios = (config)=>{
  return new Promise((resolve,reject)=>{
   const xhr = new XMLHttpRequest()
   if(config.params){
      const paramsObj = new URLSearchParams(config.params)
      config.url += `?${paramsObj.toString()}`
   }
   xhr.open(config.method || 'GET',config.url)
   xhr.addEventListener('loadend',()=>{
      if(xhr.status >= 200 && xhr.status <= 300){
         resolve(JSON.parse(xhr.response))
      }
      else{
         reject(new Error(xhr.response))
      }
   })
   //
   if(config.data){
      xhr.setRequestHeader('Content-Type','application/json')
      const user = JSON.stringify(config.data)
      xhr.send(user)
      return
   }
   xhr.send()//发起请求
  })
}