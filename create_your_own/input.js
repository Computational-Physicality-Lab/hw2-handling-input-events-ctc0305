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

let prev_touch_time = 0;
for (var i = 0; i < targets.length; i++){
    targets[i].addEventListener('click', function(){
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
                    }             
                }, 250);
                    
            }else{
                just_dragged = false;
            }
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
    })
    targets[i].addEventListener('touchstart', function(event){
        start_time = new Date().getTime();
        isdragging = true;
        dragging_element = drag_element;
        startpart.x = event.touches[0].clientX - drag_element.offsetLeft;
        startpart.y = event.touches[0].clientY - drag_element.offsetTop;
        just_dragged = false;
    })
    targets[i].addEventListener('touchend', function(event){
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
        if(new Date().getTime() - prev_touch_time < 250){
            clicked = false;
            dbclicking = true;
            isdragging = true;
            dragging_element = drag_element;
            startpart.x = event.touches[0].clientX - drag_element.offsetLeft;
            startpart.y = event.touches[0].clientY - drag_element.offsetTop;
            startposition.x = drag_element.offsetLeft;
            startposition.y = drag_element.offsetTop;
        }
        prev_touch_time = new Date().getTime();
    })
    targets[i].addEventListener('touchmove', function(event){
        if(isdragging && dragging_element != null && new Date().getTime() - start_time > 250){
            dragging_element.style.left = (event.touches[0].clientX - startpart.x) + 'px';
            dragging_element.style.top = (event.touches[0].clientY - startpart.y) + 'px';
            just_dragged = true;
        }else if(isdragging && dragging_element != null && dbclicking == true){
            dragging_element.style.left = (event.touches[0].clientX - startpart.x) + 'px';
            dragging_element.style.top = (event.touches[0].clientY - startpart.y) + 'px';
            just_dragged = true;
        }
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
    if(event.key === "Escape" || event.key == "Esc"){
        isdragging = false;
        dragging_element.style.left = startposition.x + 'px';
        dragging_element.style.top = startposition.y + 'px';
        dragging_element = null;
    }
})
const background = document.querySelector('#workspace');
document.getElementById("workspace").addEventListener('click', function(event){
    if (!event.target.classList.contains('target') && just_dragged === false){
        for (var j = 0; j < targets.length; j++){
            targets[j].style.backgroundColor = 'red';
        }
    }
})