import re

encoding = 'utf-8'
#https://stackoverflow.com/questions/9233027/unicodedecodeerror-charmap-codec-cant-decode-byte-x-in-position-y-character
logs = open('log.txt', 'r', encoding=encoding).read();

#https://stackoverflow.com/questions/33312175/matching-any-character-including-newlines-in-a-python-regex-subexpression-not-g
log = '(.|\\s){0,100}';
letter = '([a-zA-Z0-9]|[\\+\\-\\*\\/!#$%^&\\(\\)])';
#ext = '(com|net|org|co|us|gov|edu|info|xyz|ly)';
ext = '[a-z]{2,5}'
regexes = [
  {'name': 'URL', 'find': '%s+\\.%s%s' % (letter, ext, log)},
  {'name': 'WEB', 'find': '(scol|csbe|google|gmail|prezi|hotmail|yahoo|messenger|facebook)%s' % (log)},
  {'name': 'EMAIL', 'find': '%s+@%s+.%s%s' % (letter, letter, ext, log)},
  {'name': 'EMAIL', 'find': '%s+@%s+%s' % (letter, letter, log)},
  {'name': 'EMAIL', 'find': '[a-z]{5,15}[0-9]{1,3}%s' % (log)},
]
print(regexes)


obj = {};
for regex in regexes:
	#https://stackoverflow.com/questions/14182339/matching-multiple-regex-patterns-with-the-alternation-operator
	#matches = [''.join(t) for t in re.findall(re.compile('(' + regex['find'] + ')'), logs)]
	matches = [m[0] for m in re.findall(re.compile('(' + regex['find'] + ')'), logs)]
	#print(matches)
	if obj.get(regex['name'], None) is None:
		obj[regex['name']] = []
	for match in matches:
		obj[regex['name']].append(match)
print(obj)

str = ''
for key in obj:
	matches = obj[key]
	tab = '  '
	str += key + '\n------------------'# + ('\n' + tab)
	for match in matches:
		str += ('\n' + tab) + match.replace('\n', '\n' + tab + tab)
	str += '\n\n\n\n\n'

print(str)
open('matches.txt', 'w+', encoding=encoding).write(str)

























#
