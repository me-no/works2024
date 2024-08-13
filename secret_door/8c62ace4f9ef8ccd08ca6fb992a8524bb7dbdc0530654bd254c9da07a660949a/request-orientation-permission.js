const requestDeviceOrientationPermission = () => {
  if (
    DeviceOrientationEvent &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    // iOS 13+ の Safari
    // 許可を取得
    DeviceOrientationEvent.requestPermission()
    .then(permissionState => {
      if (permissionState === 'granted') {
        // 許可を得られた場合、deviceorientationをイベントリスナーに追加
        window.addEventListener('deviceorientation', e => {
          // deviceorientationのイベント処理
        })
      } else {
        // 許可を得られなかった場合の処理
      }
    })
    .catch(console.error) // https通信でない場合などで許可を取得できなかった場合
  } else {
    // 上記以外のブラウザ
  }
}

// ボタンクリックでrequestDeviceOrientationPermission実行
const startButton = document.getElementById("canvas")
if(startButton){
    startButton.addEventListener('click', requestDeviceOrientationPermission, false)
}
