const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

var people = [];

function addPerson(name) {
	people.push({name: name, score: 2.5, count: 1});
}


addPerson('Carson Ouckama');
addPerson('Ryan Reynolds');
addPerson('Brady Myers');
addPerson('Laken');
addPerson('Colter');

app.post('/rate', function(req, res) {
	var data = req.body;
	for (var i = 0; i < people.length; i++) {
		if (data.name === people[i].name) {
			people[i].score+=data.score;
			people[i].count++;;
			res.send({success: true});
			return;
		}
	}
	if (people.length < 70) {
		addPerson(data.name);
		people[people.length - 1].score+=data.score;
		people[people.length - 1].count++;
		res.send({success: true});
		return;
	}
	res.send({success: false});
});

app.post('/topFive', function (req, res) {
	people.sort(function(a, b) {return b.score/b.count - a.score/a.count}); 
	res.send({
		first: people[0],
		second: people[1],
		third: people[2],
		fourth: people[3],
		fifth: people[4],
	});
});
app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));