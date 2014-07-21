---
tags: D3, JavaScript library, data visualization, PhantomCSS
language: JavaScript
resources: 6
---

# Intro to D3.js with Bubble Charts

|Section| Sub-Section | 
|:------:|:-------------:|
|Overview| [Objectives](#objectives)| 
|Instructions| [Intro to D3](#intro-to-d3js)| 
|| [Testing Suite](#testing-suite)
|| [Getting Started](#getting-started)|
|| [Enter](#enter)|
|| [Accurately Relect Data](#accurately-relect-data)|
|| [Refactor](#refactor)|
|| [Exit](#exit)|
|| [Update](#update)|
|| [Fix Size and Positions](#fix-size-and-positions)|
|| [Add Color](#add-color)|
|Summary| [Conclusion](#conclusion)| 
||[Resources](#resources)|

## Objectives
* Get comfortable using a JavaScript library
* Correctly require and use the [D3.js library](https://github.com/mbostock/d3/wiki)
* Understand [SVG](http://css-tricks.com/using-svg/)s and how to use them
* Understand how enter, update, and exit work
* Create an animated bubble chart visualization using d3

## Instructions
### Intro to [D3.js](http://en.wikipedia.org/wiki/D3.js)
* D3 stands for Data-Driven Documents
* It is a JavaScript library that uses data to drive the creation of dynamic graphs, charts, etc. that which run in web browsers
* If you read the New York Times online, Gawker, really any online publication, you're probably seen D3 in action. Here are some examples:
  * [Four Ways to Slice Obama's Budget Proposal](http://www.nytimes.com/interactive/2012/02/13/us/politics/2013-budget-proposal-graphic.html)
  * [2013 Budget](http://www.brightpointinc.com/interactive/budget/index.html?source=d3js)
  * [How the Facebook Offering Compares](http://www.nytimes.com/interactive/2012/05/17/business/dealbook/how-the-facebook-offering-compares.html)
  * [2012 Electoral Map](http://elections.nytimes.com/2012/ratings/electoral-map)
* For animations, D3 relies a simple pattern: enter, update, and exit.
  * Enter: adds items to a document
  * Update: alters appearance of visualizations of existing data within a document when the data changes
  * Exit: removes items from a document when the data is no longer relevant/needed

### Testing Suite
* This lab relies on PhantomCSS for testing. All the code being tested, along with the testing file, can be found in the folder `bubble-chart`. All other folders are for the testing framework. Write your JavaScript code in `bubble-chart/bubble.js` and alter HTML in `bubble-chart/index.html'. If you're curious about PhantomCSS, check out its [ repo](https://github.com/Huddle/PhantomCSS).
* Run `brew install casperjs --devel` from your terminal. PhantomCSS relies on CasperJS. Check out the [CasperJS docs](http://casperjs.org/) for more info.
* To run the tests, from the main folder `d3-bubble-chart`, enter `casperjs test bubble-chart/testsuite.js`.

### Getting Started
* You're going to make a [bubble chart](http://bl.ocks.org/mbostock/4063269) representing fake data for beverage popularity.
* Require the D3 library in `index.html`. Here's the url: `http://d3js.org/d3.v3.min.js`.
* Below the code where you require the D3 library, require the JavaScript file where you will be implementing the visualizations. In the case of this lab, that file is called `bubble.js`.
* To make sure you required the file properly, type `typeof BEVERAGES` into your browser's console. You should get "object" returned. If it returns "undefined", you probably didn't require the file correctly.
* In you're browser's console, type `BEVERAGES`.
* Still in the console, type `BEVERAGES[0]`.
* Compare `BEVERAGES[0]` and `BEVERAGES[1]`. How are they simliar? How are they different?
* The first step of D3 is to make an SVG element in the page. Define a new variable in `bubble.js` called `svg`. Set it equal to `d3.select('.bubble-chart')`. You're then going to append an SVG element by calling `.append('svg')` on it. Make sure the height and the width are 800. Your variable definition should look something like the code below:

```javascript
var svg = d3.select('.bubble-chart')
  .append('svg')
  .attr('width', 800)
  .attr('height', 800);
```
* Back in the `bubble.js` file, define a variable `node` that binds BEVERAGES to SVG elements with the class `node` using their names as identifiers.

```javascript
var node = svg.selectAll('.node')
  .data(BEVERAGES, function(d) { return d.name; });
```
* Double check that you created `node` properly by typing `node` in your browser's console. The result should resemble something like `[ Array[num] ]`.

### Enter
* Now everything is set up, including the `node` variable, which is a collection of all SVG elements with the class `.node`. Each SVG element of the `.node` class corresponds with a beverage in this case.
* Let's call `enter` on the variable `node` and set it equal to the variable `enter`. On this new `enter` variable, add a circle, fill that circle with the color light green, give it a radius of 50, and a class of `node`.

```javascript
var enter = node.enter();

enter.append('circle')
  .attr('class', 'node')
  .style('fill', 'lightgreen')
  .attr('r', 50);
```
* Open `index.html` in your browser. There should be a small slice of keylime pie in the upper-left-hand corner of your screen:

![Pie Wedge](../master/img/pie-wedge.png "Pie Wedge")

* In your browser's console, type `node` just like you did in a prior step. Expand the details on the return value. It should look something like this:
```
Array[num]
0: circle
1: circle
2: circle
3: circle
etc.
```

* Okay, so are the circles are here, but the brower shows only a wedge of one. Why is this? Well, we never told the elements where they should be, so they all defaulted to the coordinates [0,0], which corresponds to the upper left hand corner. So there's seven circles overlapping each other in the upper-left-hand corner, resulting in this tiny pie piece. Let's fix this!
* Change `x` position of each element (you could also choose to change the y coordinate) so that they're not overlapping. To accomplish this, rely on their index numbers multiplied by 100. Delete semicolon after `'lightgreen');` and make a new line. Add the code below there. 

```javascript
  .attr('cx', function(d,i) { return 100 * i; });
```
* Now seven circles should render though most will be cut off in the middle and the top will only display 1/4 of itself resulting in a [scalloped pattern](http://images.meredith.com/sbe/images/2009/10/ss_cool-basics_13.jpg):


![Scalloped](../master/img/scalloped.png "Scalloped") 

* Let's push them down by 100px so that we see more of their edges. Again, delete that semicolon after the line where you changed their `x` positions and add the line below.

```javascript
  .attr('cy', 100);
```
* Now you should see many full circles and one circle cut off at the left edge:

![One circle cut-off](../master/img/cut-off.png "One circle cut-off")

* Let's push these circles right so that circle isn't obscured. To do this, you will alter the code where `cx` is set.

```javascript
  .attr('cx', function(d,i) { return 100 * i; })
  // should become
  .attr('cx', function(d,i) { return  100*i  + 100; })
```
* Your brower should render circles similar to the ones below:
![Circles rendered](../master/img/same-sized-circles.png "Same Sized Circles")

### Accurately Relect Data
* So far, the circles we've displayed don't really represent any data. Let's alter the circles' radius' so that they're reflections of the beverage's popularity value, or `value`.

```javascript
  .attr('r', 50)
  // should become
  .attr('r', function(d) { return d.value; })
```
* Your brower should render circles similar to the ones below:
![Circles w/varied radiuses rendered](../master/img/different-sized-circles.png "Differently Sized Circles")

### Refactor
* The next step will be to add update and exit code. Before that, however, it's time to refactor. 
* Delete the empty `animate` method below the `/// ^ code goes above  ^ ///` line. This `animate` function was just there to avoid console errors when updating the BEVERAGE object and you're about to build this function out yourself.
* Wrap the code where `var node` is defined, along with the code where enter is called on `node`, and the code where `enter` is appended, etc., in the function called `animate`. This function, `animate`, will take an argument of `data`. Since it takes an argument, `data`, call on `data`, instead of `beverages` in your definition of the variable `node`.

```javascript
var node = svg.selectAll('.node')
  .data(BEVERAGES, function(d) { return d.name; });
// will become 
var node = svg.selectAll('.node')
  .data(data, function(d) { return d.name; });
```

* Call the method `animate` below it and pass it `BEVERAGES` as an argument: `animate(BEVERAGES);`
* Make sure that this quick refactoring didn't break your cicles by checking in the browser. The circles should render just as they did before.

### Exit
* Following the code where `node.enter` is called inside of the `animate` fuction, make a variable, `exit` and set it equal to `node.exit()`. This is so that when `wine`, or any other beverge really, is deleted from `BEVERAGES`, it's node disappears. To make that node disappear, call `.remove()` on it.

```javascript
var exit = node.exit();
exit.remove();
```
* Check this out in the browser. The circle at the very bottom should completely disappear for a half-second before anther circle takes its spot.

### Update
* It's time to make an `update` method that will adjust the radius to accurately resprent the data in the case that the data has changed since the circle was drawn.
* Between where you call `node.enter()` and `node.exit()`, make a new variable called `update`. This variable will be equal to the value of calling `.transition()` on node, much like `enter` and `update` variables. Move  the `.attr('r'...`, `.attr('cy'...`, and the `.attr('cx'...` lines down into this update section.
* In the `enter` section, hardcode the radius as zero. This way, circles will start out with a radius of 0, and grow to a fuller radius depending on their popularity value. It's not super important, just pretty.
* See what this looks like in the browser! Cicles should be growing, shrinking, and disappearing altogether. Once the circles have stabalized, they should look like the ones below:

![Animated](../master/img/animated-circles.png "Animated")

* You may notice that some circles may and also the huge gaps between smaller circles. You'll tackle these issues next using a feature that comes standard in the D3 library.

### Fix Size and Positions
* Trying to think of x and y coordinates that would maximize the beauty of this chart without exceeding a specified width and height is tricky and involves a lot of math. Thankfully, D3 provides a solution, called the [pack layout](https://github.com/mbostock/d3/wiki/Pack-Layout). The pack layout will calculate the ideal coordinates and radius values for each beverage. It is awesome.
* Above the `animate` function, make a variable, `bubble`. It will be equal to [d3.layout.pack](https://github.com/mbostock/d3/wiki/Pack-Layout#pack). It should have a [size](https://github.com/mbostock/d3/wiki/Pack-Layout#size) of 800 by 800, a [padding](https://github.com/mbostock/d3/wiki/Pack-Layout#padding) of 1.5, and not [sort](https://github.com/mbostock/d3/wiki/Pack-Layout#sort) the data coming in (bubble.sort = null). If you need help, take a look at the `bubble` variable in [mbostock's bubble code](http://bl.ocks.org/mbostock/4063269#index.html). Your variable should be pretty similar.
* What you want to do bind each drink with the computed data that the pack layout will assign to it, like values for the x and y coordinates along with values for a radius. The only annoying thing is that the pack layout expects a tree-like data structure so you're going to fake it till you make it. Create an object called `treeLikeData` in the first line of your `animate` function. This variable will have a key of "children" which will point to a value of `data`, (which is `BEVERAGES` in this case).

```javascript
var treeLikeData = {"children": data};
```
* Define a new variable `bubbleData` in the line just below where `var treeLikeData` is. This new variable `bubbleData` will be equal to calling `.nodes` on the variable `bubble` that you created outside of the animate function. Passing `.nodes` the argument of `treeLikeData`. 

```javascript
var bubbleData = bubble.nodes(treeLikeData);
```

* Now you need to filter out any data that has children. This is neccessary because you made a parent, the main object `treeLikeData`. This parent has the key of "chidren" and a value of an array of all the beverages. You don't want D3 to assign this overarching parent an x, y, and radius. In fact, once you've completed this lab, remove the `.filter` and see what happens.

```javascript
var bubbleData = bubble.nodes(treeLikeData);
// should become
var bubbleData = bubble.nodes(treeLikeData).filter(function(d) { return !d.children; });
```

* Make sure that you update the code when defining `node` to reflect the changes above: `BEVERAGES` should become `bubbleData`.

```javascript
.data(BEVERAGES.children, function(d) { return d.name; });
// should become
.data(bubbleData, function(d) { return d.name; })
```
* To access D3's representation of each beverage, you can call `d`. To find D3's calculations of the ideal radius and x and y coordinates, you can call `d.r`, `d.x`, and `d.y` respectively. For example, to make use of D3's calculated `y` value, replace your older `cy` code with:

```javascript
.attr('cy', function(d) { return d.y; })
```
* Using the code above as an example, update `cx` and `r` in the transition section using D3's calculated x coordinate and calculated radius. Your result should look like the freeze-frame below:

![Pack layout](../master/img/pack-layout.png "Pack layout")

### Add color
* Above the `animate` function, define a new variable `color`. Set it equal to `d3.scale.category10();`. See [this link](https://github.com/mbostock/d3/wiki/Ordinal-Scales#category10) for more information on constructing colors.
* Alter the fill from to `.style('fill', "lightblue")` to `.style('fill', function(d) { return color(d.name); });` This means colors will be assigned based on name, which is cool. For instance, if tea was blue and popular, then became so unpopular that it was removed from BEVERAGES, and then made a comeback, it's color would still remain blue. How cool is that?

![Color](../master/img/color.png "color")

## Bonus
* Add labels to the circles. See how you "appended" circles and think about appending text. To add two elements, a circle and text, creating a [group element](http://tutorials.jenkov.com/svg/g-element.html) to contain them is recommended.

![labels added](/img/labels-added.png "labels")

## Conclusion
D3 is an incredibly versatile library that visualizes data. Its built-in features allow programmers to render diagrams, charts, etc. on most browsers pretty quickly, considering their complexities. It has three main states: enter, update, and exit. In the enter phase, new data enters the DOM. In update, pre-existing representations of data are changed to reflect their new values. In exit, representations of data that no longer exists exit the DOM.  

## Resources
* [Mike Bostock's Blog](http://bost.ocks.org/mike/) - [Let's Make a Bar Chart](http://bost.ocks.org/mike/bar/)
* [Mike Bostock's Blog](http://bost.ocks.org/mike/) - [Bubble Chart](http://bl.ocks.org/mbostock/4063269)
* [Wikipedia](http://en.wikipedia.org/) - [D3.js](http://en.wikipedia.org/wiki/D3.js)
* [CSS Tricks](http://css-tricks.com/) - [Using SVG](http://css-tricks.com/using-svg/)
* [GitHub](https://github.com/) - [PhantomCSS](https://github.com/Huddle/PhantomCSS)
* [CasperJS](http://casperjs.org/) - [Docs](http://casperjs.readthedocs.org/en/latest/)
