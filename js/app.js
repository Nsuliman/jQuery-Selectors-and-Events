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

  // constructor function properties 

  this.image_url = data.image_url;
  this .title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;

  Horns.all.push(this);

} // end of HORNS constructor function 

Horns.all= [];                                                  // array to store all objects once created 




/******************************************************* Display Images ***********************************************/

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
      let hhorn = new Horns(hornobject);                        // create new instance from constructor function 
          // hhorn.render1();                                       // call render function using object since the function is a prototype function (part of constructor function)
          hhorn.render();                                        // Hnadlebars render function 
        }); //end of Foreach 
  }) // end of .THEN
  // .then( () => populateSelectBox() );                             // to show up the selected keyword images (filtering)
  .then( () => populateSelectBoxHandle() ); 

  /******************************************************* Filter  Images ***********************************************/

  /*   <option value="default">Filter by Keyword</option>    */

  function populateSelectBox() {

    // Horns.all.sort((obj1,obj2) => {return obj1.title < obj2.title ? -1 : 1;});       // tried to sort it but here I couldn't, ignore this line of code 

    let seenarr = [];                                                    // empty array to put unique keywords into it 
    let select= $('select');                                          // put the keywords in the select tag options so, add select and assign to variable
    Horns.all.forEach ( horn =>                                       // for-loop for arrary of objects that we stored its into instructor array 
      { 
        if (! (seenarr.includes(horn.keyword)))                           // check if keyword in the array , if not we do as below 
        {   
          let option =  `<option value="${horn.keyword}">${horn.keyword}</option>`    // add the keyword to dropdown menu 
          // console.log(' option : ', option);                                          // print out option 
          select.append(option);                                                      // append it to select tag (markup)
          seenarr.push(horn.keyword);                                                    // add keyword to this array if there's any repeated keywords will not added 
        } // end of if statement 
      }); // end of foreach 
        // console.log('seen Array of keywords  : ', seenarr );                             // print out seen array 
  } // end of populateSelectBox function 


  // Function to show up the images related to selected keywords 
  $('select').on('change', function ()                                                // change event 
  {
    let selectedkeyword = $(this).val();                                              // this is the selected keyword in the dropdown menu ,, val() JQuery build-in function to get the value of something 
    // console.log(' selectedkeyword: ', selectedkeyword);                            // print out the selected keyword 
    $('div').hide();                                                                  // hide all div and images 
    $(`.${selectedkeyword}`).fadeIn(1000);                                            // show all images related to the selected keywords , fadein() build-in JQuery function to show something slowly
  }); // end of function 


  /******************************************************* Handle-Bars ***********************************************/

  Horns.prototype.render1 = function(){                                   // Function expression 

    let tempMak = $('#horn-template').html();                             // catch the handlebar template from HTML based on ID 
    let tepmCompile = Handlebars.compile(tempMak);                        // convert the template into function to do the needful by using handlebar CDN 

    // console.log(' tempMak: ',tempMak );                                   // print out the markup 
    // console.log('tepmCompile: ',tepmCompile );                            // print out the function of the handlebar 
    let outputt = tepmCompile(this);                                      // put data and fill it into the template , this refer back to each object you have been created it after you got data from JSON file 
    // console.log('outputt : ', outputt);                                   // print out the markup filled with object data 
    $('#photo-template').append(outputt);                                 // show it on the section must be appear in html 
  } //end of render1 function for handlebar 



  function populateSelectBoxHandle() {

    let seenHandler = {};                                           // new variable object for if statement condition 
    var selectH   = $('#option-template').html();                   // take the handlebar template from HTML which is the option markup
    // console.log('selectH : ', selectH);                          // print out option markup
    var templateH = Handlebars.compile(selectH);                    // convert the temlate into function by compile it with handlebar 
    // console.log('templateH : ', templateH);                      // console the function 
    var arrayH = [];                                                 // new array to add the full markup option into it 

    $('select').empty();                                              // empty the select drop down menu 
    $('select').html('<option value="default">Filter by Keyword</option>');       // set the select 1st value by the default one 

    Horns.all.forEach( (hornH) => {                                     // for loop on objects array
      if ( ! seenHandler[hornH.keyword] ) {                             // check if the keyword for aparticular object exist in seen object or not , to avoid duplicate values 
        // console.log('hornH : ', hornH);                              // console each object 
        arrayH.push(templateH(hornH));                                  // push the object value into the template which is only option markup 
        // console.log('arrayH : ', arrayH);                            // cosole out the array to see how it's looks like 
        seenHandler[hornH.keyword] = true;                              // after added the keyword for aparticular object we need to set the seen object value to true to avoid add it again next time 
      } // end of if-statement 
    }); // end of foreach loop 
    $('select').append(arrayH);                                           // show all keywords options as a drop down menu 
  } // end of populateSelectBoxHandle function 
