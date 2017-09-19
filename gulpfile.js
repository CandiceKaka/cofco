var gulp = require("gulp");

//编译es6
var babel = require("gulp-babel");

//编译sass
var scss = require("gulp-ruby-sass");

//压缩js
var uglify = require("gulp-uglify");

//即使刷新
var connect = require("gulp-connect");

//定义一个编译es6的任务 定义一个压缩js的任务
gulp.task("es6js",function(){
	gulp.src("./js/**/.js")
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
gulp.task("refresh",function(){
	gulp.src("./html/*.html").pipe(connect.reload());
	gulp.src("./css/*.css").pipe(connect.reload());
})

//定义一个监听的任务

gulp.task("listening",function(){
	connect.server({
		livereload:true
	});
	
	gulp.watch("./js/**/.js",["es6js"]);
	gulp.watch("./scss/*.scss",["compilescss","refresh"]);
	gulp.watch("./css/*.css",["refresh"]);
	gulp.watch("./html/*.html",["refresh"]);
	
	
});



gulp.task("listening",function(){
		connect.server({
			//让connect启动一个服务器，这样他才能即时刷新浏览器
			livereload:true
		})
	gulp.watch("./js/*.js",["js"]);
	gulp.watch("./scss/*.scss",["compilescss","refresh"]);
	gulp.watch("./css/*.css", ["refresh"]);
	gulp.watch("./html/*.html",["refresh"]);
});
