$(document).ready(addMarker);
//網頁loadok後執行

//Ajax json 資料
function addMarker() {
  //open sources
  var JsonURL = "http://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AV&CaseNo2=2&FileType=1&Lang=C&FolderType=";

  $.ajax(
    {
      url: JsonURL,
      type: 'GET',
      dataType: 'jsonp',
      success: function (data) {
        var first = true;
        var map;

        for( var i=0; i<=data.length; i++ ) {
          //環圈第一次產生
          if ( first == true ) {
            //中心點位置
            var latlng = new google.maps.LatLng(data[i].Py, data[i].Px);

            // 給google map 的 中心點資訊
            var myOptions = {
                zoom: 16,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            // 建立地圖
            map = new google.maps.Map($("#map-canvas")[0], myOptions);
            first = false;
          }

          var myLatlng = new google.maps.LatLng(data[i].Py, data[i].Px);
          var info = data[i].Name;

          //加一個Marker到map中
          var markers = [];
          var infoWindows = [];
          var marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
          });
          var content = '<div class=infowin><p>'+info+'</p></div>';
          attach(marker,content);

          function attach(marker,content){
              var infowindow = new google.maps.InfoWindow({
                               content: content
                      });
              google.maps.event.addListener(marker, 'click', function() {
                      infowindow.open(marker.get('map'), marker);
                      });
              }


        }//for結束
      },
      error: function () {
        //some thing error
      }
    }
  );//ajax
}
