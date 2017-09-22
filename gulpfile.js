var gulp = require("gulp");

//编译es6
var babel = require("gulp-babel");

//编译sass
var scss = require("gulp-ruby-sass");

//压缩js
var uglify = require("gulp-uglify");

//即使刷新
//var connect = require("gulp-connect");

//webserver
var webserver = require("gulp-webserver");

var proxy = require("http-proxy-middleware");

//定义一个编译es6的任务 定义一个压缩js的任务
gulp.task("es6js",function(){
	gulp.src("./js/*.js")
		.pipe(bable({
			presets:["es2015"]
		}))
		.pipe(uglify())
		.pipe(gulp.dest("./minjs/"));
});


//定义一个随时监视sass的任务
gulp.task("compilescss",function(){
	scss("./scss/*.scss",{
		style:"expanded"
	}).pipe(gulp.dest("./css/"));
})


//定义一个即使刷新的任务
/*gulp.task("refresh",function(){
	gulp.src("./html/*.html").pipe(connect.reload());
	gulp.src("./css/*.css").pipe(connect.reload());
})*/

//webserver任务
gulp.task("webserver",function(){
	gulp.src("./")
		.pipe(
			webserver({
				host:"localhost",
				port:8000,
				livereload:true,
				directoryListening: {
					enable:true,
					path:'./'
				},
				middleware: [
					proxy('/product',{
						target:'http://m.womai.com',
						changeOrigin:true,
					})
				]
			})
		)
});

//定义一个监听的任务
gulp.task("listening",function(){
	gulp.watch("./js/*.js",["es6js"]);
	gulp.watch("./scss/*.scss",["compilescss"]);
//	gulp.watch("./css/*.css",["refresh"]);
//	gulp.watch("./html/*.html",["refresh"]);
});
gulp.task('default',['listening','webserver'],function(){
	console.log("done");
})

