$(document).ready(addMarker);
//網頁loadok後執行

//Ajax json 資料
function addMarker() {
  //open sources
  var JsonURL = "https://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AV&CaseNo2=2&FileType=1&Lang=C&FolderType=";
  var template = $('.card');
  $('.food_list').html("");

  $.ajax(
    {
      url: JsonURL,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        var first = true;
        var map;

        for( var i=0; i<=data.length; i++ ) {

          //將 ajax 的 data 塞入列表中
          AjaxLoad (data);
          function AjaxLoad (data) {
            var food_list = $('.food_list'); //要放 card 的位置
            var food_tem = template.clone(); //複製一個 card 當作 Template

            //將 Ajax 資料塞入 template
            food_tem.find('.Name').text( data[i].Name );
            food_tem.find('.Description').text( data[i].Description );
            food_tem.find('.Add').text( data[i].Add);
            food_tem.find('.Opentime').text( data[i].Opentime );
            food_tem.find('img').attr( "src", data[i].Picture1 ).attr( "alt", data[i].Name );

            //將 更新過的 template 塞入 列表
            food_list.append( food_tem );
          }


          //環圈第一次產生
          if ( first == true ) {
            //中心點位置
            var latlng = new google.maps.LatLng(data[i].Py, data[i].Px);

            // 給google map 的 中心點資訊
            var myMapProp = {
                zoom: 16,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            // 建立地圖
            map = new google.maps.Map($("#map-canvas")[0], myMapProp);
            first = false;
          } //== if結束

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

          function attach (marker,content) {
              var infowindow = new google.maps.InfoWindow({
                               content: content
                      });
              google.maps.event.addListener (marker, 'click', function() {
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
