
/*
state contains:

none: 預設狀態，沒有特別操作
single_dragging: 單擊的拖曳狀態
double_dragging: 雙擊的拖曳狀態
waiting: 點選按鈕等待
skip: 忽略下一次mouseup
just_clicked: 剛剛mouse down，看有沒有要dragging

*/
var statuses = {
    "state": "none",
    "prev_state": "none",
    "object": null,
    "selected": null,
    "startposx": 0,
    "startposy": 0,
    "startpartx": 0,
    "startparty": 0,
    "prev_time": new Date().getTime() - 300,
    "prev_start_time": new Date().getTime() - 300,
    "touch_number": 0,
    "startwidth": 0,
    "startheight": 0,
    "startfingerwidth": 0,
    "startfingerheight": 0,
    "cancelled": false
};
//滑鼠的程式
var targets = document.querySelectorAll('.target');
for (var i = 0 ; i < targets.length; i++){
    targets[i].addEventListener('click', function(){
        statuses.object = this;
        statuses.selected = this;
        if(statuses.state === "none" && statuses.prev_state === 'none'){
            statuses.state = "waiting";
            setTimeout(function(){
                //點擊按鈕換顏色(避免和雙擊事件打架)
                if(statuses.state === "waiting"){
                    for (var j = 0 ; j < targets.length; j++){
                        targets[j].style.backgroundColor = 'red';
                    }
                    statuses.selected.style.backgroundColor = 'blue';
                    console.log('change color');
                    statuses.state = 'none';
                }
            }, 250);
            statuses.prev_state === 'none'
        }else if (statuses.state === 'skip'){
            statuses.state = 'none';
            statuses.prev_state = 'none';
        }
    })
    targets[i].addEventListener('dblclick', function(event){
        statuses.state = 'double_dragging';
        statuses.selected = this;

        for (var j = 0 ; j < targets.length; j++){
            targets[j].style.backgroundColor = 'red';
        }
        statuses.selected.style.backgroundColor = 'blue';

        statuses.startpartx = event.clientX - statuses.selected.offsetLeft;
        statuses.startparty = event.clientY - statuses.selected.offsetTop;
        statuses.startposx = statuses.selected.offsetLeft;
        statuses.startposy = statuses.selected.offsetTop;
    })
    targets[i].addEventListener('mousedown', function(event){
        statuses.prev_time = new Date().getTime();
        statuses.object = this;
        statuses.startpartx = event.clientX - statuses.object.offsetLeft;
        statuses.startparty = event.clientY - statuses.object.offsetTop;
        statuses.startposx = statuses.object.offsetLeft;
        statuses.startposy = statuses.object.offsetTop;
        if(statuses.state === 'none'){
            statuses.state = 'just_clicked';
        }
        console.log('mouse down');
    })
    targets[i].addEventListener('mouseup', function(event){
        if(statuses.state === 'single_dragging'){
            statuses.selected = null;
            statuses.state = 'none';
            console.log('stop single dragging');
        }else if(statuses.state === 'waiting'){
            statuses.prev_state = 'double_dragging';
            statuses.selected = null;
            statuses.state = 'none';
            console.log('stop waiting');
        }else if(statuses.state === 'just_clicked'){
            statuses.state = 'none';
            statuses.prev_state = 'none';
        }else if(statuses.state === 'double_dragging'){
            statuses.state = 'none';
        }else if(statuses.state === 'skip'){
            statuses.state = 'none';
            statuses.prev_state = 'single_dragging';
        }
    })
}
document.addEventListener('click', function(event){
    if(statuses.state === "none" && statuses.prev_state === 'none'){
        if(!event.target.classList.contains("target")){
            for (var j = 0 ; j < targets.length; j++){
                targets[j].style.backgroundColor = 'red';
            }
            console.log('change back color');
        }
    }else{
        statuses.prev_state = 'none';
    }
})
document.addEventListener('mouseup', function(event){
    if(statuses.state === 'skip'){
        statuses.state = 'none';
        statuses.prev_state = 'single_dragging';
    }
})
document.addEventListener('mousemove', function(event){
    if(statuses.state === "just_clicked" && new Date().getTime() - statuses.prev_time > 250){
        statuses.state = 'single_dragging';
    }
    if(statuses.state === "single_dragging" && new Date().getTime() - statuses.prev_time > 250){
        statuses.object.style.left = (event.clientX - statuses.startpartx) + 'px';
        statuses.object.style.top = (event.clientY - statuses.startparty) + 'px';
        statuses.prev_state = 'single_dragging';
    }else if(statuses.state === "double_dragging" && new Date().getTime() - statuses.prev_time > 250){
        statuses.object.style.left = (event.clientX - statuses.startpartx) + 'px';
        statuses.object.style.top = (event.clientY - statuses.startparty) + 'px';
        statuses.prev_state = 'double_dragging';
    }
})
document.addEventListener('keydown', function(event){
    if((event.key === 'Escape' || event.key == 'Esc') && statuses.object != null){
        if(statuses.state === 'single_dragging'){
            statuses.state = 'skip';
            statuses.prev_state = 'single_dragging';
        }else if(statuses.state === 'double_dragging'){
            statuses.state = 'none';
            statuses.prev_state = 'none';
        }
        statuses.object.style.left = statuses.startposx + 'px';
        statuses.object.style.top = statuses.startposy + 'px';
        statuses.object = null;
    }
})

