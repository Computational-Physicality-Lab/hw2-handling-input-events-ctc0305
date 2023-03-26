// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages
let initProducts = () => {
    // To see the shirts object, run:
    console.log(shirts);
    const container = document.getElementById("items-list");
    document.getElementById("quick-view").style.visibility = "hidden";
    shirts.forEach(function(item){
        const itemdiv = document.createElement("div");
        itemdiv.setAttribute("class", "item");

        const picturelink = document.createElement("a");
        picturelink.setAttribute("href", "details.html?img=" + item.name);
        

        const itempicture = document.createElement("img");
        const all_colors = Object.keys(item.colors);
        const all_sides = Object.keys(item.colors[all_colors[0]])
        itempicture.setAttribute("src", item["colors"][all_colors[0]][all_sides[0]])
        itempicture.setAttribute("onerror", "this.onerror=null;this.src='shirt_images/not-found.png';")
        itempicture.setAttribute("class", "tshirt");

        picturelink.appendChild(itempicture);

        const itemname = document.createElement("h3");
        itemname.textContent = item.name;

        const discription = document.createElement("p");
        string_available = "Available in " + Object.keys(item.colors).length + " color";
        if(Object.keys(item.colors).length != 1 && Object.keys(item.colors).length != 0){
            string_available += 's';
        }
        discription.textContent = string_available;

        const selectbuttons = document.createElement("div");
        selectbuttons.setAttribute("class", "select-buttons");

        const button1 = document.createElement("button");
        const button2 = document.createElement("button");
        const button2link = document.createElement("a");

        button1.setAttribute("class", "button");
        button1.textContent = "Quick View";
        button1.onclick = function(){
            document.getElementById("quick-view").style.visibility = "visible";
            document.getElementById("quick-view").style.padding = "5%";
            document.getElementById("quick-view").style.marginTop = "5%";
            document.getElementById("quick-view").style.marginBottom = "5%";

            document.getElementById("front").setAttribute("src", item["colors"][all_colors[0]][all_sides[0]])
            document.getElementById("back").setAttribute("src", item["colors"][all_colors[0]][all_sides[1]])
            document.getElementById("front").setAttribute("onerror", "this.onerror=null;this.src='shirt_images/not-found.png';");
            document.getElementById("back").setAttribute("onerror", "this.onerror=null;this.src='shirt_images/not-found.png';") ;
            document.getElementById("quick-title").textContent = item.name;
            document.getElementById("quick-price").textContent = item.price;
            document.getElementById("quick-description").textContent = item.description;
            window.scrollTo({top: document.body.scrollHeight,behavior: 'smooth'});
        }
        button2.textContent = "See Page";
        button2.setAttribute("class", "button");
        button2link.setAttribute("href", "details.html?img=" + item.name);
        button2link.appendChild(button2);
        selectbuttons.appendChild(button1);
        selectbuttons.appendChild(button2link);

        itemdiv.appendChild(picturelink);
        itemdiv.appendChild(itemname);
        itemdiv.appendChild(discription);
        itemdiv.appendChild(selectbuttons);
        container.appendChild(itemdiv);

    })
    document.getElementById("quick-button").onclick = function(){
        document.getElementById("quick-view").style.visibility = "hidden";
        document.getElementById("front").removeAttribute("src");
        document.getElementById("front").removeAttribute("onerror");
        document.getElementById("back").removeAttribute("src")
        document.getElementById("back").removeAttribute("onerror")
        document.getElementById("quick-title").textContent = '';
        document.getElementById("quick-price").textContent = '';
        document.getElementById("quick-description").textContent = '';
        document.getElementById("quick-view").style.padding = "0%";
        document.getElementById("quick-view").style.marginTop = "0%";
        document.getElementById("quick-view").style.marginBottom = "0%";
    }
    // Your Code Here
};

var current_side = 'front';
var current_color = 'white';


let initDetails = () => {
    // To see the shirts object, run:
    console.log(shirts);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const image = urlParams.get('img');

    

    shirts.forEach(function(item){
        if(image == item.name){
            document.getElementById("detail-item-name").innerHTML = item.name;
            const all_colors = Object.keys(item.colors);
            const all_sides = Object.keys(item.colors[all_colors[0]]);
            document.getElementById("detail-image").src = item["colors"][all_colors[0]][all_sides[0]];
            document.getElementById("detail-image").setAttribute("onerror", "this.onerror=null;this.src='shirt_images/not-found.png';");
            current_color = all_colors[0];
            current_side = all_sides[0];
            document.getElementById("price").innerHTML = item.price;
            document.getElementById("introduction").innerHTML = item.description; 
            const button1 = document.createElement("button")
            const button2 = document.createElement("button")
            button1.setAttribute("class", "button-side");
            button1.textContent = "front";
            button1.onclick = function(){
                document.getElementById("detail-image").src = item["colors"][current_color]["front"];
                document.getElementById("detail-image").setAttribute("onerror", "this.onerror=null;this.src='shirt_images/not-found.png';");
                current_side = "front";
            }
            button2.setAttribute("class", "button-side");
            button2.textContent = "back";
            button2.onclick = function(){
                document.getElementById("detail-image").src = item["colors"][current_color]["back"];
                document.getElementById("detail-image").setAttribute("onerror", "this.onerror=null;this.src='shirt_images/not-found.png';");
                current_side = "back";
            }
            document.getElementById("side").appendChild(button1);
            document.getElementById("side").appendChild(button2);
            
            for (let color in item.colors){
                const button = document.createElement("button");
                button.setAttribute("class", "button-color");
                button.textContent = color;
                button.style.backgroundColor = color;
                button.onclick = function(){
                    document.getElementById("detail-image").src = item["colors"][color][current_side];
                    document.getElementById("detail-image").setAttribute("onerror", "this.onerror=null;this.src='shirt_images/not-found.png';");
                    current_color = color;
                }
                document.getElementById("color").appendChild(button);
            }
            
            
        }        
        
    }
    )
    // Your Code Here
};

