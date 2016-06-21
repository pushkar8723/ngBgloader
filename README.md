Angular Background Loader
=========================

Angular module to lazy load background images asynchronously while showing a placeholder image.
When background image loads, it fades in and replaces the placeholder image, 
giving page more readability while loading images.

[View Demo](http://pushkar8723.github.io/ngBgloader/).

Installing
----------

If you use bower in your project then to install, just run
```bash
bower install pushkar8723/ngBgloader
```

Otherwise you can download and extarct zip file in your project.

How to use
----------
This module has a dependency on angular animate module and so both angular and
angular animate must be included in the project.

```html
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.min.js"></script>
<script src="bower_components/ngBgloader/src/ngbgloader.js"></script>
````

Include ngBgloader in your angular app.

```javascript
angular.module('yourApp', ['ngBgloader']);
```

Now you can simply use ```bg-loader``` directive anywhere in your view.

This directive has to required attributes

1. ```placeholder```: path to placeholder image.
2. ```src```: path to large image.

**Example**

```html
<bg-loader
    placeholder="'data:image/jpeg;base64,/9j/4AAQSkZJRgABA ... agHkv6+rnBbNQilefvP/9k='"
    src="'https://raw.githubusercontent.com/pushkar8723/ngBgloader/gh-pages/images/notgenericherobg.jpg'"
></bg-loader>
```

This will work when parent's position is relative, but may fail in few cases.
To handle such cases you need to specify the styles that should be applied to the
images (both placeholder and large image). This can be done using ```styles``` attribute.

**Example**

```html
<bg-loader
    placeholder="'data:image/png;base64,iVBORw0KGgoAAAA ... AABJRU5ErkJggg=='"
    src="'https://raw.githubusercontent.com/pushkar8723/ngBgloader/gh-pages/images/hero_1.jpg'"
    styles="{'height': '150px', 'width':'150px'}"
></bg-loader>
```

In case you need to give a different styles to placeholder image, you can use ```placeholder-styles```
attribute.

**Example**

```html
<bg-loader
    placeholder="'data:image/png;base64,iVBORw0KGgoAAAA ... AABJRU5ErkJggg=='"
    src="'https://raw.githubusercontent.com/pushkar8723/ngBgloader/gh-pages/images/hero_1.jpg'"
    placeholder-styles="{'background-size': 'auto', 'background-position':'center', 'background-repeat': 'no-repeat'}"
></bg-loader>
```

How report a bug / request a feature?
-------------------------------------

Just raise an issue and I will see what I can do. No promises though.

How to contribute?
------------------

1. Fork this repository.
2. Create your feature branch.
3. Make changes and send a pull request.

License
-------
Released under the [MIT License](http://opensource.org/licenses/MIT).