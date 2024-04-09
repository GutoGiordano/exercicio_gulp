const gulp = require('gulp'); // Instalando o pacote gulp
const sass = require('gulp-sass')(require('sass')); // Importando os arquivos de forma composta
const imagemin = require('gulp-imagemin'); // Importando o plugin
const uglify = require('gulp-uglify'); // Importando o plugin

// Tarefa para compilar o SASS
function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sass({
            outputStyle: 'compressed' // Aqui estou comprimindo os arquivos para ocupar menos bytes de memória
        }))
        .pipe(gulp.dest('./build/styles')); // Direcionando para uma pasta de destino.
}

// Tarefa de compressão de imagens
function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

// Tarefa de compressão de JavaScript
function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js') // Local dos arquivos a serem comprimidos
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts')) // Local de destino dos arquivos comprimidos
}

// Tarefa de observação para fazer a execução automáticamente
exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass)); // O local dos arquivos que vão ser observados
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagens));
}