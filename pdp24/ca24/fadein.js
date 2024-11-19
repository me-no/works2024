$(function() {
	$('body').fadeIn(3000); //1秒かけてフェードイン！
});

const scrollElements = document.querySelectorAll(".js-scroll");//ターゲット指定
 
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
 
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};
 
const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;//ページの上部から要素の距離を取得
 
  return (
    elementTop > (window.innerHeight/20 || document.documentElement.clientHeight/20)//ビューポートの高さを取得
  );
};
 
const displayScrollElement = (element) => {
  element.classList.add("scrolled");//スクロールで表示されたら要素にクラス名を割り当てる
};
 
const hideScrollElement = (element) => {
  element.classList.remove("scrolled");//スクロールで非表示になったら要素からクラス名を除去する
};
 
const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}
 
"scroll load".split(" ").forEach(function(e){
    window.addEventListener("scroll", () => { 
        handleScrollAnimation();
  });  });
