var gulp = require('gulp'), // 載入 gulp
    gulpUglify = require('gulp-uglify'), // 載入 gulp-uglify
    gulpPlumber = require('gulp-plumber'),// 載入 gulp-plumber
    gulpLivereload = require('gulp-livereload');  // 載入 gulp-livereload
var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower({cmd:"update"});
});
// 建立預設 gulp task
gulp.task('default', ['watch', 'package'], function() {
    console.log('default task loaded.');
});
gulp.task('scripts', function() {
    gulp.src('./public/javascripts/*.js') // 指定要處理的原始 JavaScript 檔案目錄
        // .on('error', console.error.bind(console)) 	//例外處理(內建)
        // .on('error', errorLog)   					//例外處理(自訂)
        .pipe(gulpPlumber())      	     				// 使用 gulp-plumber 處理例外
        .pipe(gulpUglify()) 			         		// 將 JavaScript 做最小化
        .pipe(gulp.dest('./public/javascripts/minify')) // 指定最小化後的 JavaScript 檔案目錄
        ;// .pipe(gulpLivereload());                        // 當檔案異動後自動重新載入頁面
});
gulp.task('package', function(){    //bower內套件移動
    gulp.src('./bower_components/jquery/dist/jquery.min.js')
            .pipe(gulp.dest('./public/javascripts/'));
    gulp.src('./bower_components/bootstrap/dist/js/bootstrap.min.js')
            .pipe(gulp.dest('./public/javascripts/'));
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
            .pipe(gulp.dest('./public/stylesheets/'))
        ;
});
gulp.task('watch', function () {
    gulpLivereload.listen();
    var watcher = gulp.watch('./public/javascripts/*.js', ['scripts']);
    // var watcher = gulp.watch('./gulpfile.js', ['scripts']);
    // gulp.watch('./public/javascripts/*.js', ['scripts']);
    watcher.on('change',function(e){
        for(var i=0;i<e.length;i++){
            console.log(e[i]);
        }
        console.log('FILE '+ e.path + ' was '+e.type+'\n'+e);
    });
});

//自行定義例外處理
function errorLog(error) {
  console.error(error);
  this.emit('end');
}
