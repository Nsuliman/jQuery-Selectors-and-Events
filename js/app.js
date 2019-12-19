'use strict';

// console.log('testing massage');

//  DATA FORMAT IN JSON FILE as below , array of object , to build a constroctor function 
/*
 "image_url": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
    "title": "UniWhal",
    "description": "A unicorn and a narwhal nuzzling their horns",
    "keyword": "narwhal",
    "horns": 1
*/

function Horns (data) {                                         // bulit constructor function 

  this.image_url = data.image_url;
  this .title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;

  Horns.all.push(this);

} // end of HORNS constructor function 

Horns.all= [];                                                  // array to store all objects oce created 

Horns.prototype.render = function(){
  // console.log('hornobject : ', this.keyword);                // just for testing to check if I got data and access to the object

  let hornOut = $('<div></div');                                // make a div to put each object inside of it 
  hornOut.addClass(this.keyword);                               // create a class name for each object by using keyword properties 

  let template = $('#photo-template').html();                    // take all markup from html 

  hornOut.html( template );                                      // print markup then to html without values 

  hornOut.find('h2').text( this.title );                          // put title value in h2 
  hornOut.find('img').attr('src', this.image_url);                 // put image_url value in img 
  hornOut.find('p').text(this.description);                        // put description value in p 

  $('main').append(hornOut);                                      // print out values to the main 

}

$.get('../data/page-1.json')                                   // get needed data from JSON file 
.then (data =>                                                // what to do next use .THEN 
  {
    // console.log('data : ', data);                          // print out all objects (array of objects)
    data.forEach( hornobject => {                              // for loop to get every object in the array 
      // console.log('hornobject : ', hornobject);             // print out each object alone 
      let hhorn = new Horns(hornobject);
          hhorn.render();
    }); //end of Foreach 
  }); // end of .THEN