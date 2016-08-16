var gulp = require("gulp");
var path = require ("path");
var concat = require("gulp-concat");
var clean = require("gulp-dest-clean");
var rootpath = path.join(__dirname,"bower_components/");
var bowerMain = require('bower-main');

gulp.task("copy:fonts", function() {
    gulp.src(path.join(rootpath,"font-awesome/fonts/*.*"))
        .pipe(gulp.dest(path.join(__dirname, "public/fonts/")))

});

gulp.task("copy:css", function(){

    var destpath = path.join(__dirname,"public/css");
    gulp.src([
        path.join(rootpath,"bootstrap/dist/css/bootstrap.css"),
        path.join(rootpath,"font-awesome/css/font-awesome.css")
      ]).pipe(clean(destpath, "/*.css"))
        .pipe(concat("main.css"))
        .pipe(gulp.dest(destpath))
})
gulp.task("copy:bower:scripts", function(){
    var bowerMainJavaScriptFilesObject = bowerMain('js','min.js');
    gulp.src(bowerMainJavaScriptFilesObject.normal)
        .pipe(gulp.dest(path.join(__dirname,"public/scripts")))
})
gulp.task("copy:special:scripts", function(){
    gulp.src([
        "bower_components/systemjs-plugin-text/text.js"
    ])
        .pipe(gulp.dest(path.join(__dirname,"public/scripts")))
})
gulp.task("development", ["copy:css","copy:fonts","copy:bower:scripts","copy:special:scripts"]);
