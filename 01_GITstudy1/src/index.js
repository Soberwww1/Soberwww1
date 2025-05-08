// import {myAxios} from './my-axios.js'

// /*导入css文件*/
// import "./css/index.css";
// import './css/index.css';

/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

//首要任务必然是封装一个获取服务器数据并能渲染页面的函数
function render(citycode){
   myAxios({
      url:'https://hmajax.itheima.net/api/weather',
      params:{
         city:citycode
      }
   }).then(result =>{
      // console.log(result);
      const dataObj = result.data
      // console.log(dataObj);
      
      const dataArr = Object.keys(dataObj)
      // console.log(dataArr);

      dataArr.map(item=>{
         if(item === 'dayForecast'){
            const temp = dataObj.dayForecast.map(element =>{
               // return JSON.stringify(element)
               return `<li class="item">
          <div class="date-box">
            <span class="dateFormat">${element.dateFormat}</span>
            <span class="date">${element.date}</span>
          </div>
          <img src="${element.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${element.weather}</span>
          <div class="temp">
            <span class="temNight">${element.temNight}</span>-
            <span class="temDay">${element.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${element.windDirection}</span>
            <span class="windPower">${element.windPower}</span>
          </div>
        </li>`
            }).join('')
            document.querySelector('.week-wrap').innerHTML = temp 
         }
         else if(item === 'todayWeather'){
            for(let i in dataObj[item]){
               // console.log(i);
               document.querySelector(`.today-weather .${i}`).innerHTML = dataObj.todayWeather[i]
            }
         }else if(item === 'weatherImg'){
            document.querySelector('.weather-list .weatherImg').src = dataObj[item]
         }else{
            document.querySelector(`.${item}`).innerText = dataObj[item]
         }
      })
      
   }).catch(error =>{
      console.dir(error);
      
   })
}

//一打开该界面就需要看到天气，所以直接渲染
render('110100')


//现在实现搜索框功能
const searchList = document.querySelector('.search-list')
//当搜索框聚焦上
document.querySelector('.search-city').addEventListener('focus',function(){
   searchList.classList.add('show')
})
//当在输入框输入时显示搜索列表
document.querySelector('.search-city').addEventListener('input',function(event){
   // console.log(event);
   if(event.data.length > 0){
      searchList.classList.add('show')
   }
})

//当搜索框失焦上
document.querySelector('.search-city').addEventListener('blur',function(){
   setTimeout(function(){
      document.querySelector('.show').classList.remove('show')
   },500)
})



//实现搜索词关联对应数据并显示操作
document.querySelector('.search-city').addEventListener('input',function(event){
   // console.log(event.data)
   myAxios({
      url:'https://hmajax.itheima.net/api/weather/city',
      params:{
         city:event.data.trim()
      }
   }).then(result=>{
      // console.log(result);
      const citydata = result.data
      document.querySelector('.search-list').innerHTML =  citydata.map(item=>{
         return `<li class="city-item" data-code=${item.code}>${item.name}</li>`
      }).join('')
      
   }).catch(error=>{
      console.dir(error.message);
      
   })
   
})

//实现点击特定地区，整个页面实现天气变化
document.querySelector('.search-list').addEventListener('click',function(event){
   // console.log(event.target.tagName);
   if(event.target.tagName === 'LI'){
      console.log(event.target.dataset.code);
      render(event.target.dataset.code)  
   }
   
})