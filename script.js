$(document).ready(function(){// rondom meal

    $("#rondomForm").submit(function(){//tagging the form rondomMeal 
       //variables to store the result
        var rondomName ="";
        var rondomImage="";
        var rondomUrl="";
        var rondomInstruction="";
        
        //send the get resquest to the API
        $.get("https://www.themealdb.com/api/json/v1/1/random.php",function(rondomResponse){
           
            //process the response
            //Get the name of the meal
            rondomName=$('<h3>'+rondomResponse.meals[0].strMeal+'</h3>');
            //get the instruction of the meal
            rondomInstruction=$('<p>'+rondomResponse.meals[0].strInstructions+'</p>');
            //get the image of the meal and the youtube link
            rondomImage=$('<img max-width="250" height="250"><br><a href='+rondomResponse.meals[0].strYoutube+'><br><button id="buttonimage">Youtube Video</button></a>');
            rondomUrl=rondomResponse.meals[0].strMealThumb;
            //attch the image url
            rondomImage.attr('src',rondomUrl);
            //append the food name result to the div
            rondomName.appendTo('#foodResult');
            //append the instruction result to the div 
            rondomInstruction.appendTo('#foodResult');
            rondomImage.appendTo('#foodResult');

        });
            return false;
    });
})

$(document).ready(function(){// search for meal by the name
   
    $("#foodForm").submit(function(){
        
        var foodInput=$("#food").val();// variable to get the user input
        
        if(foodInput==""){// if the user leaves empty field
            alert("This field can not be empty");

        }else{
            //variable to store the result 
            var foodName="";
            var foodImage="";
            var url="";
            var instructions="";

            //send the req to the API
            $.get("https://www.themealdb.com/api/json/v1/1/search.php?s="+foodInput,function(data){
                console.log(data);
                //for loop to display all the response
                for(i=0;i<data.meals.length;i++){
                    
                    
                    //get the name of the meal
                    foodName=$('<h3>'+data.meals[i].strMeal+'</h3>');
                    //get the instruction how make the meal
                    instructions=$('<p>'+data.meals[i].strInstructions+'</p>');
                    //get the image for the meal and the link for youtube video                   
                    foodImage=$('<img max-width="250" height="250"><br><a href='+data.meals[i].strYoutube+'><br><button  id="buttonimage">Youtube Video</button></a>');
                    url=data.meals[i].strMealThumb;
                    //attach the image url
                    foodImage.attr('src',url);
                    //append the food name result to the div
                    foodName.appendTo('#foodNameResult');
                    //append the instruction result to the div
                    instructions.appendTo('#foodNameResult')
                    //append the image result
                    foodImage.appendTo('#foodNameResult')
                
                }
            });
        }
        return false;
    });
    
})

function refreshPage(){// refres the page 
    window.location.reload();
}

function addZero(i){
    if(i<10){
        i="0"+i;
    }
    return i
}

function displayHour(){// it will display the time and a suggestion for each meal(breakfast,lunch and dinner)
    var d = new Date();
    var x= document.getElementById("hourTime");
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());

    
    if(h>5 && h<11){
        x.innerHTML=h+":"+m+":"+s+" It is Breakfast time"+"<br>Try search for Pancakes or You can also look for a random meal !"+"<br><img max-width='50' height='70' src='pancakes.gif'>";

    }else if(h>11 && h<15){

        x.innerHTML=h+":"+m+":"+s+" It is Lunch time"+"<br>Try search for Sandwich or You can also look for a random meal !"+"<br><img max-width='50' height='70' src='sandwich.gif'>";
    }else if(h>15 && h<18){
        x.innerHTML=h+":"+m+":"+s+" It is Dinner time"+"<br>Try search for spaghetti or You can also look for a random meal !"+"<br><img max-width='50' height='70' src='dinner.gif'>";
    }else{
        x.innerHTML=h+":"+m+":"+s+" It is Snack time"+"<br>Try search for cake or You can also look for a random meal !"+"<br><img max-width='50' height='70' src='cake.gif'>";
    }
}