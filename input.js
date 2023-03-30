
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
    "startposx": 0,
    "startposy": 0,
    "startpartx": 0,
    "startparty": 0,
    "prev_time": new Date().getTime() - 300,
    "touch_number": 0
};
//滑鼠的程式
var targets = document.querySelectorAll('.target');
for (var i = 0 ; i < targets.length; i++){
    targets[i].addEventListener('click', function(){
        statuses.object = this;
        if(statuses.state === "none" && statuses.prev_state === 'none'){
            statuses.state = "waiting";
            setTimeout(function(){
                //點擊按鈕換顏色(避免和雙擊事件打架)
                if(statuses.state === "waiting"){
                    for (var j = 0 ; j < targets.length; j++){
                        targets[j].style.backgroundColor = 'red';
                    }
                    statuses.object.style.backgroundColor = 'blue';
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
        statuses.startpartx = event.clientX - statuses.object.offsetLeft;
        statuses.startparty = event.clientY - statuses.object.offsetTop;
        statuses.startposx = statuses.object.offsetLeft;
        statuses.startposy = statuses.object.offsetTop;
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
            statuses.object = null;
            statuses.state = 'none';
            console.log('stop single dragging');
        }else if(statuses.state === 'waiting'){
            statuses.prev_state = 'double_dragging';
            statuses.object = null;
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

for(var i = 0; i < targets.length; i++){
    console.log("target single touch" + statuses.state + ' ' +statuses.prev_state);
    targets[i].addEventListener('single_touch', function(){
        statuses.object = this;
        console.log(statuses.object)
        if(statuses.state === "none" && statuses.prev_state === 'none'){
            statuses.state = "waiting";
            setTimeout(function(){
                //點擊按鈕換顏色(避免和雙擊事件打架)
                if(statuses.state === "waiting"){
                    for (var j = 0 ; j < targets.length; j++){
                        targets[j].style.backgroundColor = 'red';
                    }
                    statuses.object.style.backgroundColor = 'blue';
                    console.log('change color');
                    statuses.state = 'none';
                }
            }, 250);
            statuses.prev_state === 'none'
        //還原成預設狀態
        }else if (statuses.state === 'skip'){
            statuses.state = 'none';
            statuses.prev_state = 'none';
        }
    })
    targets[i].addEventListener('touchstart', function(event){
        console.log("target touchstart " + statuses.state + ' ' +statuses.prev_state);
        statuses.touch_number += 1;
        if(statuses.touch_number === 1){
            if(statuses.state != "double_dragging"){
                statuses.object = this;
                statuses.startpartx = event.touches[0].clientX - statuses.object.offsetLeft;
                statuses.startparty = event.touches[0].clientY - statuses.object.offsetTop;
                statuses.startposx = statuses.object.offsetLeft;
                statuses.startposy = statuses.object.offsetTop;
                statuses.state = 'just_touched';
                //console.log(statuses.state);
            }
        }else if(statuses.touch_number === 2){
            //雙指觸控暫停
            if(statuses.state === "double_dragging"){
                statuses.state = 'skip';
                statuses.prev_state = 'none';
                statuses.object.style.left = statuses.startposx + 'px';
                statuses.object.style.top = statuses.startposy + 'px';
                statuses.object = null;
            }
        }
        statuses.prev_state = 'none';
        //statuses.prev_time = new Date().getTime();
        event.preventDefault();
    })
    targets[i].addEventListener('touchend', function(event){
        console.log("target toucnend" + statuses.state + ' ' +statuses.prev_state);
        statuses.touch_number -= 1;
        console.log(statuses.state, statuses.prev_state, 'touchend');
        if(new Date().getTime() - statuses.prev_time < 250 && statuses.object === this){
            statuses.state = 'double_dragging';
        }else{
            if(statuses.state === 'skip' && statuses.touch_number === 0){
                //暫停後放掉，回歸閒置狀態
                statuses.state = 'none';
                statuses.prev_state = 'none';
            }else if(statuses.state === 'just_touched'){
                let touch_click = new Event("single_touch");
                statuses.state = 'none';
                this.dispatchEvent(touch_click);
                
                //statuses.object = null;
            }else if(statuses.state === 'single_dragging'){
                statuses.state = 'none';
                statuses.object = null;
            }else if(statuses.state === 'double_dragging'){
                if(statuses.prev_state === 'none' && statuses.touch_number === 0){
                    statuses.state = 'none';
                }
            }
        }
        console.log('touch_end')
        console.log(statuses.state);
        statuses.prev_time = new Date().getTime();
        event.preventDefault();
    })
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
}
document.addEventListener('touchmove', function(event){
    if(statuses.state === "double_dragging"){
        statuses.object.style.left = (event.touches[0].clientX - statuses.startpartx) + 'px';
        statuses.object.style.top = (event.touches[0].clientY - statuses.startparty) + 'px';
        statuses.prev_state = 'double_dragging';
    }
    //console.log(statuses.state);
    event.preventDefault();
})
document.addEventListener('touchstart', function(event){
    if(!event.target.classList.contains("target")){
        console.log("background touchstart" + statuses.state + ' ' +statuses.prev_state);
        statuses.touch_number += 1;
        if(statuses.touch_number === 1){
            if(statuses.state === "double_dragging"){
                statuses.prev_state = 'none';
            }
        }else if(statuses.touch_number === 2){
            if(statuses.state === "double_dragging"){
                statuses.state = 'none';
                statuses.prev_state = 'none';
                statuses.object.style.left = statuses.startposx + 'px';
                statuses.object.style.top = statuses.startposy + 'px';
                statuses.object = null;
            }
        }
            
    }
    event.preventDefault();
})
document.addEventListener('touchend', function(event){
    if(!event.target.classList.contains("target")){
        statuses.touch_number -= 1;
        console.log("background touchend " + statuses.state + ' ' +statuses.prev_state);
        if(statuses.state === 'double_dragging'){
            if(statuses.prev_state === 'none'){
                if(statuses.touch_number > 0){
                    console.log("haven't skipped " + statuses.state + ' ' +statuses.prev_state);
                    statuses.state = 'skip';
                }else{
                    console.log("skipped" + statuses.state + ' ' +statuses.prev_state);
                    statuses.state = 'none';
                }
            }
            //console.log('change back color');

        }else if(statuses.state === 'none' && statuses.prev_state === 'none'){
            console.log("reset background color " + statuses.state + ' ' +statuses.prev_state);
                for (var j = 0 ; j < targets.length; j++){
                    targets[j].style.backgroundColor = 'red';
                }
        } 
    }
    event.preventDefault();
})