//觸控的程式
/*for(var i = 0; i < targets.length; i++){
    targets[i].object.style.minWidth = '25px';
    targets[i].object.style.minHegith = '25px'
}*/



for(var i = 0; i < targets.length; i++){
    
    targets[i].addEventListener('single_touch', function(){
        console.log("target single touch" + statuses.state + ' ' +statuses.prev_state + ' ' + statuses.touch_number);
        statuses.object = this;
        var now_this = this;
        console.log(statuses.selected);
        if(statuses.state === "none" && statuses.prev_state === 'none'){
            statuses.state = "waiting";
            setTimeout(function(){
                //點擊按鈕換顏色(避免和雙擊事件打架)
                if(statuses.state === "waiting"){
                    for (var j = 0 ; j < targets.length; j++){
                        targets[j].style.backgroundColor = 'red';
                    }
                    statuses.selected = now_this;
                    statuses.selected.style.backgroundColor = 'blue'; 
                    console.log('change color');
                    statuses.state = 'none';
                }
            }, 250);
            statuses.prev_state === 'none';
        //還原成預設狀態
        }else if (statuses.state === 'skip'){
            statuses.state = 'none';
            statuses.prev_state = 'none';
        }
    }, false)
    
    targets[i].addEventListener('touchstart', function(event){
        //statuses.touch_number += 1;
        console.log("target touchstart " + statuses.state + ' ' +statuses.prev_state + ' ' + statuses.touch_number);
        statuses.prev_start_time = new Date().getTime();
        if(statuses.touch_number === 1){
            //可能是單擊拖曳事件
            if(statuses.state != "double_dragging"){
                statuses.object = this;
                statuses.startpartx = event.touches[0].clientX - statuses.object.offsetLeft;
                statuses.startparty = event.touches[0].clientY - statuses.object.offsetTop;
                statuses.startposx = statuses.object.offsetLeft;
                statuses.startposy = statuses.object.offsetTop;
                if(statuses.state === 'none'){
                    statuses.state = 'just_touched';
                }
                
                //console.log(statuses.state);
            }
        }else if(statuses.touch_number === 2){
            //雙指觸控暫停
            if(statuses.state === "double_dragging" || statuses.state === "single_dragging"){
                statuses.state = 'skip';
                statuses.prev_state = 'none';
                statuses.object.style.left = statuses.startposx + 'px';
                statuses.object.style.top = statuses.startposy + 'px';
                statuses.object = null;
                statuses.cancelled = true;
            }
        }
        statuses.prev_state = 'none';
        //statuses.prev_time = new Date().getTime();
        event.preventDefault();
    }, false)
    targets[i].addEventListener('touchend', function(event){
        //statuses.touch_number = 0;
        console.log("target toucnend" + statuses.state + ' ' +statuses.prev_state + ' ' + statuses.touch_number);
        
        //console.log(statuses.state, statuses.prev_state, 'touchend');
        if(new Date().getTime() - statuses.prev_time < 250 && statuses.object === this){
            statuses.state = 'double_dragging';
            statuses.object = this;
            statuses.selected = this;
            for (var j = 0 ; j < targets.length; j++){
                targets[j].style.backgroundColor = 'red';
            }
            statuses.selected.style.backgroundColor = 'blue';
            statuses.startpartx = event.touches[0].clientX - statuses.object.offsetLeft;
            statuses.startparty = event.touches[0].clientY - statuses.object.offsetTop;
            statuses.startposx = statuses.object.offsetLeft;
            statuses.startposy = statuses.object.offsetTop;
        }else{
            if(statuses.state === 'skip' && statuses.touch_number === 0){
                //暫停後放掉，回歸閒置狀態
                statuses.state = 'none';
                statuses.prev_state = 'none';
            }else if(statuses.state === 'just_touched'){
                //單擊後沒拖曳，以click事件處理
                let touch_click = new Event("single_touch");
                statuses.state = 'none';
                statuses.state = 'none';
                if(new Date().getTime() - statuses.prev_start_time < 250){
                    this.dispatchEvent(touch_click);
                }
                //statuses.object = null;
            }else if(statuses.state === 'single_dragging'){
                //如果為單擊拖曳，則結束後回歸閒置狀態
                statuses.state = 'none';
                statuses.selected = null;
            }else if(statuses.state === 'double_dragging'){
                if(statuses.prev_state === 'none' && statuses.touch_number === 0){
                    statuses.state = 'none';
                }else{
                    statuses.prev_state = 'none';
                }
            }
        }
        //console.log('touch_end')
        //console.log(statuses.state);
        
        event.preventDefault();
    }, false)
    targets[i].addEventListener('touchmove', function(event){
        
        if(statuses.state === 'just_touched' && new Date().getTime() - statuses.prev_time > 250){
            statuses.state = 'single_dragging';
        }
        if(statuses.state === 'single_dragging' && new Date().getTime() - statuses.prev_time > 250){
            statuses.object.style.left = (event.touches[0].clientX - statuses.startpartx) + 'px';
            statuses.object.style.top = (event.touches[0].clientY - statuses.startparty) + 'px';
        }
        //console.log(statuses.state);
        event.preventDefault();
    })
    targets[i].addEventListener('touchcancel', function(event){
        console.log("touch cancel", statuses.state, statuses.prev_state);
        //statuses.touch_number = 0;
    })
}
document.addEventListener('touchcancel', function(event){
    statuses.touch_number = event.touches.length;
    console.log("touch cancel", statuses.state, statuses.prev_state);
    //statuses.touch_number = 0;

}, true)
document.addEventListener('touchmove', function(event){
    
    if(statuses.state === "double_dragging"){
        statuses.object.style.left = (event.touches[0].clientX - statuses.startpartx) + 'px';
        statuses.object.style.top = (event.touches[0].clientY - statuses.startparty) + 'px';
        statuses.prev_state = 'double_dragging';
    }else if(statuses.state === "amplify_x"){
        if(event.touches.length === 2){
            if(statuses.startwidth * Math.abs(event.touches[1].clientX-event.touches[0].clientX) / statuses.startfingerwidth > 30){
                statuses.object.style.width = statuses.startwidth * Math.abs(event.touches[1].clientX-event.touches[0].clientX) / statuses.startfingerwidth + 'px';
                statuses.object.style.left = statuses.startposx - 0.5 * statuses.object.offsetWidth + 'px';
                statuses.prev_state = 'amplify_x';
            }
        }else if(event.touches.length === 1){
            statuses.state = 'skip';
            statuses.state = 'none';
            statuses.object = null;
            statuses.cancelled = true;
        }else if(event.touches.length === 3){
            statuses.object.style.width = statuses.startwidth + 'px';
            statuses.object.style.left = statuses.startposx - 0.5 * statuses.startwidth + 'px';
            statuses.cancelled = true;
        }
    }else if(statuses.state === "amplify_y"){
        if(event.touches.length === 2){
            if(statuses.startwidth * Math.abs(event.touches[1].clientY-event.touches[0].clientY) / statuses.startfingerheight > 30){
                statuses.object.style.height = statuses.startheight * Math.abs(event.touches[1].clientY-event.touches[0].clientY) / statuses.startfingerheight + 'px';
                statuses.object.style.top = statuses.startposy - 0.5 * statuses.object.offsetHeight + 'px';
                statuses.prev_state = 'amplify_y';
            }
        }else if(event.touches.length === 1){
            statuses.state = 'skip';
            statuses.state = 'none';
            statuses.object = null;
            statuses.cancelled = true;
        }else if(event.touches.length === 3){
            statuses.object.style.width = statuses.startwidth + 'px';
            statuses.object.style.left = statuses.startposx - 0.5 * statuses.startwidth + 'px';
            statuses.cancelled = true;
        }
    }
    //console.log(statuses.state);
    event.preventDefault();
})
document.addEventListener('touchstart', function(event){
    statuses.touch_number = event.touches.length;
    if(event.touches.length === 1){
        statuses.cancelled = false;
    }
    if(event.touches.length === 2 && statuses.selected != null && new Date().getTime() - prev_start_time < 250){
        if(Math.abs(event.touches[1].clientX - event.touches[0].clientX) >= Math.abs(event.touches[1].clientY - event.touches[0].clientY)){
            statuses.state = "amplify_x";
            statuses.startposx = statuses.selected.offsetLeft + 0.5 * statuses.selected.offsetWidth;
            statuses.startposy = statuses.selected.offsetTop;
            statuses.startwidth = statuses.selected.offsetWidth;
            statuses.startfingerwidth = Math.abs(event.touches[1].clientX - event.touches[0].clientX);
        }else{
            statuses.state = "amplify_y";
            statuses.startposx = statuses.selected.offsetLeft ;
            statuses.startposy = statuses.selected.offsetTop+ 0.5 * statuses.selected.offsetHeight;
            statuses.startheight = statuses.selected.offsetHeight;
            statuses.startfingerheight = Math.abs(event.touches[1].clientY - event.touches[0].clientY);
        }
    }else if(!event.target.classList.contains("target")){
        //statuses.touch_number += 1;
        console.log("background touchstart" + statuses.state + ' ' +statuses.prev_state + ' ' + statuses.touch_number);
        
        if(statuses.touch_number === 1){
            if(statuses.state === "double_dragging"){
                statuses.prev_state = 'none';
            }
        }else if(statuses.touch_number === 2){
            if(statuses.state === "double_dragging" || statuses.state === 'single_dragging'){
                statuses.state = 'skip';
                statuses.prev_state = 'none';
                statuses.object.style.left = statuses.startposx + 'px';
                statuses.object.style.top = statuses.startposy + 'px';
                statuses.object = null;
            }
        }
            
    }
    prev_start_time = new Date().getTime();
    event.preventDefault();
}, true)
document.addEventListener('touchend', function(event){
    statuses.touch_number = event.touches.length;
    console.log(event.target.classList.contains("target"));
    if(!event.target.classList.contains("target")){
        //statuses.touch_number = 0;
        console.log("background touchend " + statuses.state + ' ' +statuses.prev_state + ' ' + statuses.touch_number);
        if(statuses.state === 'double_dragging' || statuses.state === 'single_dragging'){
            if(statuses.prev_state === 'none'){
                if(statuses.touch_number > 0){
                    console.log("haven't skipped " + statuses.state + ' ' +statuses.prev_state + ' ' + statuses.touch_number);
                    statuses.state = 'skip';
                }else{
                    if(statuses.cancelled === true){
                        console.log("skipped" + statuses.state + ' ' +statuses.prev_state  + ' ' + statuses.touch_number);
                        statuses.state = 'none';
                    }else{
                        statuses.state = 'none';
                        statuses.prev_state = 'none';
                        for (var j = 0 ; j < targets.length; j++){
                            targets[j].style.backgroundColor = 'red';
                        }
                        statuses.object = null;
                        statuses.selected = null;

                    }
                }
            }else if(statuses.prev_state === 'double_dragging'){
                /*statuses.prev_state = 'none';
                if(statuses.touch_number > 0){
                    console.log("haven't skipped " + statuses.state + ' ' +statuses.prev_state  + ' ' + statuses.touch_number);
                    statuses.state = 'skip';
                }else{
                    console.log("skipped" + statuses.state + ' ' +statuses.prev_state + ' ' + statuses.touch_number);
                    statuses.state = 'none';
                }*/
            //console.log('change back color');
            }

        }else if(statuses.state === 'skip'){
            if(statuses.touch_number === 0){
                statuses.state = 'none';
            }
        }
        else if(statuses.state === 'none' && statuses.prev_state === 'none'){
            console.log("reset background color " + statuses.state + ' ' +statuses.prev_state);
            for (var j = 0 ; j < targets.length; j++){
                targets[j].style.backgroundColor = 'red';
            }
            statuses.object = null;
            statuses.selected = null;
        }
    }
    statuses.prev_time = new Date().getTime();
    event.preventDefault();
}, true)