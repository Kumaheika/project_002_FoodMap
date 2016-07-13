// 非同步載入（Asynchronously Loading）API
var myCenter = { lat: 22.6396626, lng: 120.3005136}; //定位點：高雄捷運站
function initialize() {
  //決定你 Google 地圖的中心點位置和縮放大小
  var mapOptions = {
    center: myCenter, //火車站位置
    zoom: 16,
    //map 的樣式
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  // Google 的地圖是以 Map 這個類別來代表的，一個 Map 物件代表一個地圖，要多個就 map1、map2....
  var map = new google.maps.Map( document.getElementById('map-canvas'), mapOptions );

  //建立map上的 marker
  var marker = new google.maps.Marker({
    position: myCenter, //火車站位置
    animation:google.maps.Animation.BOUNCE, //讓 marker 有動畫
    icon:'pinkball.png' //改變 marker 的樣式(圖為相對路徑)
  });
  //maker 放到 map 上
  marker.setMap(map);

  // 建立 marker 對話視窗
  var infowindow = new google.maps.InfoWindow({
    content:"我是高雄火車站"
  });
  infowindow.open(map, marker);
}
// 當網頁 load完成，才執行 initialize 載入地圖
google.maps.event.addDomListener(window, 'load', initialize);
