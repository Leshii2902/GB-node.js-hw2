var readline = require('readline'); //модуль чтения строки из консоли (встроенный)
var fs = require('fs');             // модуль файловой системы

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout});
//описываем в консоли команды 
rl.write('Что вы хотите узнать?\n');
rl.write('1 - количество сыгранных игр\n');
rl.write('2 - количество побед\n');
rl.write('3 - максимальное количество побед подряд\n');
rl.write('4 - количество поражений\n');
rl.write('5 - максимальное количество поражений подряд\n');
rl.write('6 - соотношение побед и поражений\n');
rl.write('all - вывести всю информацию\n');
rl.write('x - выйти\n');

rl.on('line', function(answer){  //обработка ввода в консоли
	if (answer=='x')  this.close();  //конец цикла в случае выбора выхода из программы 
	else {
		fs.readFile('./game.txt', function (err, data) {  //читаем файл game.txt
  			if (err) throw err;       //обрабатываем ошибку
  			switch (answer) {         //выводим информацию в зависимости от введенной команды в консоли
  				case '1': console.log(data.toString().split('\n')[1]); break;
  				case '2': console.log(data.toString().split('\n')[2]); break;
  				case '3': console.log(data.toString().split('\n')[3]); break;
  				case '4': console.log(data.toString().split('\n')[4]); break;
  				case '5': console.log(data.toString().split('\n')[5]); break;
  				case '6': console.log(data.toString().split('\n')[6]); break;
  				case 'all': console.log(data.toString()); break;
  				default: console.log('Ответ некорректный');  //выводим сообщение на случай если для введенной команды нет действия
  			}
    	});
    }
});