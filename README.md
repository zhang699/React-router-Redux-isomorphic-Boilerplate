# React server side rendering with Redux and react-router

#注意事項：
在ismo 裡面因為server render時會把component方法全部跑一次，所以一些request模組是判斷document來決定要用nodejs http 模組或是用瀏覽器ajax來進行request，而當server render 時因為是採用app.get('*')，所以會造成在get內又發送出request的情況造成hang up 或 connect ECONNREFUSED

建議在component如用到第三方模組進行request的情況使用
```
if(typeof document === 'object'){
  post('http://localhost:3001/getArticle','hi')
   .then(function(data){
     console.log(data)

   })
 }
```
來判斷，避免在node端重複使用http模組發出request 造成error
