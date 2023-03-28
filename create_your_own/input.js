/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
var targets = document.querySelectorAll(".target");
let isdragging = false;
let just_dragged = false;
let dragging_element = null;
let startpart = {x: 0, y: 0};
let startposition = {x: 0, y: 0};
let start_time = 0;
let dbclicking = false;
let dbclicked = false;
let clicked = false;
let skip_next_release = false;
let just_finger_moved = false;
let prev_touch_time = new Date().getTime();
for (var i = 0; i < targets.length; i++){
    targets[i].addEventListener('click', function(){
        if(skip_next_release === false){
            clicked_item = this;
            if (clicked == false){
                if(just_dragged === false){
                    clicked = true;
                    setTimeout(function(){
                        if (clicked === true){
                            for (var j = 0; j < targets.length; j++){
                                targets[j].style.backgroundColor = 'red';
                            }
                            clicked_item.style.backgroundColor = 'blue';
                            clicked = false;
                            console.log("button_clicked");
                        }             
                    }, 250);
                        
                }else{
                    just_dragged = false;
                }
            }
        }else{
            skip_next_release = false;
        }
        
    })
    const drag_element = targets[i];
    targets[i].addEventListener('mousedown', function(event){
        start_time = new Date().getTime();
        isdragging = true;
        dragging_element = drag_element;
        startpart.x = event.clientX - drag_element.offsetLeft;
        startpart.y = event.clientY - drag_element.offsetTop;
        startposition.x = drag_element.offsetLeft;
        startposition.y = drag_element.offsetTop;
        just_dragged = false;
    })
    targets[i].addEventListener('mouseup', function(){
        if(skip_next_release === false){
            if(dbclicking == false){
                isdragging = false;
                dragging_element = null;
                dbclicked = false;
            }else{
                dbclicking = false;
                dbclicked = true;
                isdragging = false;
                just_dragged = true;
            }
        }else{
            skip_next_release = false;
        }
    })
    targets[i].addEventListener('dblclick', function(event){
        clicked = false;
        dbclicking = true;
        isdragging = true;
        dragging_element = drag_element;
        startpart.x = event.clientX - drag_element.offsetLeft;
        startpart.y = event.clientY - drag_element.offsetTop;
        startposition.x = drag_element.offsetLeft;
        startposition.y = drag_element.offsetTop;
        just_dragged = false;
        console.log("button_double_clicked");
    })
    targets[i].addEventListener('touchstart', function(event){
        start_time = new Date().getTime();
        isdragging = true;
        if(dbclicking == false){
            dragging_element = drag_element;
        }
        
        startpart.x = event.touches[0].clientX - drag_element.offsetLeft;
        startpart.y = event.touches[0].clientY - drag_element.offsetTop;
        startposition.x = drag_element.offsetLeft;
        startposition.y = drag_element.offsetTop;
        just_dragged = false;
        event.preventDefault();
    })
    targets[i].addEventListener('touchend', function(event){
        if(skip_next_release === true){
            skip_next_release = false;
            console.log("skip_next_release");
        }else{
            if(just_finger_moved === false){
                if(dbclicking == false){
                    isdragging = false;
                    dragging_element = null;
                    dbclicked = false;
                    just_dragged = false;
                }else{//double click 結束
                    if(just_finger_moved === false){
                        dbclicking = false;
                        dbclicked = true;
                        isdragging = false;
                        just_dragged = true;
                    }
                }
                //double click event
                if(new Date().getTime() - prev_touch_time < 250){
                    clicked = false;
                    dbclicking = true;
                    isdragging = true;
                    dragging_element = drag_element;
                    startpart.x = event.changedTouches[0].clientX - drag_element.offsetLeft;
                    startpart.y = event.changedTouches[0].clientY - drag_element.offsetTop;
                    let doubleclickEvent = new Event("dblclick");
                    this.dispatchEvent(doubleclickEvent);
                }else{
                    let clickEvent = new Event("click");
                    this.dispatchEvent(clickEvent);
                }
            }
            event.preventDefault();
        }
        prev_touch_time = new Date().getTime();
        just_finger_moved = false;
        
    })
    targets[i].addEventListener('touchmove', function(event){
        if(isdragging && dragging_element != null && new Date().getTime() - start_time > 250){
            dragging_element.style.left = (event.touches[0].clientX - startpart.x) + 'px';
            dragging_element.style.top = (event.touches[0].clientY - startpart.y) + 'px';
            just_dragged = true;
            console.log("touchmove1");
        }else if(isdragging && dragging_element != null && dbclicking == true){
            dragging_element.style.left = (event.touches[0].clientX - startpart.x) + 'px';
            dragging_element.style.top = (event.touches[0].clientY - startpart.y) + 'px';
            just_dragged = true;
            console.log("touchmove2");
        }
        just_finger_moved = true;
    })
}
document.addEventListener('mousemove', function(event){
    if(isdragging && dragging_element != null && new Date().getTime() - start_time > 250){
        dragging_element.style.left = (event.clientX - startpart.x) + 'px';
        dragging_element.style.top = (event.clientY - startpart.y) + 'px';
        just_dragged = true;
    }else if(isdragging && dragging_element != null && dbclicking == true){
        dragging_element.style.left = (event.clientX - startpart.x) + 'px';
        dragging_element.style.top = (event.clientY - startpart.y) + 'px';
        just_dragged = true;
    }
})
document.addEventListener('keydown', function(event){
    if((event.key === "Escape" || event.key == "Esc") && dragging_element != null){
        isdragging = false;
        dragging_element.style.left = startposition.x + 'px';
        dragging_element.style.top = startposition.y + 'px';
        dragging_element = null;
        just_dragged = false;
        skip_next_release = true;
    }
    
})
const background = document.querySelector('#workspace');
document.getElementById("workspace").addEventListener('click', function(event){
    if(skip_next_release === false){
        if (!event.target.classList.contains('target') && just_dragged === false){
            for (var j = 0; j < targets.length; j++){
                targets[j].style.backgroundColor = 'red';
            }
        }
    }else{
        skip_next_release = false;
    }
});
document.getElementById("workspace").addEventListener('touchmove', function(event){
    if(dbclicking === true){
        console.log(dragging_element);
        dragging_element.style.left = (event.touches[0].clientX - startpart.x) + 'px';
        dragging_element.style.top = (event.touches[0].clientY - startpart.y) + 'px';
        console.log("touchmove3");
        just_finger_moved = true;
    }
    
})