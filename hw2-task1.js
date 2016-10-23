var readline = require('readline'); //модуль чтения строки из консоли (встроенный)
var fs = require('fs');             // модуль файловой системы

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//переменные
var randomNumb,   //для случайно выбранного чмсла 1 или 2
	games=0,      //количество игр
	victory=0,    //количество побед
	imVictory=0,  //количество побед подряд
	maxVictory=0, //максимальное количество побед подряд
	losses=0,     //количество поражений
	imLosses=0,   //количество поражений подряд
	maxLosses=0,  //максимальное количество поражений подряд
	ratio;        //соотношение победы/пражения

rl.write('Угадайте, на какую сторону упала монета!\n');
rl.write('1 - Орел, 2 - Решка\n')
rl.write('x - Закончить игру\n')

rl.on('line', function(num){ //обработка ввода в консоли
	randomNumb = Math.floor( Math.random() * 2 ) + 1;       //генератор случайных чисел (1 или 2)
	if (num==randomNumb) {        		//действия при победе
		console.log('Победа!');   							//сообщение в консоли о победе  
		games++;                  							//подсчет количества игр
		victory++;                							//подсчет количества побед
		imVictory++;              							//подсчет количества побед подряд
		if (imVictory>maxVictory) maxVictory=imVictory;     //фиксация максимального количества побед подряд
		imLosses=0;                                         //обнуление количества поражений подряд
	}
	else {
		if (num=='x') {                 //действия при выходе из программы
			ratio=Math.round((victory/losses) * 100) / 100;   //подсчет соотношения победы/поражения
			try {       //блок для обработки ошибки и запись логов об игре в файл game.txt
				fs.writeFileSync('./game.txt','-----=====Игра Орел и Решка=====-----\n');
				fs.appendFileSync('./game.txt', 'Игр сыграно: '+games+'\n');
				fs.appendFileSync('./game.txt', 'Побед: '+victory+'\n');
				fs.appendFileSync('./game.txt', 'Максимально побед подряд: '+maxVictory+'\n');
				fs.appendFileSync('./game.txt', 'Поражений: '+losses+'\n');
				fs.appendFileSync('./game.txt', 'Максимально поражений подряд: '+maxLosses+'\n');
				fs.appendFileSync('./game.txt', 'Соотношение побед/поражений: '+ratio+'\n');
			}
			catch(err) {console.error('err is: ', err);}   //обработка ошибки
			this.close();      //окончание цикла
		}
		else {							//действия при поражении
			console.log('Не угадали!'); 					//сообщение в консоли о поражении
			games++;                    					//подсчет количества игр
			losses++;                   					//подсчет количества поражений
			imLosses++;                 					//подсчет количества поражений подряд
			if (imLosses>maxLosses) maxLosses=imLosses;     //фиксация максимального количества поражений подряд
			imVictory=0;									//обнуление количества побед подряд
		}
	}
	
});