# Hw2- input handlement

此項作業的測試是在chrome網頁上測試，運用Netify Deploy網站，以下為網址(從作業一Deploy):

- https://imaginative-florentine-b8c9a8.netlify.app

此為作業一的網址連結，當點擊上方Menu的Create your own按鈕，可以連結到作業二的input Handlement，為了減少記憶體空間，已刪除example.mp4檔案。其中，當點擊連結時，載入可能需要一段時間(一開始網頁功能可能會不正常，約載入十秒後會功能恢復正常)。以下開始說明作業二完成的部分:

- 滑鼠點擊事件: 全部符合作業的基本要求

  - 點擊: 按下方塊後250 ms之內放開，且放開後250 ms內沒有再點擊觸發。點擊方塊選取該方塊，該方塊改成藍色，其他變為紅色。點擊背景全部方塊變成紅色。
  - 拖曳: 按下方塊後250 ms之內沒放開觸發，拖曳時物件跟著滑鼠游標，且不改變任何物件顏色。只要放開滑鼠即結束拖曳行動。
  - 雙擊: 按下方塊後250 ms之內放開，且250 ms內又再點擊一次觸發。雙擊會選取該方塊並取消選取其他方塊，物件跟著滑鼠游標，需要再點擊一次以取消雙擊拖曳行為。
  - Esc鍵: 按下Esc鍵時，被拖曳的物件會回到拖曳前的位置，若當下沒有拖曳狀態，則什麼事都不會發生。
  
- 螢幕觸擊事件: 全部符合作業的基本要求，且有實作垂直移動的加分題

  - 點擊和拖曳: 邏輯和滑鼠點擊及拖曳相同。
  - 雙擊: 觸發條件與滑鼠雙擊相同，雙擊後選取該物件，物件進入跟隨模式，會跟著手指位置移動(即使中間手指有離開螢幕也一樣。)，取消跟隨模式必須要在點擊一次。
  - 另一隻手指觸擊螢幕: 若在跟隨模式或是拖曳模式，如果另一隻手指再觸及螢幕則會觸發Esc的效果。
  - 雙手指觸控: 若當下有選取物件，且兩根手指touchstart的時間差小於250 ms，則會觸發改變物件大小的事件，其中：
  
    - 改變寬度: 兩隻手指水平距離 >= 垂直距離
    - 改變高度: 兩隻手指水平距離 < 垂直距離
  
  - 當改變物件大小時，物件會依據兩手指的水平或垂直距離等比例放大或縮小，物件大小寬度和高度最小都是 30 px，弱小於這個數字物件長或寬會戰時鎖在30 px，直到再次放大。其中一個手指離開螢幕時，會儲存目前改變的大小，此時若離開的手指再度觸及螢幕，則能再度改變物件大小。
  - 停止改變物件大小的模式方法有兩個:
  
    - 在兩隻手指都沒觸擊螢幕的狀態下單擊物件或背景
    - 雙手指觸控時第三隻手指觸擊螢幕(物件會還原到原來大小)。
    
困難和有趣之處: 手機觸控模式最困難的就是多重觸發和debug。多重觸發是指點擊物件時，會同時觸發背景的點擊事件，在其他事件中也有發生過這樣collision的問題，這很容易導致程式運行的邏輯錯誤。此外，手機的觸控debug也較為麻煩，當程式卡住無法運行時，若沒運用適合的app來檢視網頁很難找到bug的地方。有趣之處則在可以對物件做各種變化，使人和介面可以有所互動。
